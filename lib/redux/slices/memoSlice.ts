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
    addStyleOption: (state, action: PayloadAction<{ id: string, style: StyleType }>) => {
      const { id, style } = action.payload
      const { styleOptionsMemo } = state

      styleOptionsMemo[id] = style
    },

    addStyleOptions: (state, action: PayloadAction<{ styleOptions: Record<string, StyleType> }>) => {
      const {styleOptions} = action.payload
      let {styleOptionsMemo} = state

      styleOptionsMemo = {
        ...styleOptionsMemo,
        ...styleOptions
      }
    }
  }
})


export const { addStyleOption, addStyleOptions } = MemoSlice.actions

export default MemoSlice.reducer
