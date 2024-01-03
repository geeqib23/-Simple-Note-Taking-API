import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
const dotenv = require('dotenv');
dotenv.config();
const DATABASE_URI = process.env.DATABASE_URI || "http://localhost";
console.log(DATABASE_URI);
describe('Note API Tests', () => {
  beforeAll(async () => {
    // Connect to a test database before running tests
    mongoose.connection.on('open', () => console.log('db connected'));
    await mongoose.connect(DATABASE_URI);
  });

  afterAll(async () => {
    // Disconnect from the test database after all tests are done
    await mongoose.connection.close();
  });

  beforeEach(async () => {
     // Clear collections before each test
     const collections = mongoose.connection.collections;

     for (const key in collections) {
       const collection = collections[key];
       await collection.deleteMany({});
     }
  });

  it('should create a new note', async () => {
    const response = await request(app)
      .post('/notes')
      .auth('admin', 'secret')
      .send({ title: 'Test Note', content: 'This is a test note' });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test Note');
    expect(response.body.content).toBe('This is a test note');
  });

  it('should retrieve all notes', async () => {
    // Add a test note to the database
    await request(app).post('/notes')
      .send({ title: 'Test Note', content: 'This is a test note' })
      .auth('admin', 'secret');

    const response = await request(app)
      .get('/notes')
      .auth('admin', 'secret');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe('Test Note');
    expect(response.body[0].content).toBe('This is a test note');
  });

  it('should retrieve a single note by ID', async () => {
    // Add a test note to the database
    const createdNote = await request(app)
      .post('/notes')
      .auth('admin', 'secret')
      .send({ title: 'Test Note', content: 'This is a test note' });

    const response = await request(app)
      .get(`/notes/${createdNote.body._id}`)
      .auth('admin', 'secret');

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test Note');
    expect(response.body.content).toBe('This is a test note');
  });

  it('should update an existing note', async () => {
    // Add a test note to the database
    const createdNote = await request(app)
      .post('/notes')
      .auth('admin', 'secret')
      .send({ title: 'Test Note', content: 'This is a test note' });

    const response = await request(app)
      .put(`/notes/${createdNote.body._id}`)
      .auth('admin', 'secret')
      .send({ title: 'Updated Note', content: 'This is an updated note' });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Note');
    expect(response.body.content).toBe('This is an updated note');
  });

  it('should delete an existing note', async () => {
    // Add a test note to the database
    const createdNote = await request(app)
      .post('/notes')
      .auth('admin', 'secret')
      .send({ title: 'Test Note', content: 'This is a test note' });

    const response = await request(app)
      .delete(`/notes/${createdNote.body._id}`)
      .auth('admin', 'secret');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Note deleted successfully');
  });
});

