"""
Test for Models
"""
from django.test import TestCase
from core import models

class ModelTest(TestCase):
    """Test models"""

    def test_create_artist_successful(self):
        """Test create an artist with name and no tracks is successful"""
        artist = models.Artist.objects.create(
            name="Michael Jackson",
            website="www.mj.com"
        )
        self.assertEqual(str(artist), artist.name)


