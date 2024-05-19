import { SnippetType } from "@/lib/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSnippets = createAsyncThunk(
  "snippets/fetchSnippets",
  (_, api) => {
    api.dispatch(setLoading(true));
    try {
      fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/snippet/all", {
        method: "GET",
        // next: {revalidate: 10}
      })
        .then((res) => res.json())
        .then(({snippets}) => api.dispatch(updateSnippets(snippets)));
    } catch (e) {
      console.error(e);
    } finally {
      api.dispatch(setLoading(false));
    }
  }
);

type SnippetState = {
  snippets: SnippetType[];
  loading: boolean;
};

const initialState: SnippetState = {
  snippets: [],
  loading: false,
};

export const SnippetSlice = createSlice({
  name: "snippets",
  initialState,
  reducers: {
    updateSnippets(state, action) {
      state.snippets = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { updateSnippets, setLoading } = SnippetSlice.actions;

export default SnippetSlice.reducer;
