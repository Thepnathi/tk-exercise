"""
Tests for the track API.
"""
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from artist.serializer import TrackSerializer

from core.models import Track

TRACK_URL = reverse('artist:track-list')

def detail_url(track_id):
    """Create and return an track detail URL."""
    return reverse('artist:track-detail', args=[track_id])

def create_tag(**params):
    """Create and return the artist"""
    MOCK_TRACK = {
    'title': 'Bohemian Rhapsody'
    }
    MOCK_TRACK.update(params)

    track = Track.objects.create(**MOCK_TRACK)
    return track

class PublicTrackApiTests(TestCase):
    """Test track API requests"""

    def setUp(self) -> None:
        self.client = APIClient()

    def test_show_all_tracks(self):
        """Test fetching all the tracks"""
        Track.objects.create(title='Smooth Criminal')
        Track.objects.create(title='All Hail The Sun')
        Track.objects.create(title='Wrong Way')

        res = self.client.get(TRACK_URL)

        tracks = Track.objects.all().order_by('-title')
        serializer = TrackSerializer(tracks, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_update_track(self):
        """Test updating a track"""
        track = Track.objects.create(title='Smooth Criminal')

        payload = {'title': 'Come Back'}
        url = detail_url(track.id)
        res = self.client.patch(url, payload)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        track.refresh_from_db()
        self.assertEqual(track.title, payload['title'])

    def test_delete_track(self):
        """Test deleting a track"""
        track = Track.objects.create(title='Smooth Criminal')
        url = detail_url(track.id)
        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        tracks = Track.objects.all()
        self.assertFalse(tracks.exists())