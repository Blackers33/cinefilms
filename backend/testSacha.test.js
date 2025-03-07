
/**
 * Le test envoie deux requêtes d'affillée pour liker et unliker un film.
 * On vérifie que le film a bien été liké puis unliké par l'utilisateur.
 */
const request = require("supertest");
const app = require("./app");

it("POST /films/:filmId/like", async () => {
	// user et son userId correspondant.
	const user = "2uttv9RTPa9iTljk6x4uDJOxUMSaPftq";
	const userId = "67c83bd5468643ecb0415635";

	// On envoie une requête POST pour liker le film 1
	const resWithLike = await request(app)
        .post("/films/1/like")
        .send({ user });

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
