import { UserType } from "@/lib/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface UserState {
  user?: UserType
}

const initialState: UserState = {
  user: undefined
}

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SignIn: (state, action: PayloadAction<{user: UserType}>) =>{
      state.user = action.payload.user
    },
    SignOut: (state) => {
      state.user = undefined
    }
  }
})


export const { SignIn, SignOut } = UserSlice.actions

export default UserSlice.reducer
