from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from rest_framework.views import APIView
from user.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import parser_classes
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.parsers import FileUploadParser,MultiPartParser,JSONParser
import re

def jwt_response_payload_handler(token, user=None, request=None):
    return {
        'auth': {'token': token},
        'avatar': user.avatar.url,
    }


emailPattern = re.compile(r'^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$')


class register(APIView):
    permission_classes = (AllowAny,)
    def post(self, request, format=None):

        username = request.data.get('username', None)
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        print(username, email, password)
        if None in (username, email, password):
            return Response({'error': 'Parameter errors'}, status=status.HTTP_400_BAD_REQUEST)

        print(len(username), len(email), len(password))
        if len(username) <= 6:
            return Response({'error': 'Username must be longer than 6'}, status=status.HTTP_400_BAD_REQUEST)

        if len(password) <= 6:
            return Response({'error': 'Password must be longer than 6'}, status=status.HTTP_400_BAD_REQUEST)

        if emailPattern.match(email) is None:
            return Response({'error': 'Invalid email format'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            User.objects.create_user(username=username, email=email, password=password)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'response': 'success'}, status=status.HTTP_200_OK)


class userinfo(APIView):
    parser_classes = (MultiPartParser,)
    def get(self, request, format=None):
        print(request.user.id)
        print(request.user.email)
        print(request.user.registeredTime)
        try:
            user = User.objects.get(pk=request.user.id)
        except:
            return Response({"errors": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        userinfo = {}
        userinfo['username'] = user.username
        userinfo['email'] = user.email
        userinfo['registeredTime'] = user.registeredTime
        userinfo['nickname'] = user.nickname
        userinfo['signature'] = user.signature
        userinfo['avatar'] = user.avatar.url
        # TODO: 注册时间，背单词的状态，邮箱，用户名等等
        return Response(userinfo, status=status.HTTP_200_OK)

    def put(self, request, format=None):
        print(request.POST)
        nickname = request.data.get('nickname', None)
        signature = request.data.get('signature', None)
        avatar = request.data.get('avatar', None)
        print(nickname, signature, avatar)
        if None in (nickname, signature, avatar):
            return Response({'error': 'Parameter errors'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(pk=request.user.id)
        except Exception as e:
            print(e)
            return Response({'error': 'Not exited user'}, status=status.HTTP_400_BAD_REQUEST)

        if nickname is not None: user.nickname = nickname
        if signature is not None: user.signature = signature
        if avatar is not None: user.avatar = avatar
        user.save()
        return Response({'response': 'success'}, status=status.HTTP_200_OK)


