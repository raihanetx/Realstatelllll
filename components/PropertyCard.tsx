import React from 'react';
import type { Property } from '../types';
import { BedIcon, BathIcon, RulerIcon, HeartIcon } from './Icons';

interface PropertyCardProps {
  property: Property;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, isFavorited, onToggleFavorite, onSelectProperty }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group cursor-pointer"
      onClick={() => onSelectProperty(property.id)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelectProperty(property.id)}}
    >
      <div className="relative">
        <img src={property.imageUrl} alt={`View of ${property.address}`} className="w-full h-56 object-cover" />
        <div className="absolute top-0 right-0 m-2">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(property.id);
                }}
                className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${isFavorited ? 'bg-red-500/90 text-white' : 'bg-white/90 text-gray-600 hover:text-red-500'}`}
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
                <HeartIcon className="w-6 h-6" />
            </button>
        </div>
        <div className="absolute top-0 left-0 bg-brand-accent text-brand-primary font-bold px-3 py-1 m-2 rounded-md text-sm">
          FOR SALE
        </div>
      </div>
      <div className="p-5">
        <p className="text-2xl font-bold text-brand-primary">{formatPrice(property.price)}</p>
        <p className="text-lg font-semibold text-gray-800 mt-1 truncate" title={property.address}>{property.address}</p>
        <p className="text-sm text-gray-500">{`${property.city}, ${property.state}`}</p>
        <p className="text-gray-600 mt-3 text-sm h-16 overflow-hidden text-ellipsis">{property.description}</p>
        
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-700">
          <div className="flex items-center">
            <BedIcon className="w-5 h-5 text-brand-secondary" />
            <span className="ml-2">{property.bedrooms} beds</span>
          </div>
          <div className="flex items-center">
            <BathIcon className="w-5 h-5 text-brand-secondary" />
            <span className="ml-2">{property.bathrooms} baths</span>
          </div>
          <div className="flex items-center">
            <RulerIcon className="w-5 h-5 text-brand-secondary" />
            <span className="ml-2">{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PropertyCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="bg-gray-300 w-full h-56"></div>
      <div className="p-5">
        <div className="h-8 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between">
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/4"></div>
        </div>
      </div>
    </div>
  );
};