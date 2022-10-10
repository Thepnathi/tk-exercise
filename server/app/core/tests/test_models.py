"""
Test for Models
"""
from django.test import TestCase
from core import models

class ModelTest(TestCase):
    """Test models"""

    def test_create_artist_successful_without_tracks(self):
        """Test create an artist with name and no tracks is successful"""
        artist = models.Artist.objects.create(
            first_name='Michael',
            last_name='Jackson',
        )
        self.assertEqual(str(artist), f'{artist.first_name} {artist.last_name}')

    def test_create_artist_successful_with_tracks(self):
        """Test create an artist with name and no tracks is successful"""
        track = models.Track.objects.create(
            title="Smooth Criminal"
        )

        artist = models.Artist.objects.create(
            first_name='Michael',
            last_name='Jackson',
        )
        artist.tracks.set([track, track])
        self.assertEqual(str(artist), f'{artist.first_name} {artist.last_name}')

    def test_create_track_is_successful(self):
        track = models.Track.objects.create(
            title="Smooth Criminal"
        )
        self.assertEqual(str(track), track.title)