import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    username: null,
    email: null,
    age: null,
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
    updateinscriptionUser: (state, action) => {
        const { username, email, token } = action.payload;
        state.value.username = username;
        state.value.email = email;
        state.value.token = token;
    },
    updateprofilUser: (state, action) => {
        const { age, genre, location, favMovies, favGenres, biography } = action.payload;
        state.value.age = age;
        state.value.genre = genre;
        state.value.location = location;
        state.value.favMovies = favMovies;
        state.value.favGenres = favGenres;
        state.value.biography = biography;
    },
  },
});

export const { updateinscriptionUser, updateprofilUser } = userSlice.actions;
export default userSlice.reducer;
