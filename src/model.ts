import { Schema, model } from 'mongoose';

interface Note {
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Note schema
const noteSchema = new Schema<Note>({
  title: { type: String, required: true, maxLength: 100 },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Note = model<Note>('Note', noteSchema);

export default Note;

