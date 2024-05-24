from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six
class TokenGenerator(PasswordResetTokenGenerator):
    def __init__(self, expiry_minutes=60):
        self.expiry_minutes = expiry_minutes
        super().__init__()

    def _make_hash_value(self,user,timestamp):
        return (six.text_type(user.pk) + six.text_type(timestamp) + six.text_type(user.is_active))
    
    def __init__(self, expiry_minutes=60):
        self.expiry_minutes = expiry_minutes
        super().__init__()


generate_token=TokenGenerator(expiry_minutes=60)
