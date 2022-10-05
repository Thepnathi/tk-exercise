"""
Views for the artist APIs
"""
from rest_framework import viewsets

from core.models import Artist
from artist import serializer

class ArtistViewSet(viewsets.ModelViewSet):
    """View for manage """
    serializer_class = serializer.ArtistSerializer
    queryset = Artist.objects.all()

    def get_queryset(self):
        """Retrieve artists"""
        return self.queryset.order_by('-id')

    def get_serializer_class(self):
        """Return the serializer class for request"""
        if self.action == 'list':
            return serializer.ArtistSerializer

        return self.serializer_class
