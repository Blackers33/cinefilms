import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
    email: null,
    age: null,
    avatar:null,
    genre: null,
    token: null,
    location: {
      name: null,
      latitude: null,
      longitude: null,
    },
    biography: null,
    friends: [],
    favGenres: [],
    favMovies: [],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value = {...state.value, ...action.payload}
    },
  },
});

export const { updateinscriptionUser, updateprofilUser, setUser } = userSlice.actions;
export default userSlice.reducer;
