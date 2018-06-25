from django.db import models
from django.db import transaction
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.core import validators

# Create your models here.
class UserManager(BaseUserManager):
    use_in_migrations = True

    @transaction.atomic
    def _create_user(self, username, email, password, **kwargs):
        if not username:
            raise ValueError("The given username must be set")
        if not email:
            raise ValueError("The given email must be set")
        if len(username) < 6:
            raise ValueError("The given username must be longer than 6")
        if len(email) < 6:
            raise ValueError("The given email must be longer than 6")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, password, **kwargs):
        user = self._create_user(username, email, password, **kwargs)
        user.is_admin = False
        user.is_staff = False
        user.is_superuser = False
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **kwargs):
        user = self._create_user(username, email, password, **kwargs)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    username = models.CharField(max_length=20, unique=True, blank=False, validators=[validators.MinLengthValidator(6)])
    email = models.EmailField(max_length=254, unique=True, blank=False, validators=[validators.MinLengthValidator(6)])

    registeredTime = models.DateTimeField(auto_now_add=True)

    nickname = models.CharField(max_length=20, blank=False, default='用户')
    signature = models.CharField(max_length=100, blank=False, default='这个人很懒，什么都没有写~')
    avatar = models.ImageField(default='user/aa.jpg', upload_to='user/')

    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)


    objects = UserManager()
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

