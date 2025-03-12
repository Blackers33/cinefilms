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
    updateinscriptionUser: (state, action) => {
        const { username, email, token } = action.payload;
        state.value.username = username;
        state.value.email = email;
        state.value.token = token;
    },
    updateprofilUser: (state, action) => {
        const { age,avatar, genre, location, favMovies, favGenres, biography } = action.payload;
        state.value.age = age;
        state.value.avatar=avatar;
        state.value.genre = genre;
        state.value.location = location;
        state.value.favMovies = favMovies;
        state.value.favGenres = favGenres;
        state.value.biography = biography;
    },
    setUser: (state, action) => {
      state.value = {...state.value, ...action.payload}
    },
  },
});

export const { updateinscriptionUser, updateprofilUser, setProfilUser } = userSlice.actions;
export default userSlice.reducer;
