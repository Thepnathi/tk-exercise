# tk-exercise

1. Query for all the artists in his collection, and be able to see all their tracks. He can add a search filter which should match if their name matches the search (see example)
2. Create a new artist, with or without tracks
3. Query a specific artist, and just see their name and tracks
4. Edit the tracks of an artist, where it will fully replace the tracks (see example)
5. Delete an artist

```
docker-compose build
docker-compose up
docker-compose down
docker-compose run --rm app sh -c "python manage.py test"
docker-compose run --rm app sh -c "python startapp artists"
docker-compose run --rm app sh -c "python manage.py makemigrations"
```
