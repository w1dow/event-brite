from rest_framework import serializers
from .models import User
from .models import Event
# Serializind data i.e converting to json form so that the sever can understand this
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'event_name', 'date', 'time', 'location', 'image', 'is_liked', 'user_id','nol']