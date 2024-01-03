# Backend Developer Assignment: Simple Note API Documentation

## 1. Create Note

- **Endpoint:** `POST /notes`
- **Request Body:**
  - Format: JSON
  - Fields:
    - `title` (string): Title of the note (required, max length: 100 characters).
    - `content` (string): Content of the note (required).
- **Response:**
  - Status Code: 200 OK
  - Body: JSON representation of the created note.

## 2. Retrieve All Notes

- **Endpoint:** `GET /notes`
- **Request Body:** N/A
- **Response:**
  - Status Code: 200 OK
  - Body: JSON array containing all notes.

## 3. Retrieve a Single Note by ID

- **Endpoint:** `GET /notes/:id`
- **Request Parameters:**
  - `id` (string): ID of the note.
- **Response:**
  - Status Code: 200 OK
  - Body: JSON representation of the requested note.
  - Status Code: 404 Not Found
  - Body: `{ "error": "Note not found" }` if the note with the given ID does not exist.
  - Status Code: 400 Bad Request
  - Body: `{ "error": "Invalid Note ID" }` if the provided ID is not valid.

## 4. Update Note

- **Endpoint:** `PUT /notes/:id`
- **Request Parameters:**
  - `id` (string): ID of the note.
- **Request Body:**
  - Format: JSON
  - Fields:
    - `title` (string): New title of the note (required, max length: 100 characters).
    - `content` (string): New content of the note (required).
- **Response:**
  - Status Code: 200 OK
  - Body: JSON representation of the updated note.
  - Status Code: 404 Not Found
  - Body: `{ "error": "Note not found" }` if the note with the given ID does not exist.
  - Status Code: 400 Bad Request
  - Body: `{ "error": "Invalid Note ID" }` if the provided ID is not valid.

## 5. Delete Note

- **Endpoint:** `DELETE /notes/:id`
- **Request Parameters:**
  - `id` (string): ID of the note.
- **Response:**
  - Status Code: 200 OK
  - Body: `{ "message": "Note deleted successfully" }`.
  - Status Code: 404 Not Found
  - Body: `{ "error": "Note not found" }` if the note with the given ID does not exist.
  - Status Code: 400 Bad Request
  - Body: `{ "error": "Invalid Note ID" }` if the provided ID is not valid.

## Error Handling

- **Status Code:** 500 Internal Server Error
- **Body:** `{ "error": "Internal Server Error" }` for unexpected errors.

## Basic Authentication (Optional)

- **Note:** Basic authentication is added for each endpoint to protect the API endpoints using a username and password.
