const request = require("supertest");
const app = require("./app");

/**
 * @author Sacha
 * Le test envoie deux requêtes d'affillée pour liker et unliker un film.
 * On vérifie que le film a bien été liké puis unliké par l'utilisateur.
 */

it("POST /films/:filmId/like", async () => {
	// user et son userId correspondant.
	const user = "2uttv9RTPa9iTljk6x4uDJOxUMSaPftq";
	const userId = "67c83bd5468643ecb0415635";

	// On envoie une requête POST pour liker le film 1
	const resWithLike = await request(app).post("/films/1/like").send({ user });

	// On envoie une requête POST pour unliker le film 1
	// (même requête mais puisque le like de l'utilisateur est présent, il se supprimera)
	const resWithoutLike = await request(app)
		.post("/films/1/like")
		.send({ user });

	console.log(resWithoutLike.body);

	// On vérifie que le film 1 a bien été liké par l'utilisateur
	expect(resWithLike.statusCode).toBe(200);
	expect(resWithLike.body.result).toBe(true);
	expect(resWithLike.body.film.likes).toContain(userId);

	// On vérifie que le film 1 a bien été unliké par l'utilisateur
	expect(resWithoutLike.statusCode).toBe(200);
	expect(resWithoutLike.body.result).toBe(true);
	expect(resWithoutLike.body.film.likes).not.toContain(userId);
});

/**
 * @author Kahina
 */

it("GET /:filmId/film", async () => {
	const res = await request(app).get("/films/1/film");

	expect(res.statusCode).toBe(200);
	expect(res.body.result).toBe(true);
	expect(res.body.film._id).toBe("67cab3ef17d319fa6164bce5");
	expect(res.body.film.tmdbId).toBe(1);
});

/**
 * @author Yirui
 */

//Test pour simuler une requête PUT afin de modifier le profil de cet utilisateur.
it(`PUT /users/profil/`, async () => {
	//exemple token de l'utilisateur qui existe dèjà dans les bases des données
	const token = "_ZpeuBlpvOL6Qd1yLwyg50_GhAxA-cMl";

	const res = await request(app)
		.put(`/users/profil/${token}`)
		.send({
			avatar:
				"https://image.noelshack.com/fichiers/2015/12/1426650974-quiz-les-personnages-de-tintin-5472.jpeg",
			age: 25,
			genre: "Homme",
			location: {
				name: "Paris",
				latitude: 48.859,
				longitude: 2.347,
			},
			favMovies: ["Action", "Adventure"],
			favGenres: [447277, 812],
			biography: "je ne suis pas un robot",
		});

	expect(res.statusCode).toBe(200);
	expect(res.body.result).toBe(true);
});

/**
 * @author Mathilde
 */
//Test que cet utilisateur existe
it("POST /signin", async () => {
	const res = await request(app).post("/users/signin").send({
		email: "gringo@gmail.com",
		password: "A",
	});
	console.log(res.body);
	expect(res.statusCode).toBe(200);
	expect(res.body.result).toBe(true);
	expect(res.body.token).toBe("AJrdD3LbgYExWqbR81vDDCwwF3xc7Qtt");
});

/**
 * @author Charlie
 */

it("POST /signup", async () => {
	const res = await request(app).post("/users/signup").send({
		username: "test",
		password: "test",
		email: "test@gmail.com",
	});
	expect(res.statusCode).toBe(200);
	expect(res.body.result).toBe(true);
});
