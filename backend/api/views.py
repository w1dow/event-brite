from rest_framework.response import Response
from rest_framework.decorators import api_view
import os
from django.conf import settings
from rest_framework import status
from .models import User
from .serializers import UserSerializer #getting user
from .models import Event #getting event
from .serializers import EventSerializer
from django.http import JsonResponse

@api_view(['GET'])
def get_img(request, image_path):
    # serving images 
    fmp = os.path.join(settings.MEDIA_URL, image_path)
    print("fullimg",fmp)
    if os.path.exists(fmp):
        with open(full_image_path, 'rb') as f:
            return Response(f.read(), content_type='image/jpeg')  #return image 
    else:
        return Response({"message":"no image found"},status=404)


@api_view(['GET'])
def get_users(request):
    # // list all users  only for development

    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def getevent(request):
    #get events from the database

    events = Event.objects.all()
    serialized_events = []
    for event in events:
            serialized_event = EventSerializer(event).data #getting event
            image_url = os.path.join(settings.MEDIA_URL, str(event.image)) #url of image on the server
            absolute_image_url = request.build_absolute_uri(image_url) # absolute url which can be used to access the uploaded images
            serialized_event['image'] = absolute_image_url  # setting the img attribute of event obj to image url so that we can access it in out front-end
            serialized_events.append(serialized_event)
    return Response(serialized_events)



@api_view(['POST'])
def likethis(request):
    #increase the number of likes and checks is liked or not liked
    event = Event.objects.get(id=request.data["id"])
    event.is_liked = True
    event.nol = event.nol+1 
    event.save()
    serializer = EventSerializer(event)
    return Response(serializer.data)

@api_view(['POST'])
def add_user(request):
    #adding new user using sign_Up
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            existing_user = User.objects.filter(username=username).exists() #checking if username already exists
            if not existing_user:
                serializer.save()
                return Response(status=status.HTTP_201_CREATED)
            else:
                return Response("Username already taken", status=status.HTTP_226_IM_USED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_event(request):
    #adding an event to the server
    if request.method == 'POST':
        uid = request.data["user_id"]
        # print(request.data["user_id"])
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(uid, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
def login(request):
    ##Loggin  func
    username = request.data['username']
    password = request.data['password']
    try:
            user = User.objects.get(username=username)
            if user.password == password:
                res = {"message":"Success","id":user.id,"username":str(user.username)}
                return Response(res)
            else:
                return Response({"message":"Invalid username or password","id":None,username:None}, status=200)
    except User.DoesNotExist:
            return Response({"message":"Invalid username or password","id":None,username:None}, status=404)
    else:
        return Response(status=405)  