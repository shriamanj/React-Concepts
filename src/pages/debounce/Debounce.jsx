import axios from "axios";
import React, { useState, useEffect } from "react";

// Simple debounce utility (closure-based)
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function DebouncedApiList() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Define the search API function
  const searchPosts = (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        const filtered = res.data.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filtered.slice(0, 10));
        setLoading(false);
      })
      .catch(() => {
        setResults([]);
        setLoading(false);
      });
  };

  // Create a memoized debounced search function
  // This debounced function is stable for the entire lifetime of the component
  const debouncedSearch = React.useMemo(() => debounce(searchPosts, 500), []);

  // Handle input change: use the debounced function
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white shadow rounded-lg font-sans">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Debounced Search (Fake API)
      </h2>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type post title to search..."
        className="w-full px-4 py-2 mb-4 border-2 border-gray-200 rounded-md focus:outline-none focus:border-gray-500 text-lg"
      />
      {loading && (
        <div className="flex items-center justify-center mb-4">
          <svg
            className="animate-spin h-6 w-6 text-gray-500 mr-2"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          <span className="text-gray-500">Loading...</span>
        </div>
      )}
      <ul className="space-y-4">
        {results.map((post) => (
          <li
            key={post.id}
            className="border border-gray-100 rounded p-4 bg-gray-50 hover:bg-blue-50 transition"
          >
            <h3 className="font-semibold text-lg text-gray-900">
              {post.title}
            </h3>
            <p className="text-gray-600 text-sm">{post.body}</p>
          </li>
        ))}
      </ul>
      {query && !loading && results.length === 0 && (
        <div className="mt-4 text-center text-red-500 text-lg animate-pulse">
          No results found
        </div>
      )}
    </div>
  );
}

export default DebouncedApiList;
