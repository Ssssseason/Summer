import django
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()
from word import models
import csv

def init_v():
    print('init vocabulary')
    objs = []
    def create(content, phonetic, definition, translation, tag):
        objs.append(models.Word(content=content,phonetic=phonetic,definition=definition,translation=translation,tag=tag))

    with open('C:\\w\\bs\\ECDICT\\ecdict.csv',encoding="UTF-8") as f:
        f_csv = csv.reader(f)
        header = next(f_csv)
        cnt = 0
        for r in f_csv:
            if cnt == 5000:
                break
            if r[0] != "" and r[1] != ""  and r[2] != "" and r[3] != "" and r[7] != "":
                create(r[0], r[1], r[2], r[3], r[7])
                cnt += 1
    print(len(objs))
    models.Word.objects.all().delete()
    models.Word.objects.bulk_create(objs)

def main():
    init_v()

if __name__ == '__main__':
    main()