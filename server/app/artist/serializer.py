"""
Serializers for artist APIs
"""
from rest_framework import serializers

from core.models import Artist, Track


class TrackSerializer(serializers.ModelSerializer):
    """Serializer for tracks."""

    class Meta:
        model = Track
        fields = ['id', 'title']
        read_only_fields = ['id']

class ArtistSerializer(serializers.ModelSerializer):
    """Serializer for artists."""
    tracks = TrackSerializer(many=True, required=False)

    class Meta:
        model = Artist
        fields = ['id', 'first_name', 'last_name', 'tracks']
        read_only_fields = ['id']

    def _get_or_create_tracks(self, tracks, artist):
        """Handle getting or creating tracks"""
        for track in tracks:
            track_obj, _ = Track.objects.get_or_create(**track)
            artist.tracks.add(track_obj)

    def create(self, validated_data):
        """Create an artist"""
        tracks = validated_data.pop('tracks', [])
        artist = Artist.objects.create(**validated_data)
        self._get_or_create_tracks(tracks, artist)
        return artist

    def update(self, instance, validated_data):
        """Update recipe"""
        tracks = validated_data.pop('tracks', None)
        if tracks is not None:
            instance.tracks.clear()
            self._get_or_create_tracks(tracks, instance)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance




class ArtistDetailSerializer(ArtistSerializer):
    """Serializer for the artist detail"""

    class Meta(ArtistSerializer.Meta):
        fields = ArtistSerializer.Meta.fields + ['description']
