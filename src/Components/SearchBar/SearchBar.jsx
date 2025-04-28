import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('')

    const handleSearch = () => {
        onSearch(query)
    }

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Поиск чатов..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>
                Поиск
            </button>
        </div>
    )
}

export default SearchBar