"""
Tests for the artist API
"""
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Artist, Track

from artist.serializer import ArtistSerializer, ArtistDetailSerializer


ARTIST_URL = reverse('artist:artist-list')

MOCK_ARTIST = {
    'first_name': 'Bob',
    'last_name': 'Dylan',
}

def detail_url(artist_id):
    """Create and return an artist detail URL."""
    return reverse('artist:artist-detail', args=[artist_id])


def create_artist(**params):
    """Create and return the artist"""
    MOCK_ARTIST.update(params)

    artist = Artist.objects.create(**MOCK_ARTIST)
    return artist


class PublicArtistAPITests(TestCase):
    """Test artist API request"""

    def setUp(self) -> None:
        self.client = APIClient()

    def test_show_all_artists(self):
        """Test creating the new artist without any tracks"""
        create_artist()
        create_artist(first_name='Mariah', last_name='Carey')
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
        payload = MOCK_ARTIST
        res = self.client.post(ARTIST_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        artist = Artist.objects.get(id=res.data['id'])
        for key, value in payload.items():
            self.assertEqual(getattr(artist, key), value)

    def test_create_new_artist_with_tracks(self):
        """Test create new artist with tracks"""
        payload = {
            'first_name': 'Billie',
            'last_name': 'Eilish',
            'tracks': [{'title': 'Ocean Eyes'}, {'title': 'Bad Guy'}],
        }
        res = self.client.post(ARTIST_URL, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        artist = Artist.objects.get(id=res.data['id'])
        self.assertEqual(artist.tracks.count(), 2)

        for track in payload['tracks']:
            exists = artist.tracks.filter(title=track['title']).exists()
            self.assertTrue(exists)

    def test_update_artist_with_new_tracks(self):
        """Test updating tracks on an existing artist"""
        artist = create_artist()

        payload = {'tracks': [{'title': 'The Big Blue Sea'}]}
        url = detail_url(artist.id)
        res = self.client.patch(url, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        new_track = Track.objects.get(title="The Big Blue Sea")
        self.assertIn(new_track, artist.tracks.all())

    def test_update_artist_with_existing_track(self):
        """Test assigning existing track when updating an artist"""
        track_old = Track.objects.create(title="Old Days")
        artist = create_artist()
        artist.tracks.add(track_old)

        track_new = Track.objects.create(title="New Days")
        payload = {"tracks": [{"title": "New Days"}]}
        url = detail_url(artist.id)
        res = self.client.patch(url, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertIn(track_new, artist.tracks.all())
        self.assertNotIn(track_old, artist.tracks.all())

    def test_clear_artist_tracks(self):
        """Test clearing all the artist's tracks"""
        track = Track.objects.create(title="Bad Days")
        artist = create_artist()
        artist.tracks.add(track)

        payload = {'tracks': []}
        url = detail_url(artist.id)
        res = self.client.patch(url, payload, format='json')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(artist.tracks.count(), 0)