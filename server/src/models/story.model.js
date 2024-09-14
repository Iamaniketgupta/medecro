import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
    coverImage: { type: String },
    isPublished: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    chapter:{type:mongoose.Schema.Types.ObjectId , ref:"Chapter" , required:true},
    likes:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    collaborators:[
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      }
  ],
  theme:{type:String}
  });

export const Story = mongoose.model('Story', storySchema);
  