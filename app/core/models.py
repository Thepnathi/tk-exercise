from django.contrib.postgres.fields import ArrayField
from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=250)
    tracks = ArrayField(models.CharField(max_length=200), default=list)
    website = models.CharField(max_length=200)

    def __str__(self):
        return self.name
