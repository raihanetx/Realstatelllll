import React, { useState } from 'react';

interface HeroProps {
  onSearch: (query: string) => void;
  initialSearchTerm: string;
}

export const Hero: React.FC<HeroProps> = ({ onSearch, initialSearchTerm }) => {
  const [query, setQuery] = useState(initialSearchTerm);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="relative bg-brand-dark">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40" 
        style={{ backgroundImage: "url('https://picsum.photos/1600/800?grayscale&blur=2')" }}
      ></div>
      <div className="relative container mx-auto px-6 py-24 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
          Find Your Perfect Home
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto drop-shadow-md">
          Discover properties with the power of AI. Just tell us what you're looking for.
        </p>
        <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., 'modern 4-bedroom house in Miami with a pool'"
              className="w-full px-5 py-4 text-gray-800 bg-white rounded-lg focus:outline-none focus:ring-4 focus:ring-brand-accent/50 transition-shadow duration-300"
            />
            <button
              type="submit"
              className="bg-brand-accent text-brand-primary font-bold py-4 px-8 rounded-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
