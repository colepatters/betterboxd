import { goto } from "$app/navigation";
import { getMovie } from "$lib/tmdb/tmdb";
import { newJournalEntry } from "$lib/userJournal";
import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url, locals, cookies }) => {
  if (!cookies.get("__session")) {
    // console.log(url.pathname);

    return redirect(
      301,
      `/signin?callback=${encodeURIComponent(
        url.pathname + "?" + url.searchParams
      )}`
    );
  }

  const movieId = url.searchParams.get("movieId");
  if (!movieId) return {};

  const movie = await getMovie(movieId);

  return {
    movie,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    const formData = await event.request.formData();

    const movieId = event.url.searchParams.get("movieId");
    const dateWatched = formData.get("dateWatched");
    const watchedBefore = formData.get("watchedBefore") === "on" ? true : false;
    const review =
      formData.get("review") === "" ? null : formData.get("review");
    const rating = parseFloat(formData.get("rating"));
    const favorite = formData.get("favorite") === "true" ? true : false;

    const journalEntry = {
      movieId,
      dateWatched,
      watchedBefore,
      review,
      rating,
      favorite,
    };

    await newJournalEntry(journalEntry, event.cookies.get("__session"));

    redirect(303, `users/${event.locals.user.displayName}`);
  },
};
