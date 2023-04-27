import { useCallback, useState } from 'react'
import './App.css'
import useMovies from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const { search, updateSearch, error } = useSearch()
  const [sort, setSort] = useState(false)
  const { sortedMovies, loading, getMovies } = useMovies({ search, sort })

  const handleSubmit = e => {
    e.preventDefault()
    getMovies({ search })
  }

  const debouncedMovies = useCallback(
    debounce(async search => {
      getMovies({ search })
    }, 300),
    [getMovies]
  )

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChange = e => {
    const newSearch = e.target.value
    updateSearch(newSearch)
    debouncedMovies(newSearch)
  }

  return (
    <div className='container-body'>
      <header>
        <h1 className='title'>Movies Search</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='query'
            id='name'
            placeholder='put your movie...'
            onChange={handleChange}
            style={{ border: error ? '2px solid red' : 'none' }}
          />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Search</button>
        </form>
      </header>
      <main>
        {loading ? (
          <p>loading...</p>
        ) : (
          sortedMovies?.map(item => {
            return (
              <div className='item-movie' key={item.id}>
                <img src={item.poster} alt={item.title} />
                <div className='movie-info'>
                  <h4 className='title'>{item.title}</h4>
                  <span>{item.year}</span>
                </div>
              </div>
            )
          })
        )}
        {error && <p>{error}</p>}
        {sortedMovies?.length === 0 && <p>Not found</p>}
      </main>
    </div>
  )
}

export default App
