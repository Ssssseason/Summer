from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
# from user.models import User
from .models import Plan, Recitation, Subscription
from word.models import Word, Pronunciation, Definition
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F, Case, When, Value, ExpressionWrapper
from django.db.models import DateField, FloatField
import datetime
from rest_framework.decorators import parser_classes
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.parsers import FileUploadParser,MultiPartParser,JSONParser

class rec_plan(APIView):
    def get(self, request, format=None):
        uid = request.user.id
        try:
            todayPlans = Plan.objects.filter(user=uid, date=datetime.date.today())
            todayPlansNum = todayPlans.count()

            if(todayPlansNum > 0):
                # TODO: 未测试
                targetNum = Subscription.objects.get(user=uid).targetNumber
                incNum = todayPlansNum - targetNum
                doneNum = todayPlans.filter(isChecked=True).count()
            else:
                targetNum = Subscription.objects.get(user=uid).targetNumber
                incNum = 0
                doneNum = 0

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        print(targetNum, incNum, doneNum)
        return Response({'targetNum': targetNum, 'incNum':incNum, 'doneNum':doneNum}, status=status.HTTP_200_OK)


class rec_word(APIView):
    def get(self, request, format=None):
        uid = request.user.id
        type = request.GET.get('type', None)
        if type is None:
            return Response({'error': "Parameter errors"}, status=status.HTTP_400_BAD_REQUEST)

        batchNum = 4
        print(uid)

        try:
            todayLeftPlans = Plan.objects.select_related('word').filter(user=uid, date=datetime.date.today(), isChecked=False)[:batchNum]
            print(todayLeftPlans.values_list())
            if(todayLeftPlans.count()>0):
                words = [p.word for p in todayLeftPlans]

            else:
                targetNum = Subscription.objects.get(user=uid).targetNumber
                todayDoneWords = Plan.objects.filter(user=uid, date=datetime.date.today(), isChecked=True).values_list('word')

                oldWords = Recitation.objects.annotate(priority=ExpressionWrapper(
                    F('successTimeCount') / (F('recitedTimeCount')+0.1), output_field=FloatField()
                )).filter(user=uid)

                oldWords1 = oldWords.filter(successTimeCount__lt=F('recitedTimeCount') * 0.8)
                oldWords2 = oldWords.filter(successTimeCount__gte=F('recitedTimeCount')*0.8, lastRecitedTime__lt=datetime.date.today()+F('duration'))

                print(todayDoneWords.values())
                # TODO: 调整优先级

                oldWords = oldWords1.union(oldWords2).exclude(word__in=set(todayDoneWords)).order_by('-priority')[:targetNum]
                print(oldWords.values())
                for oldWord in oldWords:
                    Plan.objects.create(user=request.user, word=oldWord.word)

                ordWordNum = oldWords.count()
                if type != 'review' and ordWordNum <targetNum:
                    wordBook = Subscription.objects.get(user=uid).wordbook
                    recitedWord = Recitation.objects.filter(user=uid)
                    newWord = Word.objects.filter(wordbook=wordBook).exclude(id__in=recitedWord)[:targetNum-ordWordNum]
                    for w in list(newWord):
                        Recitation.objects.create(user=request.user, word=w)
                        Plan.objects.create(user=request.user, word=w)
                todayLeftPlans = Plan.objects.filter(user=uid, date=datetime.date.today(), isChecked=False)[:batchNum]
                words = [p.word for p in todayLeftPlans]

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        wordDetails = []
        try:
            for w in words:
                wordDetail = {}
                wordDetail['id'] = w.id
                wordDetail['content'] = w.content
                pronunciation = Pronunciation.objects.filter(word = w)
                definition = Definition.objects.filter(word=w)
                wordDetail['pronunciation'] = [{'phoneme': p.phoneme, 'audio': p.audio.url} for p in pronunciation]
                wordDetail['definition'] = [{'type': d.type, 'meaning': d.meaning} for d in definition]
                wordDetails.append(wordDetail)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response(wordDetails, status=status.HTTP_200_OK)



    def put(self, request, format=None):
        uid = request.user.id
        checkedRes = request.data.get('checkedRes', None)
        print(uid, checkedRes)

        if checkedRes is None:
            return Response({'error': "Parameter error"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            todayPlans = Plan.objects.filter(user=uid, date=datetime.date.today())
            for res in checkedRes:
                print(res)
                plan = todayPlans.get(word=res['id'], isChecked=False)
                plan.isChecked = True
                plan.save()
                recitation = Recitation.objects.get(user=uid, word=res['id'])
                recitation.lastRecitedTime = datetime.date.today()
                recitation.recitedTimeCount += 1
                recitation.successTimeCount += int(res['checkedRes'])
                if(res['checkedRes']):
                    # TODO: 完善背单词算法
                    recitation.duration = recitation.duration * 2
                recitation.save()

            todayPlans = Plan.objects.filter(user=uid, date=datetime.date.today())
            targetNum = Subscription.objects.get(user=uid).targetNumber
            incNum = todayPlans.count() - targetNum
            doneNum = todayPlans.filter(isChecked=True).count()

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'targetNum': targetNum, 'incNum':incNum, 'doneNum':doneNum}, status=status.HTTP_200_OK)






