# Third-party imports
from factory import Faker, Sequence, SubFactory
from factory.django import DjangoModelFactory
import datetime

# App imports
from app_split.services import user_services



class ServiceFactory(DjangoModelFactory):

    name = Faker('company')
    description = Faker('paragraph', nb_sentences=1)
    
    class Meta:
        model = "app_split.Service"

class SubscriptionFactory(DjangoModelFactory):

    service = SubFactory(ServiceFactory)
    name = Faker('month_name')
    max_members_allowed = Faker('random_number', digits=1)
    price = Faker('pydecimal', left_digits=5, right_digits=2)
    
    class Meta:
        model = "app_split.Subscription"


class UserFactory(DjangoModelFactory):

    username = Sequence(lambda n: 'user_%d' % n)
    first_name = Sequence(lambda n: 'first%d' % n)
    last_name = Sequence(lambda n: 'last%d' % n)
    email_address = Sequence(lambda n: 'fl%d@acme.inc' % n)
    password = "testpwd123456"
    is_admin = False

    class Meta:
        model = "app_split.User"

    @classmethod
    def _create(cls, model_class, *args, **kwargs):
        username = kwargs.pop("username", "")
        email_address = kwargs.pop("email_address", "")
        first_name = kwargs.pop("first_name", "")
        last_name = kwargs.pop("last_name", "")
        password = kwargs.pop("password", "")
        is_admin = kwargs.pop("is_admin", "")

        user_model = user_services.create_user(
            sanitized_username=username, 
            sanitized_email_address=email_address, 
            sanitized_first_name=first_name, 
            sanitized_last_name=last_name, 
            unsafe_password= password, 
            unsafe_is_admin=is_admin
        )

        return user_model

