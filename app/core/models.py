from django.db import models

class Artist(models.Model):
    name = models.CharField(max_length=200)
    website = models.CharField(max_length=200)

class Track(models.Model):
    artist = models.ForeignKey(
        Artist,
        on_delete=models.CASCADE
    )
    name = models.CharField(max_length=200)
