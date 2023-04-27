import { useCallback, useState, useRef, useMemo } from 'react'
import { searchMovies } from '../services/searchMovies'
export default function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return

    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  if (search === '') {
    getMovies({ search: 'batman' })
  }

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies]?.sort((a, b) => a?.title?.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return {
    movies,
    loading,
    getMovies,
    sortedMovies
  }
}
