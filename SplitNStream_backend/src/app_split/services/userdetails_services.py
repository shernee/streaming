from app_split.models import User
from app_split.serializers import subscription_serializers
import errors

def list_userdetails(request_user_model: User):
    
    user_base_qs = User.objects.filter(id=request_user_model.id).first()
    return user_base_qs
