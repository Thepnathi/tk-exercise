"""
Tests for the artist API
"""
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Artist

from artist.serializer import ArtistSerializer

ARTIST_URL = reverse('artist:list')

def create_artist(**params):
    """Create and return the artist"""
    defaults = {
        'name': 'Nirvana',
        'website': 'www.nirvana.com'
    }
    defaults.update(params)

    artist = Artist.objects.create(**defaults)
    return artist

class PublicArtistAPITests(TestCase):
    """Test artist API request"""

    def setUp(self) -> None:
        self.client = APIClient()

    def test_show_all_artists(self):
        """Test creating the new artist without any tracks"""
        create_artist()
        create_artist(name='The Beatles', website='www.beatles.com')
        res = self.client.get(ARTIST_URL)
        artists = Artist.objects.all().order_by('-id')
        serializer = ArtistSerializer(artists, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def create_new_artist_without_tracks(self):
        pass

    def create_new_artist_with_tracks(self):
        pass

