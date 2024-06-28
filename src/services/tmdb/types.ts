type MovieSearchResult = {
  // main
  id: number
  overview: string
  release_date: string
  title: string

  // media
  backdrop_path: string
  poster_path: string
  video: boolean

  // ratings
  vote_average: number
  vote_count: number

  // other
  adult: boolean
  genre_ids: Array<number>
  original_language: string
  original_title: string
  popularity: number
}

type MovieSearchResults = {
  page: number
  total_pages: number
  total_results: number

  results: Array<MovieSearchResult>
}
