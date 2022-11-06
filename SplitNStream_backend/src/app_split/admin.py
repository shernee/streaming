from django.contrib import admin
from .models import Service,Subscription,User, Group, Membership, Payment

admin.site.register(Service)
admin.site.register(Subscription)
admin.site.register(User)
admin.site.register(Group)
admin.site.register(Membership)
admin.site.register(Payment)

# Register your models here.
