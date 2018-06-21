from django.db import models
from django.core.files.storage import FileSystemStorage


# Create your models here.
class WordBook(models.Model):
    TYPE_CHOICES = (
        ('zk', '中考'),
        ('gk', '高考'),
        ('ky', '考研'),
        ('cet4', '四级'),
        ('cet6', '六级'),
        ('ielts', '雅思'),
        ('toefl', '托福'),
        ('gre', 'GRE'),
    )
    type = models.CharField(max_length=4, choices=TYPE_CHOICES, unique=True, blank=False)
    name = models.CharField(max_length=50, unique=True, blank=False)
    introduction = models.CharField(max_length=500, blank=True)
    cover = models.ImageField(default='user/aa.jpg', upload_to='wordbook')
    creator = models.ForeignKey("user.User", default=1, on_delete=models.CASCADE)

class Word(models.Model):
    # wordbook = models.ForeignKey('WordBook', on_delete=models.CASCADE)
    wordbook = models.ManyToManyField('WordBook')
    content = models.CharField(max_length=50, unique=True, blank=False)
    phonetic = models.CharField(max_length=50, null=True)
    definitation = models.TextField(null=True)
    translation = models.TextField(null=True)
    # FIXME: 暂时作数据库迁移用
    tag = models.CharField(max_length=50)



# class Pronunciation(models.Model):
#     word = models.ForeignKey('Word', on_delete=models.CASCADE)
#     phoneme = models.CharField(max_length=50, blank=False, default='ŋ')
#     audio = models.FileField(upload_to='word', blank=False)
#
# class Definition(models.Model):
#     word = models.ForeignKey('Word', on_delete=models.CASCADE, blank=False)
#     TYPE_CHOICES = (
#         ('n', 'n.'),
#         ('pron', 'pron.'),
#         ('adj', 'adj.'),
#         ('adv', 'adv.'),
#         ('v', 'v.'),
#         ('num', 'num.'),
#         ('art', 'art.'),
#         ('prep', 'prep.'),
#         ('conj', 'conj.'),
#         ('inte', 'interj.'),
#     )
#     type = models.CharField(max_length=4, choices=TYPE_CHOICES, blank=False)
#     meaning = models.CharField(max_length=50, blank=False)


