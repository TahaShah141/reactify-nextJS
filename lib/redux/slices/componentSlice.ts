import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  Test: "This is test 1"
}


export const componentsSlice = createSlice({
  name: "components",
  initialState,
  reducers: {
    changeTest: (state, action: PayloadAction<{newText: string}>) => {
      state.Test = action.payload.newText
    }
  }
})

export const {
  changeTest
} = componentsSlice.actions

export default componentsSlice.reducer