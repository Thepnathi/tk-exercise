"""
Views for the artist APIs
"""
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Artist
from artist import serializer

class ArtistViewSet(viewsets.ModelViewSet):
    """View for manage """
    serializer_class = serializer.ArtistSerializer
    queryset = Artist.objects.all()