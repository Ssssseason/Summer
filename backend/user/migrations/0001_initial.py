# Generated by Django 2.0.6 on 2018-06-17 13:26

import django.core.validators
from django.db import migrations, models
import user.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('username', models.CharField(max_length=20, unique=True, validators=[django.core.validators.MinLengthValidator(6)])),
                ('email', models.EmailField(max_length=254, unique=True, validators=[django.core.validators.MinLengthValidator(6)])),
                ('registeredTime', models.DateTimeField(auto_now_add=True)),
                ('nickname', models.CharField(default='用户', max_length=20)),
                ('signature', models.CharField(default='这个人很懒，什么都没有写~', max_length=100)),
                ('avatar', models.ImageField(default='assets/user/aa.jpg', upload_to='assets/user/')),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', user.models.UserManager()),
            ],
        ),
    ]