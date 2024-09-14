import mongoose from 'mongoose';

const { Schema } = mongoose;

const BranchSchema = new Schema({
  fromChapter: {
    type: Schema.Types.ObjectId,
    ref: 'Chapter', // The chapter from which the branch originates
    required: true,
  },
  toChapter: {
    type: Schema.Types.ObjectId,
    ref: 'Chapter', // The chapter this branch leads to
    required: true,
  },
  condition: {
    type: String, // Description of the condition for this branch, e.g., based on a choice
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Branch = mongoose.model('Branch', BranchSchema);
export default Branch;
