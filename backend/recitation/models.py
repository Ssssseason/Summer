from django.db import models
import datetime

# Create your models here.
class Subscription(models.Model):
    user = models.OneToOneField('user.User', on_delete=models.CASCADE, primary_key=True)
    wordbook = models.ForeignKey('word.WordBook', on_delete=models.CASCADE, null=True)
    targetNumber = models.IntegerField(default=20, blank=False)

class Recitation(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, blank=False)
    word = models.ForeignKey('word.Word', on_delete=models.CASCADE, blank=False)
    duration = models.DurationField(default=datetime.timedelta(days=1))
    lastRecitedTime = models.DateField(auto_now=True)
    recitedTimeCount = models.IntegerField(default=0, blank=False)
    successTimeCount = models.IntegerField(default=0, blank=False)

    class Meta:
        unique_together = (('user', 'word'),)

class Plan(models.Model):
    user = models.ForeignKey('user.User', on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    word = models.ForeignKey('word.Word', on_delete=models.CASCADE)
    isChecked = models.BooleanField(default=False, blank=False)
    times = models.IntegerField(default=0, blank=False)
