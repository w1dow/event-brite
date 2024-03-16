from django.db import models

class User(models.Model):
    class Meta:
        db_table='users' # table to be used
        # name = models.typeofinput()
    username = models.CharField(max_length=200)
    email = models.EmailField(max_length=200,default="none@gmail.com")
    password = models.CharField(max_length=300)


class Event(models.Model):
    class Meta:
            db_table = 'events' #table to be used
        # name = models.typeofinput()
    event_name = models.CharField(max_length=100)
    date = models.CharField(max_length=200)
    time = models.TimeField()
    location = models.CharField(max_length=200)
    image = models.ImageField(upload_to='api/event_images/',null=True,blank=True)
    is_liked = models.BooleanField(default=False)
    user_id = models.IntegerField()
    nol = models.IntegerField(default=0)  
