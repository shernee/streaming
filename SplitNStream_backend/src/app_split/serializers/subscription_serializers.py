from rest_framework import serializers

class ListGroupsSerializer(serializers.Serializer):
    subscription_id = serializers.IntegerField(required=True)


