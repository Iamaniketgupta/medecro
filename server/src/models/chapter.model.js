import mongoose from 'mongoose';

const { Schema } = mongoose;

const ChapterSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  choices: [
    {
      text: String, // The text for the choice shown to the reader
      branch: {
        type: Schema.Types.ObjectId,
        ref: 'Branch', // Reference to the Branch that this choice leads to
      }
    }
  ],
  story : {
    type: Schema.Types.ObjectId,
  ref:"Story"},
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const Chapter = mongoose.model('Chapter', ChapterSchema);

