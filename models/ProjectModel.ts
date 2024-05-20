import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tabs: {
    type: String,
    required: true
  }
}, { timestamps: true })

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)
