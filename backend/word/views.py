from django.shortcuts import render
from rest_framework.views import APIView
from word import models as wordModels
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
                pronunciation = wordModels.Pronunciation.objects.filter(word = w)
                definition = wordModels.Definition.objects.filter(word=w)
                wordDetail['pronunciation'] = [{'phoneme': p.phoneme, 'audio': p.audio.url} for p in pronunciation]
                wordDetail['definition'] = [{'type': d.type, 'meaning': d.meaning} for d in definition]
                wordDetails.append(wordDetail)

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response(wordDetails, status=status.HTTP_200_OK)

class wordbook_details(APIView):
    def get(self, request, format=None):
        wordbookIds = request.GET.getlist('wordbook_ids[]', None)
        print(wordbookIds)
        if wordbookIds is None:
            return Response({'error': 'Parameter error'}, status=status.HTTP_400_BAD_REQUEST)

        wordbookDetails = []
        try:
            wordbooks = wordModels.WordBook.objects.filter(pk__in=wordbookIds)
            for wordbook in wordbooks:
                wordbookDetails.append({'name': wordbook.name, 'introduction': wordbook.introduction,
                                        'cover': wordbook.cover.url})
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response(wordbookDetails, status=status.HTTP_200_OK)






