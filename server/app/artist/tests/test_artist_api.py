"""
Tests for the artist API
"""
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Artist

from artist.serializer import ArtistSerializer, ArtistDetailSerializer

ARTIST_URL = reverse('artist:artist-list')

def detail_url(artist_id):
    """Create and return an artist detail URL."""
    return reverse('artist:artist-detail', args=[artist_id])

def create_artist(**params):
    """Create and return the artist"""
    defaults = {
        'name': 'Nirvana',
        'website': 'www.nirvana.com',
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

    def test_get_artist_detail(self):
        artist = create_artist()
        url = detail_url(artist.id)
        res = self.client.get(url)

        serializer = ArtistDetailSerializer(artist)
        self.assertEqual(res.data, res.data)

    def test_create_new_artist_without_tracks(self):
        """Test create new artist without adding tracks"""
        payload = {
            'name': 'Billie Eilish',
            'website': 'www.billieeilish.com'
        }
        res = self.client.post(ARTIST_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        artist = Artist.objects.get(id=res.data['id'])
        for key, value in payload.items():
            self.assertEqual(getattr(artist, key), value)

    def test_create_new_artist_with_tracks(self):
        """Test create new artist with tracks"""
        payload = {
            'name': 'Billie Eilish',
            'website': 'www.billieeilish.com',
            'tracks': ['Bad Guy', 'Ocean Eyes'],
        }
        res = self.client.post(ARTIST_URL, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        artist = Artist.objects.get(id=res.data['id'])
        for key, value in payload.items():
            self.assertEqual(getattr(artist, key), value)

    def test_update_artist(self):
        """Test update the artist with new tracks"""
        artist = create_artist(tracks=['Smell Like Teen Spirit'])
        payload = {
            'name': 'Nirvana',
            'website': 'www.nirvana.com',
            'tracks': ['Smell Like Teen Spirit', 'Something in the Way']
        }
        url = detail_url(artist.id)
        print('url', url)
        res = self.client.put(url, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        artist.refresh_from_db()
        for key, value in payload.items():
            print(f'artist: {getattr(artist, key)}, payload-value: {value}')
            self.assertEqual(getattr(artist, key), value)
