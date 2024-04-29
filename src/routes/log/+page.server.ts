import { getMovie } from "$lib/tmdb/tmdb";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url }) => {
  const movieId = url.searchParams.get("movieId");
  if (!movieId) return {};

  const movie = await getMovie(movieId);

  return {
    movie,
  };
}) satisfies PageServerLoad;
