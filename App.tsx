import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PropertyListings } from './components/PropertyListings';
import { Footer } from './components/Footer';
import { PropertyDetails } from './components/PropertyDetails';
import { generatePropertyListings } from './services/geminiService';
import type { Property } from './types';

const App: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('featured luxury homes in California');

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dream-dwellings-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [sortOption, setSortOption] = useState('default');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  
  const [view, setView] = useState<'listings' | 'details'>('listings');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);


  const fetchProperties = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newProperties = await generatePropertyListings(prompt);
      setProperties(newProperties);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch properties. The AI might be busy, please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch initial properties only on mount

  const handleSearch = (query: string) => {
    const newSearchTerm = query.trim() ? query : 'featured luxury homes';
    setSearchTerm(newSearchTerm);
    fetchProperties(newSearchTerm);
    setShowOnlyFavorites(false);
    setSortOption('default');
    setView('listings');
  };

  const toggleFavorite = (propertyId: string) => {
    const newFavorites = favorites.includes(propertyId)
      ? favorites.filter(id => id !== propertyId)
      : [...favorites, propertyId];
    setFavorites(newFavorites);
    localStorage.setItem('dream-dwellings-favorites', JSON.stringify(newFavorites));
  };
  
  const handleSelectProperty = (id: string) => {
    setSelectedPropertyId(id);
    setView('details');
    window.scrollTo(0, 0);
  };

  const handleBackToListings = () => {
    setSelectedPropertyId(null);
    setView('listings');
  };

  const displayedProperties = useMemo(() => {
    const sourceProperties = showOnlyFavorites
      ? properties.filter(p => favorites.includes(p.id))
      : properties;

    return [...sourceProperties].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'sqft-desc':
          return b.sqft - a.sqft;
        default:
          return 0;
      }
    });
  }, [properties, favorites, showOnlyFavorites, sortOption]);
  
  const selectedProperty = useMemo(() => {
    if (!selectedPropertyId) return null;
    return properties.find(p => p.id === selectedPropertyId);
  }, [selectedPropertyId, properties]);

  return (
    <div className="bg-brand-light min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        {view === 'listings' ? (
          <>
            <Hero onSearch={handleSearch} initialSearchTerm={searchTerm} />
            <PropertyListings 
              properties={displayedProperties} 
              isLoading={isLoading} 
              error={error}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              sortOption={sortOption}
              setSortOption={setSortOption}
              showOnlyFavorites={showOnlyFavorites}
              setShowOnlyFavorites={setShowOnlyFavorites}
              onSelectProperty={handleSelectProperty}
            />
          </>
        ) : selectedProperty ? (
          <PropertyDetails
            property={selectedProperty}
            onBack={handleBackToListings}
            isFavorited={favorites.includes(selectedProperty.id)}
            onToggleFavorite={toggleFavorite}
          />
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default App;