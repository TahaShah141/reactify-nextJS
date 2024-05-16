import { CustomStyleType } from "@/lib/componentType"

export type UserType = {
  id: string
  email: string
  customClasses: CustomStyleType[] 
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
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
