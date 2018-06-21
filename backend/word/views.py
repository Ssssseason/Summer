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
                wordDetail['definition'] = w.definitation.split('\n')
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
            wordbooks = wordModels.WordBook.objects.all()
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






