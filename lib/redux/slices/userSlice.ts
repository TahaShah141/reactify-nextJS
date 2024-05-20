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
    },
    updateFavorites: (state, action: PayloadAction<{snippetID: string}>) => {
      const { user } = state
      const { snippetID } = action.payload
      if (!user) return;

      const { favoriteSnippets } = user

      if (favoriteSnippets.includes(snippetID)) {
        user.favoriteSnippets = user.favoriteSnippets.filter(id => id !== snippetID)
      } else {
        user.favoriteSnippets.push(snippetID)
      }

      state.user = user
    },

    deleteProject: (state, action: PayloadAction<{projectID: string}>) => {
      const { user } = state
      if (!user) return;
      const { projectID } = action.payload
      user.projects = user.projects.filter(project => project !== projectID)
      state.user = user
    }
  }
})


export const { SignIn, SignOut, updateFavorites, deleteProject } = UserSlice.actions

export default UserSlice.reducer
