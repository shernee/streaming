from rest_framework import serializers

class GroupDetailsSerializer(serializers.Serializer):
    group_id = serializers.IntegerField(required=True)