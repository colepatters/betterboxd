import { baseURL } from '.'

async function search(query: string) {
  const url = baseURL

  url.searchParams.set('query', query)
  url.searchParams.set('include_adult', 'false')
  url.searchParams.set('language', 'en-US')

  const res = await fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_KEY}`,
    },
  })

  return await res.json()
}

export default search
