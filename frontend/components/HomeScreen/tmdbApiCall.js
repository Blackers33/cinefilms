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
		return res;
	} catch (error) {
		console.error(error);
	}
}
