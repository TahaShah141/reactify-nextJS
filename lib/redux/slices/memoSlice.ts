import { StyleType } from "@/lib/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MemoState {
  styleOptionsMemo: Record<string, StyleType>
}

const initialState: MemoState = {
  styleOptionsMemo: {}
}

export const MemoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    addStyleOptions: (state, action: PayloadAction<{ styleOptions: Record<string, StyleType> }>) => {
      const {styleOptions} = action.payload
      const {styleOptionsMemo} = state

      state.styleOptionsMemo = {
        ...styleOptionsMemo,
        ...styleOptions
      }
    }
  }
})


export const { addStyleOptions } = MemoSlice.actions

export default MemoSlice.reducer
