# Music library API

Applying what I have learnt about SQL, databases and express.js by writing an app to manage a music library.

---

## Motivation

To design and implement an API which can perform CRUD (create, read, update, delete) operations on a database.

---

#### Tech used

- Node.js
- Express.js
- Javascript
- MySQL
- Docker

---

#### running the music library

create a .env and .env.test file in the root folder

```
DB_PASSWORD=password
DB_NAME=music_library_dev
DB_USER=root
DB_HOST=localhost
DB_PORT=3307
PORT=3000
```

If your using an M1 chip use the following 
```
DB_PASSWORD=password
DB_NAME=music_library_dev
DB_USER=user
DB_HOST=localhost
DB_PORT=3307
PORT=3000
```
Using $ npm start
will run the program

---

#### Task list

- [x] setting up database, repo, application.
- [x] setting up test environment.
- [x] creating and reading artists.
- [x] updating and deleting artists.
- [x] passes all tests
