from django.shortcuts import render
from datetime import datetime
from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics,status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.utils import timezone

class EnrollCourseView(generics.ListCreateAPIView):
    queryset = EnrolledCourse.objects.all()
    serializer_class = EnrollSerializer

class MentorCourseView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MentorCourses.objects.all()
    serializer_class = MentorCourseSerializer
    def put(self,request,*args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()
        serializer = self.get_serializer(instance,data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status= status.HTTP_200_OK)
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def EnrolledCoursesList(request):
    if request.method == 'GET':
        try:
            enrolls = EnrolledCourse.objects.all()
            if not enrolls:
                return Response({'message':'No courses for this mentor'})
            serializer = AllEnrollSerializer(enrolls, many = True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'message':str(e)},status= status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET','POST','PUT','PATCH'])
def EnrolledCoursesUser(request,user_id):
    if request.method == 'GET':
        try:
            enrolls = EnrolledCourse.objects.filter(user = user_id)
            if not enrolls:
                return Response({'message':'No courses for this mentor'})
            serializer = EnrollSerializer(enrolls, many = True)
            return Response(serializer.data)
        except Exception as e:
            return Response({'message':str(e)},status= status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method =='POST':
        serializer = EnrollSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    elif request.method in ['PUT', 'PATCH']:
        try:
            data = request.data
            enroll_id = data.get('id')
            mentor = data.get('mentor')
            time = data.get('review_time')
            review_date = data.get('next_review_date')

            try:
                course = EnrolledCourse.objects.get(id=enroll_id, user=user_id)
            except EnrolledCourse.DoesNotExist:
                return Response({'status': 'error', 'message': 'Enrollment not found'}, status=status.HTTP_404_NOT_FOUND)


            if time is not None and review_date is not None:
                try:
                    time_dt = datetime.datetime.strptime(time, "%H:%M:%S").time()  # Parse time in HH:MM:SS format
                except ValueError:
                    return Response({'status': 'error', 'message': 'Invalid time format'}, status=status.HTTP_400_BAD_REQUEST)

                # Check if time is not equal to any existing review_time or is at least 30 minutes ahead
                existing_reviews = EnrolledCourse.objects.filter(
                    course__mentor=mentor,
                    next_review_date=review_date
                ).exclude(pk=enroll_id)

                for review in existing_reviews:
                    existing_time = review.review_time
                    print(existing_time, time_dt, 'klei')
                    if existing_time == time_dt:
                        return Response({'status': 'error', 'message': 'You already have a review at the same time.'}, status=status.HTTP_400_BAD_REQUEST)
                    if abs((datetime.datetime.combine(datetime.datetime.today(), time_dt) - datetime.datetime.combine(datetime.datetime.today(), existing_time)).total_seconds()) < 1800:
                        return Response({'status': 'error', 'message': 'Review time must be at least 30 minutes apart from any of your reviews.'}, status=status.HTTP_400_BAD_REQUEST)
            
            print(data)
            serializer = EnrollSerializer(course, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': 'success', 'data': serializer.data}, status=status.HTTP_200_OK)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Handle exceptions and return an error response
            return Response({'status': 'error', 'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class Transactions(generics.ListCreateAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def post(self, request, *args, **kwargs):
        data = request.data

        superuser = CustomUser.objects.filter(is_superuser=True).first()
        if superuser is None:
            return Response({"error": "No superuser found"}, status=status.HTTP_400_BAD_REQUEST)

        data['admin'] = superuser.id
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            admin_wallet, created = AdminWallet.objects.get_or_create(admin=superuser)

            admin_wallet.balance += data['amount']
            admin_wallet.save()
            serializer.save()
            admin_wallet_serializer = AdminWalletSerializer(admin_wallet)

            # Prepare the response data
            response_data = {
                'transaction': serializer.data,
                'admin_wallet': admin_wallet_serializer.data
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST'])
def MentorCourseList(request):
    if request.method == 'GET':
        try:
            courses = MentorCourses.objects.all()
            if not courses:
                return Response({'message':'No course found for this mentor'})
            serializer = MentorCourseSerializer(courses,many = True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"message":str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == 'POST':
            serializer = MentorCourseSerializer(data =request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status= status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
class ReviewMarkView(generics.ListCreateAPIView):
    queryset = ReviewMarks.objects.all()
    serializer_class = ReviewMarkSerializer

    def post(self, request, *args, **kwargs):
        serializer = ReviewMarkSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status = status.HTTP_200_OK)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def razorpay_order_id(request):
    if request.method == 'GET':
        try:
                
            payments = RazorpayPayment.objects.all()
            if not payments:
                    return Response({'message':'Transactions found'})
            serializer = RazorpaySerializer(payments, many= True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':'server error'})
        
class IssueCertificate(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def patch(self, request, *args, **kwargs):
        enrollId = request.data.get('enroll_id')
        certificate = request.FILES.get('certificate')  # Use request.FILES to get the uploaded file
        print(request.data, enrollId)
        print(certificate,'lp')

        if not enrollId or not certificate:
            return Response({'error': 'Enroll ID or certificate file not provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            course = EnrolledCourse.objects.get(pk=int(enrollId))
            print(course,'lo')

            serializer = EnrollSerializer(course, data={'certificate': certificate}, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': 'success', 'data': serializer.data}, status=status.HTTP_200_OK)
            return Response({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except EnrolledCourse.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        

@api_view(['GET','POST','PATCH'])
def mentorTimings(request,mentor_id):
    if request.method == 'GET':
        try:
            timings = MentorTimes.objects.filter(mentor = mentor_id)
            if not timings:
                return Response({"message":"Mentor didn't assign any time slots"}, status=status.HTTP_404_NOT_FOUND)
            serializer = MentorTimesSerializer(timings,many = True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':str(e)}, status = status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'POST':
        try:
            serializer = MentorTimesSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    elif request.method == 'PATCH':
        id = request.data.get('id')
        print('patch',id)
        try:
            timing = MentorTimes.objects.get(pk = id )
            timing.booked = True
            timing.save()
            serializer = MentorTimesSerializer(timing)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except MentorTimes.DoesNotExist:
            return Response({'error': 'MentorTime not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST','PATCH'])
def mentorWallet(request,mentor_id):
    if request.method == 'GET':
        try:
                
            wallet = Mentor_wallet.objects.get(mentor_id = mentor_id)
            if not wallet:
                return Response({'message':'Could not find the wallet for the mentor id '},status=status.HTTP_404_NOT_FOUND)
            serializer = MentorWalletSerializer(wallet)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error':str(e)}, status = status.HTTP_400_BAD_REQUEST)
    elif request.method == 'POST':
        try:
            serializer = MentorWalletSerializer(data = request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error':str(e)},status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    elif request.method == 'PATCH':
        try:
            wallet = Mentor_wallet.objects.get(mentor_id = mentor_id)
            data = request.data.copy()
            data['payment_date'] = timezone.now() 
            serializer = MentorWalletSerializer(wallet, data=data, partial = True)
            superuser = CustomUser.objects.filter(is_superuser=True).first()
        
            if serializer.is_valid():
                serializer.save()
                transaction = MentorTransaction.objects.create(
                    mentor_wallet = wallet,
                    amount = request.data.get('amount')
                )
                transaction_serializer = MentorTransactionSerializer(transaction)

                admin_wallet, created = AdminWallet.objects.get_or_create(admin=superuser)

                admin_wallet.balance -= data['amount']
                admin_wallet.save()
                admin_wallet_serializer = AdminWalletSerializer(admin_wallet)


                response_data = {}
                response_data['admin_wallet'] = admin_wallet_serializer.data
                response_data['wallet'] = serializer.data
                response_data['transaction'] = transaction_serializer.data

                return Response(response_data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Mentor_wallet.DoesNotExist:
            return Response({'error': 'Mentor wallet not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class MentorTransactionView(generics.ListAPIView):
    serializer_class = MentorTransactionSerializer

    def get_queryset(self):
        wallet_id = self.kwargs['wallet_id']
        return MentorTransaction.objects.filter(mentor_wallet_id=wallet_id)

class AdminWalletView(generics.ListAPIView):
    serializer_class = AdminWalletSerializer

    def get_queryset(self):
        superuser = CustomUser.objects.filter(is_superuser=True).first()
        return AdminWallet.objects.filter(admin = superuser)