from rest_framework import serializers

class CreateUserSerializer(serializers.Serializer):
    first_name = serializers.CharField(required=True, max_length=64)
    last_name = serializers.CharField(required=True, max_length=64) 
    username = serializers.CharField(required=True, max_length=64)
    password = serializers.CharField(required=True, max_length=24)
    email = serializers.EmailField(required=True)
    is_admin = serializers.BooleanField()

    