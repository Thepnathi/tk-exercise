from email.policy import default
from django.contrib.postgres.fields import ArrayField
from django.db import models


class Track(models.Model):
    title = models.CharField(max_length=250, default="")

    def __str__(self):
        return self.title

class Artist(models.Model):
    first_name = models.CharField(max_length=250, default="")
    last_name = models.CharField(max_length=250, default="")
    tracks = models.ManyToManyField(Track, blank=True)
    description = models.CharField(max_length=200, default="")

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
