import React from 'react';

function SearchForm({ searchTerm, onSearch, onChange }) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for an artist"
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

export default SearchForm;
