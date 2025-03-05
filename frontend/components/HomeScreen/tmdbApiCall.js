export default async function tmdbApiCall(uri) {
	const options = {
		method: "GET",
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NmY4ZDQxNjAyMzFiNjE3YTA2MTU3M2ZhODA4YzlmMCIsIm5iZiI6MTczODc0NDYzMi41ODksInN1YiI6IjY3YTMyMzM4NDRkNjg2M2I3NDhhNzJlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2GmSmaJ7gWBY4f7F4QCE_TrHH95nnNwEhrqAxg655Q4",
		},
	};

	const url =
		`https://api.themoviedb.org/3${uri}`;	

	const fetchedData  = await fetch(url, options)
    const res = await fetchedData.json()
    return res.results
}
