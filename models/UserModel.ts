import { CustomStyleType } from "@/lib/types"
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  customClasses: {
    type: Array,
    default: []
  }
})

export default mongoose.models.User || mongoose.model("User", UserSchema)
