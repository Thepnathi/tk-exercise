"""
URL mappings for the artists
"""
from django.urls import (
    path,
    include,
)

from rest_framework.routers import DefaultRouter

from artist import views


router = DefaultRouter()
router.register('artist', views.ArtistViewSet)

app_name = 'artist'

urlpatterns = [
    path('', include(router.urls)),
]