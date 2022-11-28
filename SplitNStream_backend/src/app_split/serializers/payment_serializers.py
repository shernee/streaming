from rest_framework import serializers

class PaymentSerializer(serializers.Serializer):
    group_id = serializers.IntegerField(required=True)
    payment_amount = serializers.DecimalField(required=True, max_digits=7, decimal_places=2)