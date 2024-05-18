import mongoose from "mongoose"

export type StyleType = {
  label: string
  tailwind: string
  CSSKey: string | string[]
  CSSValue: string | string[]
}

const StyleSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  tailwind: {
    type: String,
    required: true
  },
  CSSKey: {
    type: [String],
    required: true
  },
  CSSValue: {
    type: [String],
    required: true
  },
})

export default mongoose.models.Style || mongoose.model("Style", StyleSchema)
