import { useEffect, useRef, useState } from 'react';
import { API_URL } from '../utils/api';

export default function ClientAutocomplete({ value, onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [highlight, setHighlight] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      fetch(`${API_URL}/clients?search=${query}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((res) => res.json())
        .then(setResults);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    if (e.key === 'ArrowDown') {
      setHighlight((prev) => (prev + 1) % (results.length + 1));
    } else if (e.key === 'ArrowUp') {
      setHighlight((prev) => (prev - 1 + results.length + 1) % (results.length + 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlight < results.length) {
        onSelect(results[highlight]);
        setShowDropdown(false);
      } else {
        handleCreate();
      }
    }
  };

  const handleCreate = () => {
    const newClient = {
      name: query,
      company: '',
      email: '',
      phone: '',
    };

    fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(newClient),
    })
      .then((res) => res.json())
      .then((client) => {
        onSelect(client);
        setShowDropdown(false);
      });
  };

  const handleSelect = (client) => {
    onSelect(client);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Rechercher un client..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(true);
          setHighlight(0);
        }}
        onKeyDown={handleKeyDown}
      />

      {showDropdown && query && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-60 overflow-y-auto">
          {results.map((client, i) => (
            <li
              key={client._id}
              className={`cursor-pointer px-4 py-2 hover:bg-blue-100 ${
                i === highlight ? 'bg-blue-100' : ''
              }`}
              onMouseDown={() => handleSelect(client)}
            >
              {client.name} – {client.company}
            </li>
          ))}
          <li
            className={`cursor-pointer px-4 py-2 text-green-600 hover:bg-green-100 ${
              highlight === results.length ? 'bg-green-100' : ''
            }`}
            onMouseDown={handleCreate}
          >
            + Créer "{query}"
          </li>
        </ul>
      )}
    </div>
  );
}
