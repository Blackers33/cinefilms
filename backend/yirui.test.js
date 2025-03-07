const request = require("supertest");
const app = require("./app");

//exemple token de l'utilisateur qui existe dèjà dans les bases des données 
const token="_ZpeuBlpvOL6Qd1yLwyg50_GhAxA-cMl"

//Test pour simuler une requête PUT afin de modifier le profil de cet utilisateur.
it(`PUT /users/profil/`, async () => {
  const res = await request(app).put(`/users/profil/${token}`).send({
    avatar: "https://image.noelshack.com/fichiers/2015/12/1426650974-quiz-les-personnages-de-tintin-5472.jpeg",
    age: 25,
    genre: "Homme",
    location: {
        name:"Paris",
        latitude:48.859,
        longitude:2.347},
    favMovies: ["Action", "Adventure"],
    favGenres: [447277,812],
    biography: "je ne suis pas un robot",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.result).toBe(true);
});

