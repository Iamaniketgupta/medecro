import mongoose from "mongoose";


const characterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    traits: { type: String },
    background: { type: String },
    motivations: { type: String },
    story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
export const Character = mongoose.model('Character', characterSchema);
  