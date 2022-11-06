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
    class RatingChoice(models.IntegerChoices): 
        VERY_BAD = 1
        BAD = 2
        AVERAGE = 3
        GOOD = 4
        EXCELLENT = 5
        
    rating = models.CharField(
        max_length = 20,
        choices = RatingChoice.choices,
        default = '3'
        )

    def __str__(self):
        return f"{self.username}" 
    

class Group(models.Model):
    class StageChoice(models.IntegerChoices): 
        FORMATION = 1
        GROUP_FORMED = 2
        VIERIFIED = 3

    subscription = models.ForeignKey('Subscription',on_delete=models.CASCADE)
    members = models.ManyToManyField('User', through='Membership')

    stage = models.CharField(
        max_length = 20,
        choices = StageChoice.choices,
        default = "1"
    )
    subscription_email = models.EmailField()
    subscription_password = models.CharField(max_length=50)
    admin_passwd_for_email = models.CharField(max_length=50)


class Membership(models.Model):
    user = models.ForeignKey('User',on_delete=models.CASCADE)
    group = models.ForeignKey('Group',on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()


class Payment(models.Model):
    group = models.ForeignKey('Group',on_delete=models.CASCADE)
    user = models.ForeignKey('User',on_delete=models.CASCADE)
    paid_on = models.DateTimeField()
    amount_paid =models.IntegerField()





   
    


    
   

