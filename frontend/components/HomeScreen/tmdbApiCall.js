export default async function tmdbApiCall(uri) {
	try {
		const options = {
			method: "GET",
			headers: {
				accept: "application/json",
				Authorization: process.env.EXPO_PUBLIC_TMDB_API,
			},
		};

		const url = `https://api.themoviedb.org/3${uri}`;
		const fetchedData = await fetch(url, options);
		const res = await fetchedData.json();
		return res
	} catch (error) {
		console.error(error);
	}
}


/**
 * Injection des likes et commentaires depuis la BDD Cinéfilms dans le tableau de films renvoyé par l'API TMDB
 */
async function getLikesAndComments(movies) {
	const updatedMovies = await Promise.all( //await Promise.all() permet d'attendre que toutes les promesses (les await) soient résolues
		movies.map(async (movie) => {
			try {
				const response = await fetch(
					`${process.env.EXPO_PUBLIC_IP_ADDRESS}/films/${movie.id}/film`
				);
				const data = await response.json();
				movie.likes = data.film.likes;
				movie.comments = data.film.comments;
			} catch (error) {
				console.log("no likes or comments for movie " + movie.id);
			}
			return movie;
		})
	);
	return updatedMovies;
}
