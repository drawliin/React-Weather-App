import React from 'react'

function SearchEngine({query, setQuery, search}) {

  return (
    
        <div className='search'>
            <input type='text' placeholder='Enter City Name...' value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search}/>
            <button onClick={search} disabled = {!query}>Search</button>
        </div>
    
  )
}

export default SearchEngine