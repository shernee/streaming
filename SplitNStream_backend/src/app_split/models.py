from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Service(models.Model):
    name = models.CharField(max_length = 50)
    description = models.CharField(max_length = 60)

    def __str__(self):
        return f"{self.name}"


class Subscription(models.Model):
    name = models.CharField(max_length = 50)
    service = models.ForeignKey('Service', on_delete=models.CASCADE)
    length_in_days = models.IntegerField(null=True, blank=True)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    max_members_allowed = models.IntegerField(default=4)

    def __str__(self):
        return f"{self.service.name}: {self.name}-{self.price} "
    

class User(AbstractUser):

    def __str__(self):
        return f"{self.username}" 
    

class Group(models.Model):
    class StageChoice(models.IntegerChoices): 
        FORMATION = 1
        FORMED = 2
        VERIFIED = 3

    subscription = models.ForeignKey('Subscription',on_delete=models.CASCADE)
    members = models.ManyToManyField('User', through='Membership')

    stage = models.PositiveSmallIntegerField(
        choices = StageChoice.choices,
        default = StageChoice.FORMATION
    )
    subscription_email = models.EmailField(null=True, blank=True)
    subscription_password = models.CharField(max_length=50, null=True, blank=True)
    admin_passwd_for_email = models.CharField(max_length=50, null=True, blank=True)

    def __str__(self):
        return f"Group-{self.id}: {self.subscription.__str__()}"


class Membership(models.Model):
    user = models.ForeignKey('User',on_delete=models.CASCADE)
    group = models.ForeignKey('Group',on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}-{self.group.__str__()}"


class Payment(models.Model):
    group = models.ForeignKey('Group',on_delete=models.CASCADE)
    user = models.ForeignKey('User',on_delete=models.CASCADE)
    paid_on = models.DateTimeField()
    amount_paid =models.DecimalField(max_digits=7, decimal_places=2)





   
    


    
   

