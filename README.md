# Notes API – MongoDB (Assignment 7)

A RESTful Notes API built with **Node.js, Express.js, MongoDB and Mongoose**. It supports creating, reading, updating, deleting and filtering notes by category.

## Features

- MongoDB connection using Mongoose.
- Connection string and port configured through environment variables.
- Mongoose Note schema with required title/content, category enum and `createdAt`.
- Five CRUD endpoints.
- Optional category filtering with `GET /api/notes?category=Work`.
- Centralized error handling:
  - `400` for missing/invalid data and invalid IDs.
  - `404` when a note does not exist.
  - `500` for unexpected server errors.
- Seed script containing five sample notes.
- Data persists in MongoDB when the Express server is stopped or restarted.

## Project structure

```text
NotesAPI MongoDB(Assignment-7)/
├── config/
│   └── server.config.js
├── controllers/
│   └── notes.controller.js
├── middlewares/
│   └── errorHandler.js
├── models/
│   └── notes.models.js
├── routes/
│   └── notes.route.js
├── services/
│   └── notes.service.js
├── .env.example
├── .gitignore
├── main.js
├── package.json
├── README.md
└── seed.js
```

## Requirements

- Node.js and npm
- MongoDB running locally, or a MongoDB Atlas cluster

## Setup

1. Open this project folder in VS Code.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root by copying `.env.example`.

   ```env
   PORT=8081
   MONGO_URI=mongodb://127.0.0.1:27017/notesDB
   ```

   For MongoDB Atlas, replace the local URI with your Atlas connection string. Do not commit `.env` to GitHub.

4. Seed the database (run once):

   ```bash
   npm run seed
   ```

   The seed script inserts five sample notes only if the notes collection is empty. It does not delete existing notes.

5. Start the development server:

   ```bash
   npm run dev
   ```

   Or run in normal mode:

   ```bash
   npm start
   ```

The API runs at `http://localhost:8081`.

## API endpoints

Base URL: `http://localhost:8081/api/notes`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes?category=Work` | Filter notes by category |
| GET | `/api/notes/:id` | Get one note by MongoDB ID |
| POST | `/api/notes` | Create a note |
| PUT | `/api/notes/:id` | Replace/update a note |
| DELETE | `/api/notes/:id` | Delete a note |

### Create note – POST

Request body (`application/json`):

```json
{
  "title": "Learn Mongoose",
  "content": "Connect Express to MongoDB using Mongoose.",
  "category": "Work"
}
```

Allowed categories: `General`, `Work`, `Personal`, `Ideas`. If category is omitted, it defaults to `General`.

### Update note – PUT

Request body (`application/json`):

```json
{
  "title": "Learn Advanced Mongoose",
  "content": "Practice schema validation and Mongoose query methods.",
  "category": "Ideas"
}
```

Both `title` and `content` are required for this PUT endpoint.

## Error responses

| Scenario | Status |
|---|---:|
| Missing/empty title or content | 400 |
| Invalid category or schema validation failure | 400 |
| Invalid MongoDB ID | 400 |
| Note not found | 404 |
| Unexpected server error | 500 |

## Persistence verification

1. Run `npm run seed`.
2. Start the API using `npm run dev`.
3. Send `GET http://localhost:8081/api/notes` and confirm the sample notes appear.
4. Stop the server with `Ctrl + C`.
5. Start it again using `npm run dev`.
6. Send the GET request again. The notes should still exist because they are stored in MongoDB, not in server memory.

## Mongoose methods used

- `Note.find()` – retrieve notes, optionally with a category filter.
- `Note.findById()` – retrieve one note.
- `note.save()` – save a new note.
- `Note.findByIdAndUpdate()` – update a note with validators enabled.
- `Note.findByIdAndDelete()` – delete a note.
