from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from course.models import EnrolledCourse
from main.models import Mentor,CustomUser
from .models import Notification
from django.utils.dateformat import format

# In your models.py or a separate signals.py file

@receiver(pre_save, sender=EnrolledCourse)
def store_previous_next_review_date(sender, instance, **kwargs):
    if instance.pk:
        try:
            old_instance = sender.objects.get(pk=instance.pk)
            instance._old_next_review_date = old_instance.next_review_date
        except sender.DoesNotExist:
            instance._old_next_review_date = None
    else:
        instance._old_next_review_date = None

@receiver(post_save, sender=EnrolledCourse)
def send_notifications_on_save(sender, instance, created, **kwargs):
    if created:
        message = f'You have successfully enrolled in {instance.course.course.name}'
        create_notification(instance.user, message, instance)
    elif instance.certificate and instance.is_completed:
        message = f'Congratulations! Your certificate has been issued by the mentor'
        link = instance.certificate
        create_notification(instance.user, message, instance, link)
    elif instance.review_time and not instance.is_completed:
        review_date = instance.next_review_date.strftime('%Y-%m-%d')
        review_time = instance.review_time.strftime('%H:%M')
        message = f'Your review session is scheduled on {review_date} at {review_time}'
        create_notification(instance.user, message, instance)
    

    # Check if the next_review_date has changed
    if hasattr(instance, '_old_next_review_date'):
        old_next_review_date = getattr(instance, '_old_next_review_date', None)
        if old_next_review_date and instance.next_review_date != old_next_review_date:
            review_date = instance.next_review_date.strftime('%Y-%m-%d')
            review_time = instance.review_time.strftime('%H:%M')
            message = f'Your review session date has been updated to {review_date} at {review_time}'
            create_notification(instance.user, message, instance)

def create_notification(user,message,instance , link = None):
    notification = Notification.objects.create(
        user = user, 
        message = message,
        link = link,
        enrolled_course = instance
    )
    send_real_time_notification(user.id, message)


@receiver(post_save,sender = Mentor)
def send_notification_mentor_registration(sender,instance,created , **kwargs):
    if created:
        message = f'New Mentor Request- {instance.first_name}.Please verify!'
        admin_user = CustomUser.objects.filter(is_superuser = True).first()

        create_mentor_notification(admin_user, message)

def create_mentor_notification(user , message, link = None):
    notification = Notification.objects.create(
        user = user,
        message = message,
        link = link
    )
    send_real_time_notification(user.id,message)

def send_real_time_notification(user_id, message):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'notifications_{user_id}',
        {
            'type':'notification_message',
            'message':message
        }
    )