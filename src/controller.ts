import { Request, Response} from 'express';
import Note from './model';

export const createNote = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  if(!title || !content) return res.status(400).json({error: 'Title and Content must not be empty'});
  if(title.length > 100) return res.status(400).json({error: 'Title must be below 100 characters'});
  try {
    const note = new Note({ title, content });
    await note.save();
    res.json(note);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const getAllNotes = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const getNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!(id.match(/^[0-9a-fA-F]{24}$/))) {
    return res.status(400).json({ error:"Invalid Note ID" });
  } 
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const updateNote = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!(id.match(/^[0-9a-fA-F]{24}$/))) {
    return res.status(400).json({ error:"Invalid Note ID" });
  } 
  const { title, content } = req.body;
  if(!title || !content) return res.status(400).json({error: 'Title and Content must not be empty'});
  if(title.length > 100) return res.status(400).json({error: 'Title must be below 100 characters'});
  try {
    const note = await Note.findByIdAndUpdate(
      id,
      { title, content, updatedAt: Date.now() },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteNote = async (req:Request, res:Response) => {
  const id = req.params.id;
  if (!(id.match(/^[0-9a-fA-F]{24}$/))) {
    return res.status(400).json({ error:"Invalid Note ID" });
  } 
  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
}