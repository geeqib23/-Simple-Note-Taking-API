# Simple Note-Taking API 

**Stack** - NodeJS, Express.js, MongoDB, Jest, Typescript, Mongoose

## How to run
1. Clone the repository
2. Make sure you have Typescript and TS-Node installed. If not use ->
   - `npm install -g typescript`
   - `npm install -g ts-node`
3. Run `npm install`
4. Run `ts-node .\src\app.ts` to run the server on localhost

# API Documentation

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
- **Body:** `{ "error": error message }` for unexpected errors.

## Basic Authentication

- **Note:** Basic authentication is added for each endpoint to protect the API endpoints using a username and password.

## API Testing

Tests are written in notes.test.ts file using Jest wherein all endpoints are tested for their output considering all edge cases.

![image](https://github.com/geeqib23/-Simple-Note-Taking-API/assets/59912182/5611a6f7-2a45-461b-8831-cb76f20ca2ec)





