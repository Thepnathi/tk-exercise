# Generated by Django 3.2.16 on 2022-10-06 12:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_artist_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='artist',
            name='first_name',
            field=models.CharField(default='', max_length=250),
        ),
        migrations.AddField(
            model_name='artist',
            name='last_name',
            field=models.CharField(default='', max_length=250),
        ),
    ]
