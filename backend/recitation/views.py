from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.views import APIView
# from user.models import User
from .models import Plan, Recitation, Subscription
from word.models import Word, WordBook
from rest_framework.response import Response
from rest_framework import status
from django.db.models import F, Case, When, Value, ExpressionWrapper, Q
from django.db.models import DateField, FloatField
import datetime
import random
from rest_framework.decorators import parser_classes
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.parsers import FileUploadParser,MultiPartParser,JSONParser

# 调整 batch number
batchNum = 4
maxTimes = 4
# TODO:
examNum = 4

class rec_plan(APIView):
    def get(self, request, format=None):
        uid = request.user.id
        try:
            todayPlans = Plan.objects.filter(user=uid, date=datetime.date.today())
            todayPlansNum = todayPlans.count()

            if(todayPlansNum > 0):
                targetNum = Subscription.objects.get(user=uid).targetNumber
                incNum = todayPlansNum - targetNum
                doneNum = todayPlans.filter(Q(isChecked=True) | Q(times=maxTimes)).count()
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

        print(uid)

        if type == 'recite':
            try:
                todayLeftPlans = Plan.objects.select_related('word').filter(user=uid, date=datetime.date.today(), isChecked=False, times__lt=maxTimes)[:batchNum]
                print(todayLeftPlans.values_list())
                if(todayLeftPlans.count()>0):
                    words = [p.word for p in todayLeftPlans]

                else:
                    sub = Subscription.objects.get(user=uid)
                    targetNum = sub.targetNumber
                    wordbook = sub.wordbook

                    todayDoneWords = Plan.objects.filter(Q(user=uid), Q(date=datetime.date.today()), Q(isChecked=True) | Q(times=maxTimes)).values_list('word')

                    oldWords = Recitation.objects.annotate(priority=ExpressionWrapper(
                        F('successTimeCount') / (F('recitedTimeCount')+0.1), output_field=FloatField()
                    )).filter(user=uid, word__wordbook= wordbook)

                    oldWords1 = oldWords.filter(successTimeCount__lt=F('recitedTimeCount') * 0.7)
                    oldWords2 = oldWords.filter(successTimeCount__gte=F('recitedTimeCount') * 0.7, lastRecitedTime__lt=datetime.date.today()-F('duration'))

                    print(oldWords2.values('word_id', 'word__content'))
                    # TODO: 调整优先级

                    oldWords = oldWords1.union(oldWords2).exclude(word__in=set(todayDoneWords)).order_by('-priority')[:targetNum]
                    print(oldWords.values())
                    for oldWord in oldWords:
                        Plan.objects.create(user=request.user, word=oldWord.word)

                    oldWordNum = oldWords.count()
                    if oldWordNum <targetNum:
                        wordBook = Subscription.objects.get(user=uid).wordbook
                        recitedWord = list(Recitation.objects.filter(user=uid))
                        recitedWords = []
                        for rw in recitedWord:
                            recitedWords.append(rw.word_id)
                        newWord = Word.objects.filter(wordbook=wordBook).exclude(id__in=recitedWords)[:targetNum-oldWordNum]
                        for w in newWord:
                            Recitation.objects.create(user=request.user, word=w)
                            Plan.objects.create(user=request.user, word=w)

                    todayLeftPlans = Plan.objects.filter(user=uid, date=datetime.date.today(), isChecked=False, times__lt=maxTimes)[:batchNum]
                    words = [p.word for p in todayLeftPlans]

            except Exception as e:
                print(e)
                return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        elif type == 'review':
            try:
                sub = Subscription.objects.get(user=uid)
                targetNum = sub.targetNumber
                wordbook = sub.wordbook
                # todayDoneWords = Plan.objects.filter(Q(user=uid), Q(date=datetime.date.today()), Q(isChecked=True) | Q(times=maxTimes)).values_list('word')

                oldWords = Recitation.objects.annotate(priority=ExpressionWrapper(
                    F('successTimeCount') / (F('recitedTimeCount')+0.1), output_field=FloatField()
                )).filter(user=uid, word__wordbook=wordbook).order_by('-priority')[:targetNum]

                for oldWord in oldWords:
                    Plan.objects.create(user=request.user, word=oldWord.word)

                todayLeftPlans = Plan.objects.filter(user=uid, date=datetime.date.today(), isChecked=False, times__lt=maxTimes)[:batchNum]
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
                wordDetail['phonetic'] = w.phonetic
                wordDetail['definition'] = w.definition.split('\n')
                wordDetail['translation'] = w.translation.split('\n')
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
                plan = todayPlans.get(word=res['id'], isChecked=False, times__lt=maxTimes)
                plan.isChecked = bool(res['checkedRes'])
                plan.times += 1
                plan.save()
                recitation = Recitation.objects.get(user=uid, word=res['id'])
                recitation.lastRecitedTime = datetime.date.today()
                recitation.recitedTimeCount += 1
                recitation.successTimeCount += int(res['checkedRes'])

                if res['checkedRes']:
                    # TODO: 完善背单词算法
                    recitation.duration = recitation.duration * 2
                elif plan.times == maxTimes:
                    recitation.duration = datetime.timedelta(days=1)
                recitation.save()

            todayPlans = Plan.objects.filter(user=uid, date=datetime.date.today())
            targetNum = Subscription.objects.get(user=uid).targetNumber
            incNum = todayPlans.count() - targetNum
            doneNum = todayPlans.filter(Q(isChecked=True) | Q(times=maxTimes)).count()

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'targetNum': targetNum, 'incNum':incNum, 'doneNum': doneNum}, status=status.HTTP_200_OK)


