"""
Serializers for artist APIs
"""
from rest_framework import serializers

from core.models import Artist

class ArtistSerializer(serializers.ModelSerializer):
    """Serializer for artists."""

    class Meta:
        model = Artist
        fields = ['id', 'name', 'website', 'tracks']
        read_only_fields = ['id']

