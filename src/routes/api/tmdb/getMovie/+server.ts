import { getMovie } from "$lib/tmdb/tmdb";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const movieId = url.searchParams.get("movieId");

  const movie = await getMovie(movieId);

  return json(movie);
};