class target_num(APIView):
    def get(self, request, format=None):
        user = request.user
        print(user)

        try:
            targetNum = Subscription.objects.get(user=user).targetNumber
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response(targetNum, status=status.HTTP_200_OK)


    def post(self, request, format=None):
        user = request.user
        print(user)
        newTargetNum = request.data.get('targetNum', None)
        if newTargetNum is None:
            return Response({'error': 'Parameter error'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            subscription = Subscription.objects.get(user=user)
            subscription.targetNumber = newTargetNum
            subscription.save()
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'success': 'success'}, status=status.HTTP_200_OK)



class subscription(APIView):
    def get(self, request, format=None):
        user = request.user
        print(user)

        try:
            wordbook = Subscription.objects.get(user=user).wordbook
            creatorName = wordbook.creator.nickname
            wordNum = Word.objects.filter(wordbook=wordbook).count()
            doneNum = Recitation.objects.filter(user=user, word__wordbook=wordbook).count()
            wordbookDetail = {'id': wordbook.id, 'name': wordbook.name, 'introduction': wordbook.introduction,
                            'cover': wordbook.cover.url, 'creatorName': creatorName, 'wordNum': wordNum,
                              'doneNum': doneNum}

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response(wordbookDetail, status=status.HTTP_200_OK)


    def post(self, request, format=None):
        user = request.user
        print(user)
        wordbookid = request.data.get('id', None)
        if wordbookid is None:
            return Response({'error': 'Parameter error'}, status=status.HTTP_400_BAD_REQUEST)
        print(wordbookid)
        try:
            subscription = Subscription.objects.get(user=user)
            subscription.wordbook = WordBook.objects.get(pk=wordbookid)
            subscription.save()
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'success': 'success'}, status=status.HTTP_200_OK)

class exam(APIView):
    def get(self, request, format=None):
        user = request.user
        print(user)
        try:
            wordbook = Subscription.objects.get(user=user).wordbook

            examWords = Recitation.objects.annotate(priority=ExpressionWrapper(
                F('successTimeCount') / (F('recitedTimeCount')+0.1), output_field=FloatField()
            )).filter(user=user, word__wordbook=wordbook).order_by('-priority')[:examNum]

            wordDetails = []
            allWordNum = Word.objects.count()

            for examWord in list(examWords):
                w = examWord.word
                wordDetail = {}
                wordDetail['id'] = w.id
                wordDetail['content'] = w.content
                wordDetail['phonetic'] = w.phonetic
                wordDetail['options'] = []
                for i in range(4):
                    randomIdx = int(random.random() * allWordNum)
                    translation = Word.objects.all()[randomIdx].translation.split('\n')
                    randomIdx = int(random.random() * len(translation))
                    translation = translation[randomIdx]
                    wordDetail['options'].append(translation)

                translation = w.translation.split('\n')
                randomIdx = int(random.random() * len(translation))
                translation = translation[randomIdx]

                randomIdx = int(random.random() * 4)
                wordDetail['options'][randomIdx] = translation
                wordDetail['answer'] = randomIdx

                wordDetails.append(wordDetail)

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response(wordDetails, status=status.HTTP_200_OK)


    def post(self, request, format=None):
        user = request.user
        examRes = request.data.get('examRes', None)

        if examRes is None:
            return Response({'error': "Parameter error"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            for res in examRes:
                rec = Recitation.objects.get(user=user, word=res['id'])
                rec.recitedTimeCount += 1
                rec.successTimeCount += int(res['res'])
                rec.save()

        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)

        return Response({'success': 'success'}, status=status.HTTP_200_OK)









