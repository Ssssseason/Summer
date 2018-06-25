from django.shortcuts import render
from rest_framework.views import APIView
from word import models as wordModels
from recitation.models import Recitation
from rest_framework.response import Response
from rest_framework import status

# Create your views here.
class word_details(APIView):
    """
    应该不会用到
    """
    def get(self, request, format=None):
        wordIds = request.GET.getlist('wordids[]', None)
        wordIds = list(map(int, wordIds))
        print(wordIds)
        if None in wordIds:
            return Response({'error': 'Parameter Error'}, status=status.HTTP_400_BAD_REQUEST)

        wordDetails = []
        try:
            word = wordModels.Word.objects.filter(pk__in=wordIds)
            for w in word:
                wordDetail = {}
                wordDetail['content'] = w.content
                wordDetail['phonetic'] = w.phonetic
                wordDetail['definition'] = w.definition.split('\n')
                wordDetail['translation'] = w.translation.split('\n')
                wordDetails.append(wordDetail)

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response(wordDetails, status=status.HTTP_200_OK)

class wordbook_details(APIView):
    def get(self, request, format=None):
        user = request.user
        wordbookDetails = []
        try:
            wordbooks = wordModels.WordBook.objects.filter(creator__is_staff=True)
            for wordbook in wordbooks:
                creatorName = wordbook.creator.nickname
                wordNum = wordModels.Word.objects.filter(wordbook=wordbook).count()
                doneNum = Recitation.objects.filter(user=user, word__wordbook=wordbook).count()
                wordbookDetail = {'id': wordbook.id, 'name': wordbook.name, 'introduction': wordbook.introduction,
                                  'cover': wordbook.cover.url, 'creatorName': creatorName, 'wordNum': wordNum,
                                  'doneNum': doneNum}
                wordbookDetails.append(wordbookDetail)

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response(wordbookDetails, status=status.HTTP_200_OK)


class gen_my_dict(APIView):
    def post(self, request, format=None):
        try:
            words = wordModels.Word.objects.all()
            for word in words:
                tagList = word.tag.split(' ')
                print(tagList)
                for tag in tagList:
                    wordbook = wordModels.WordBook.objects.get(type=tag)
                    word.wordbook.add(wordbook)

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response({'success': 'success'}, status=status.HTTP_200_OK)


class userdefined(APIView):
    def get(self, request, format=None):
        user = request.user
        print(user)

        if user.is_superuser or user.is_staff or user.is_admin:
            return Response({'error': "Not for admin"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            wordbook = wordModels.WordBook.objects.get(creator=user)

        except wordModels.WordBook.DoesNotExist:
            wordbook = None

        if wordbook is None:
            return Response(status=status.HTTP_200_OK)

        wordDetails = []
        try:
            words = wordModels.Word.objects.filter(wordbook=wordbook)
            for w in words:
                wordDetail = {}
                wordDetail['id'] = w.id
                wordDetail['content'] = w.content
                wordDetail['phonetic'] = w.phonetic
                wordDetail['definition'] = w.definition.split('\n')[0]
                wordDetail['translation'] = w.translation.split('\n')[0]
                wordDetails.append(wordDetail)

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response(wordDetails, status=status.HTTP_200_OK)


    def post(self, request, format=None):
        user = request.user
        print(user)
        content = request.data.get('content', None)
        definition = request.data.get('definition', None)
        translation = request.data.get('translation', None)

        print(content, definition, translation)
        if None in (content, definition, translation):
            return Response({'error': 'Parameter error'}, status=status.HTTP_404_NOT_FOUND)

        try:
            wordbook = wordModels.WordBook.objects.get(creator=user)
        except wordModels.WordBook.DoesNotExist:
            wordbook = None

        try:
            if wordbook is None:
                wordbook =  wordModels.WordBook.objects.create(type='ud', name=user.username + ' defined', creator=user)

            word = wordModels.Word.objects.create(content=content, definition=definition, translation=translation)
            word.wordbook.add(wordbook)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response({'success': 'success'}, status=status.HTTP_200_OK)

    def delete(self, request, format=None):
        user = request.user
        print(user)
        wordid = request.data.get('id', None)
        wordid = request.GET.get('id', None)
        # wordids = request.data.get('ids', None)
        # print(wordids)
        if wordid is None:
            return Response({'error': 'Parameter error'}, status=status.HTTP_404_NOT_FOUND)

        if user.is_superuser or user.is_staff or user.is_admin:
            return Response({'error': "Not for admin"}, status=status.HTTP_400_BAD_REQUEST)

        # try:
        #     for wordid in wordids:
                # wordbook = wordModels.WordBook.objects.get(creator=user)
                # if wordbook.creator != user:
                #     return Response({'error': 'no permission to the word'}, status=status.HTTP_404_NOT_FOUND)
        try:
            word = wordModels.Word.objects.get(pk=wordid, wordbook__creator=user)
            print("xx")
        except wordModels.Word.DoesNotExist:
            print("ex")
            word = None
        if word is not None:
            word.delete()

        # except Exception as e:
        #     print(e)
        #     return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response({'success': 'success'}, status=status.HTTP_200_OK)


    def put(self, request, format=None):
        user = request.user
        print(user)

        id = request.data.get('id', None)
        content = request.data.get('content', None)
        definition = request.data.get('definition', None)
        translation = request.data.get('translation', None)

        print(content, definition, translation)
        if None in (content, definition, translation):
            return Response({'error': 'Parameter error'}, status=status.HTTP_404_NOT_FOUND)

        if user.is_superuser or user.is_staff or user.is_admin:
            return Response({'error': "Not for admin"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            wordbook = wordModels.WordBook.objects.get(creator=user)
            word = wordModels.Word.objects.get(pk=id, wordbook=wordbook)
            word.content = content
            word.definition = definition
            word.translation = translation
            word.save()

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response({'success': 'success'}, status=status.HTTP_200_OK)








