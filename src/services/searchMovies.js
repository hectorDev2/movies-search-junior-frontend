const API_KEY = '1b57d44e'

export const searchMovies = async ({ search }) => {
  if (search === '') return null
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
    )
    const json = await response.json()

    const movies = json.Search

    return movies.map(movie => {
      const { Title, Year, imdbID, Type, Poster } = movie
      return {
        title: Title,
        year: Year,
        id: imdbID,
        type: Type,
        poster: Poster
      }
    })
  } catch (e) {
    throw new Error('Error searching movies')
  }
}
