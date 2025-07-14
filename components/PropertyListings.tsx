import React from 'react';
import type { Property } from '../types';
import { PropertyCard, PropertyCardSkeleton } from './PropertyCard';
import { FilterIcon, HeartIcon } from './Icons';

// --- FilterBar Component defined in the same file for encapsulation ---
interface FilterBarProps {
  sortOption: string;
  onSortChange: (value: string) => void;
  showOnlyFavorites: boolean;
  onShowFavoritesChange: (value: boolean) => void;
  favoritesCount: number;
  resultsCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  sortOption, 
  onSortChange, 
  showOnlyFavorites, 
  onShowFavoritesChange, 
  favoritesCount,
  resultsCount,
}) => {
  return (
    <div className="mb-8 p-4 bg-white rounded-lg shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center text-gray-600">
        <FilterIcon className="w-5 h-5 mr-2" />
        <span className="font-semibold">{resultsCount} {resultsCount === 1 ? 'result' : 'results'} found</span>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <div className="flex items-center w-full sm:w-auto">
          <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700 shrink-0">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-brand-secondary focus:ring focus:ring-brand-secondary focus:ring-opacity-50 transition"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="sqft-desc">Size: Largest First</option>
          </select>
        </div>
        <button
          onClick={() => onShowFavoritesChange(!showOnlyFavorites)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold transition-colors w-full sm:w-auto justify-center ${
            showOnlyFavorites 
              ? 'bg-red-100 text-red-700' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          } ${(!showOnlyFavorites && favoritesCount === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={!showOnlyFavorites && favoritesCount === 0}
          aria-label={showOnlyFavorites ? 'Show all properties' : 'Show only favorited properties'}
        >
          <HeartIcon className="w-5 h-5" />
          <span>Favorites</span>
          <span className={`text-xs font-bold rounded-full px-2 py-0.5 ${showOnlyFavorites ? 'bg-red-200 text-red-800' : 'bg-white text-gray-700'}`}>{favoritesCount}</span>
        </button>
      </div>
    </div>
  );
};
// --- End of FilterBar Component ---


interface PropertyListingsProps {
  properties: Property[];
  isLoading: boolean;
  error: string | null;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (value: boolean) => void;
  onSelectProperty: (id: string) => void;
}

export const PropertyListings: React.FC<PropertyListingsProps> = ({ 
  properties, 
  isLoading, 
  error,
  favorites,
  toggleFavorite,
  sortOption,
  setSortOption,
  showOnlyFavorites,
  setShowOnlyFavorites,
  onSelectProperty,
}) => {
  const hasProperties = properties.length > 0;
  
  return (
    <div className="bg-brand-light py-12 sm:py-16">
      <div className="container mx-auto px-6">
        {error && (
          <div className="text-center py-10 px-6 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-8">
            <h3 className="font-bold text-xl mb-2">An Error Occurred</h3>
            <p>{error}</p>
          </div>
        )}
        
        {!isLoading && !error && (
          <FilterBar
            sortOption={sortOption}
            onSortChange={setSortOption}
            showOnlyFavorites={showOnlyFavorites}
            onShowFavoritesChange={setShowOnlyFavorites}
            favoritesCount={favorites.length}
            resultsCount={properties.length}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => <PropertyCardSkeleton key={index} />)
          ) : (
            properties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property} 
                isFavorited={favorites.includes(property.id)}
                onToggleFavorite={toggleFavorite}
                onSelectProperty={onSelectProperty}
              />
            ))
          )}
        </div>
        
        {!isLoading && !error && !hasProperties && (
           <div className="text-center py-10 px-6 bg-gray-100 border border-gray-300 text-gray-600 rounded-lg col-span-full">
            <h3 className="font-bold text-xl mb-2">
              {showOnlyFavorites ? "No Favorited Properties" : "No Properties Found"}
            </h3>
            <p className="max-w-md mx-auto">
              {showOnlyFavorites 
                ? "You haven't added any properties to your favorites yet. Click the heart icon on a property to save it."
                : "The AI couldn't find any properties matching your search. Please try a different query."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};