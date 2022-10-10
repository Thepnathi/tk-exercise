# tk-exercise

Let’s get started!

*Jordi owns a record store. His friend Emma suggested he modernise and create a very basic Django API to store all of his artists. He thought this sounded cool, but he had no idea what Django was, other than the Tarantino movie ‘Django Unchained’. He liked that movie.*

*Jordi has decided to go to his good friend, you, to build him this initial API.*

Jordi wants to be able to store 2 models, which you can see on the right. He only wants to be able to query by artist for now. Some things he wants to be able to do:

1. Query for all the artists in his collection, and be able to see all their tracks. He can add a search filter which should match if their name matches the search (see example)
2. Create a new artist, with or without tracks
3. Query a specific artist, and just see their name and tracks
4. Edit the tracks of an artist, where it will fully replace the tracks (see example)
5. Delete an artist

## Running the API

```javascript

docker-compose build
// Run the API
docker-compose up
docker-compose down
// Run the test
docker-compose run --rm app sh -c "python manage.py test"
docker-compose run --rm app sh -c "python manage.py managemigration"
```

You can test the API on here: http://localhost:8000/api/docs/

See the examples for more specific help

<aside>
💡 Remember to use **TDD** as a best practice

</aside>

**Artist:**

The artist model has a first name and a last name. These should be separate fields.

**Track:**

The track has a a title, and an artist that wrote the track (a foreign key). A track can only have one artist.

### **Example JSON response when GET /artists/1/**

```jsx
{
	“id”: 1,
	“first_name”: “John”
	“last_name”: “Lennon”,
	“tracks”: [{“title”: “let it be”}, {“title”: “imagine”}, {“title”: “hey jude”}]
}
```

### **Example artist creation**

```jsx
POST /artists/
{
	“first_name”: “John”
	“last_name”: “Lennon”,
	“tracks”: [{“title”: “let it be”}, {“title”: “imagine”}, {“title”: “hey jude”}]
}

Response:
{
	“id”: 1,
	“first_name”: “John”
	“last_name”: “Lennon”,
	“tracks”: [{“title”: “let it be”}, {“title”: “imagine”}, {“title”: “hey jude”}]
}
```

### **Example artist list**

```jsx
GET /artists/
[
    {
	“id”: 1,
	“first_name”: “John”
	“last_name”: “Lennon”,
	“tracks”: [{“title”: “let it be”}, {“title”: “imagine”}, {“title”: “hey jude”}]
    }
]
```

Add search view by name substring:

```jsx
GET /artists/?name=Jo
[
    {
	“id”: 1,
	“first_name”: “John”
	“last_name”: “Lennon”,
	“tracks”: [{“title”: “let it be”}, {“title”: “imagine”}, {“title”: “hey jude”}]
    }
]
```

### **Example artist edit**

```jsx
PATCH /artists/1/
    {
	“id”: 1,
	“first_name”: “John”
	“last_name”: “Lennon”,
	“tracks”: [{“title”: “twist and shout”}]
    }

Response:
{
	“id”: 1,
	“first_name”: “John”
	“last_name”: “Lennon”,
	“tracks”: [{“title”: “twist and shout”}]
}
```

Notice that the old tracks are removed from the tracks field, and replaced with the data that was sent. That is to say, it is not additive, it is a replacement.

