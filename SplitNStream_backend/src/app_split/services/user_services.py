from app_split.models import User
from app_split.serializers import user_serializers
import errors

def create_user(
        sanitized_username: str, sanitized_email_address: str, unsafe_password: str,
        sanitized_first_name: str, sanitized_last_name: str, unsafe_is_admin: bool):

    # # Only admins can create users
    # if not request_user_model.is_admin:
    #     raise custom_errors.UserCreatorNotAdminError()

    # Validate fields
    fields_to_validate_dict = {
        "username": sanitized_username,
        "first_name": sanitized_first_name,
        "last_name": sanitized_last_name,
        "email": sanitized_email_address,
        "password": unsafe_password,
        "is_admin": unsafe_is_admin,
    }
    user_creation_serializer = user_serializers.CreateUserSerializer(data=fields_to_validate_dict)
    user_creation_serializer.is_valid(raise_exception=True)
    validated_user_dict = user_creation_serializer.validated_data

    # substitute defaults
    username = validated_user_dict.get('username')
    first_name = validated_user_dict.get('first_name')
    last_name = validated_user_dict.get('last_name')
    password = validated_user_dict.get('password')
    email = validated_user_dict.get('email')
    is_admin = validated_user_dict.get('is_admin', False)

    # Check if username already exists
    if User.objects.filter(username=username).exists():
        raise errors.UsernameConflictError()

    # Check if email address already exists
    if User.objects.filter(email=email).exists():
        raise errors.EmailConflictError()

    # Create a user
    user_model = User.objects.create(
        username=username,
        password=password,
        first_name=first_name,
        last_name=last_name,
        email=email.lower(),
        )
        # user_model.full_clean()
        # user_model.save()

    # communication_service.send_user_account_activation_email(user_model=user_model)
    return user_model

def list_userdetails(request_user_model: User):

    user_groups_qs = request_user_model\
        .group_set.prefetch_related("subscription")\
        .filter(membership__is_active=True)      

    return user_groups_qs