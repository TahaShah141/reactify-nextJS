import mongoose from "mongoose"

const SnippetSchema = new mongoose.Schema({
  creator: {
    type: String,
    index: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  favorites: {
    type: Number,
    default: 0
  },
  root: {
    type: String, //stringified root with all styleOptions as ObjectIds
    required: true
  }
}, { timestamps: true })

export default mongoose.models.Snippet || mongoose.model("Snippet", SnippetSchema)
