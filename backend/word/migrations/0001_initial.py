# Generated by Django 2.0.6 on 2018-06-18 03:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Definition',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('n', 'n.'), ('pron', 'pron.'), ('adj', 'adj.'), ('adv', 'adv.'), ('v', 'v.'), ('num', 'num.'), ('art', 'art.'), ('prep', 'prep.'), ('conj', 'conj.'), ('inte', 'interj.')], max_length=4)),
                ('meaning', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Pronunciation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phoneme', models.CharField(default='ŋ', max_length=50)),
                ('audio', models.FileField(upload_to='asssets/word')),
            ],
        ),
        migrations.CreateModel(
            name='Word',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='WordBook',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('introduction', models.CharField(blank=True, max_length=500)),
                ('cover', models.ImageField(default='assets/user/aa.jpg', upload_to='assets/wordbook')),
                ('creator', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='word',
            name='wordbook',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='word.WordBook'),
        ),
        migrations.AddField(
            model_name='pronunciation',
            name='word',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='word.Word'),
        ),
        migrations.AddField(
            model_name='definition',
            name='word',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='word.Word'),
        ),
    ]
