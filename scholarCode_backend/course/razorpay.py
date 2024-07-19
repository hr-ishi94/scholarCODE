import os
import json
import razorpay
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .constants import PaymentStatus
from django.conf import settings
from .serializers import RazorpaySerializer
from .models import RazorpayPayment

RAZOR_KEY = settings.RAZORPAY_KEY
RAZOR_SECRET = settings.RAZORPAY_SECRET_KEY


razorpay_client = razorpay.Client(auth=(RAZOR_KEY,RAZOR_SECRET))


class PaymentView(APIView):
    """
    APIView for Creating Razorpay Order.
    :return: list of all necessary values to open Razorpay SDK
    """

    http_method_names = ('post',)

    @staticmethod
    def post (request,*args, **kwargs):

        email = request.data.get('email')
        amount = request.data.get('amount')
        course_id = request.data.get('course_id')

        if not email:
            return Response({'error':'Invalid email Provided'},status=status.HTTP_400_BAD_REQUEST)
        if not amount:
            return Response({'error':'Invalid amount Provided'},status=status.HTTP_400_BAD_REQUEST)
        if not course_id:
            return Response({'error':'Invalid course Provided'},status=status.HTTP_400_BAD_REQUEST)

        razorpay_order = razorpay_client.order.create(
            {'amount':int(amount)*100, 'currency':'INR', 'payment_capture':"1"}
        )

        order = RazorpayPayment.objects.create(
            email=email, amount = amount,course_id= course_id, provider_order_id = razorpay_order['id']

        )

        data = {
            'email': email,
            'course_id':course_id,
            'merchant_id':RAZOR_KEY,
            'amount':amount,
            'currency':'INR',
            'orderId':razorpay_order['id']
        }

        return Response(data,status=status.HTTP_200_OK)
    
class CallbackView(APIView):
    """
    APIView for Verifying Razorpay Order.
    :return: Success and failure response messages
    """

    @staticmethod
    def post(request, *args, **kwargs):
        # Getting data from request
        response = request.data
        print(response,'hello')

        # Check if razorpay_signature is present in the request
        if "razorpay_signature" in response:
            try:
                # Verifying Payment Signature
                data = razorpay_client.utility.verify_payment_signature(response)
            except razorpay.errors.SignatureVerificationError:
                return Response({'status': 'Signature Mismatch!'}, status=status.HTTP_400_BAD_REQUEST)

            # If signature is verified
            if data:
                try:
                    # Try to get the payment object
                    payment_object = RazorpayPayment.objects.get(provider_order_id=response['razorpay_order_id'])
                    payment_object.status = PaymentStatus.SUCCESS
                    payment_object.payment_id = response['razorpay_payment_id']
                    payment_object.signature_id = response['razorpay_signature']
                    payment_object.save()
                    serializer = RazorpaySerializer(payment_object)
                    return Response({'status': 'Payment Done','payment':serializer.data}, status=status.HTTP_200_OK)
                except RazorpayPayment.DoesNotExist:
                    return Response({'status': 'RazorpayPayment does not exist'}, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response({'status': 'Signature Mismatch!'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Handling failed payments
            error_code = response.get('error[code]', 'Unknown error code')
            error_description = response.get('error[description]', 'Unknown error description')
            error_source = response.get('error[source]', 'Unknown error source')
            error_reason = response.get('error[reason]', 'Unknown error reason')

            error_status = {
                'error_code': error_code,
                'error_description': error_description,
                'error_source': error_source,
                'error_reason': error_reason,
            }

            return Response({'error_data': error_status}, status=status.HTTP_401_UNAUTHORIZED)
