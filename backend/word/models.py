from django.db import models
from django.core.files.storage import FileSystemStorage


# Create your models here.
class WordBook(models.Model):
    name = models.CharField(max_length=50, unique=True, blank=False)
    introduction = models.CharField(max_length=500, blank=True)
    cover = models.ImageField(default='assets/user/aa.jpg', upload_to='assets/wordbook')
    creator = models.ForeignKey("user.User", default=1, on_delete=models.CASCADE)

class Word(models.Model):
    wordbook = models.ForeignKey('WordBook', on_delete=models.CASCADE)
    content = models.CharField(max_length=50, unique=True, blank=False)

class Pronunciation(models.Model):
    word = models.ForeignKey('Word', on_delete=models.CASCADE)
    phoneme = models.CharField(max_length=50, blank=False, default='ŋ')
    audio = models.FileField(upload_to='asssets/word', blank=False)

class Definition(models.Model):
    word = models.ForeignKey('Word', on_delete=models.CASCADE, blank=False)
    TYPE_CHOICES = (
        ('n', 'n.'),
        ('pron', 'pron.'),
        ('adj', 'adj.'),
        ('adv', 'adv.'),
        ('v', 'v.'),
        ('num', 'num.'),
        ('art', 'art.'),
        ('prep', 'prep.'),
        ('conj', 'conj.'),
        ('inte', 'interj.'),
    )
    type = models.CharField(max_length=4, choices=TYPE_CHOICES, blank=False)
    meaning = models.CharField(max_length=50, blank=False)


