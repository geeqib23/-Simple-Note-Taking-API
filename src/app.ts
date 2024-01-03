import { createNote, getAllNotes, getNote, updateNote, deleteNote } from "./controller"
import { Request,Response } from "express";
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

//Set Up Basic Authentication
const basicAuth = require('express-basic-auth');
app.use(basicAuth({
  users: { admin: process.env.BASIC_AUTH_PASSWORD },
  challenge: true
}));

mongoose.connect(process.env.DATABASE_URI); // MongoDB connection
app.use(bodyParser.json()); // Node.js request body parsing middleware.

// API Endpoints ->

// Create Note
app.post('/notes', createNote);

// Retrieve Notes
app.get('/notes', getAllNotes);

// Retrieve a Single Note by ID
app.get('/notes/:id', getNote);

// Update Note
app.put('/notes/:id', updateNote);

// Delete Note
app.delete('/notes/:id', deleteNote);

//API Documentation
app.get('/',function(req:Request, res:Response){
  res.sendFile(__dirname + '/index.html');
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;