import { TMDB_API_KEY } from "$env/static/private";

const fetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};

export async function searchMovie(query: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&language=en-US`,
    fetchOptions
  );

  return await res.json();
}

export async function getMovie(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    fetchOptions
  );

  const data = await res.json();

  return data as MovieFullDetails;
}
