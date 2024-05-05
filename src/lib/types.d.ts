export type JournalEntry = {
  movieId: string;
  dateWatched: string;
  watchedBefore: boolean;
  review?: string;
  rating: number;
  favorite: boolean;
};

export type User = {
  created: any;
  displayName: string;
  journal: {
    [entryId]: JournalEntry;
  };
};

export type Journal = {
  [entryId]: JournalEntry;
};
