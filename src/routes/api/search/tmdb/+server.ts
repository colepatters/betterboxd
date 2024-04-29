import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { searchMovie } from "$lib/tmdb/tmdb";

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get("query");

  if (!query) return error(500, "query not provided");

  const data = await searchMovie(query);

  return json(data);
};
