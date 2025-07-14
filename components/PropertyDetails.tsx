import React from 'react';
import type { Property } from '../types';
import { BedIcon, BathIcon, RulerIcon, HeartIcon, ChevronLeftIcon, MailIcon } from './Icons';

interface PropertyDetailsProps {
  property: Property;
  onBack: () => void;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onBack, isFavorited, onToggleFavorite }) => {
  if (!property) {
    return (
      <div className="container mx-auto px-6 py-12 text-center animate-fade-in">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="text-gray-600 mb-6">The property you are looking for does not exist or may have been removed.</p>
        <button onClick={onBack} className="inline-flex items-center gap-2 text-brand-secondary font-semibold hover:text-brand-primary transition-colors duration-300 group">
          <ChevronLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Listings
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-brand-secondary font-semibold mb-6 hover:text-brand-primary transition-colors duration-300 group">
        <ChevronLeftIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        Back to Listings
      </button>

      <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          
          <div className="lg:col-span-3">
            <img src={property.imageUrl} alt={`View of ${property.address}`} className="w-full h-full object-cover min-h-[300px] lg:min-h-[600px]" />
          </div>

          <div className="lg:col-span-2 p-6 sm:p-8 flex flex-col">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h1 className="text-3xl lg:text-4xl font-bold text-brand-primary leading-tight">{formatPrice(property.price)}</h1>
                <p className="text-lg text-gray-800 mt-2">{property.address}</p>
                <p className="text-md text-gray-500">{`${property.city}, ${property.state}`}</p>
              </div>
              <button
                onClick={() => onToggleFavorite(property.id)}
                className={`p-3 rounded-full transition-all duration-300 transform hover:scale-110 flex-shrink-0 ${isFavorited ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500 hover:text-red-500'}`}
                aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
              >
                <HeartIcon className="w-7 h-7" />
              </button>
            </div>
            
            <div className="my-6 py-6 border-t border-b border-gray-200 grid grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <BedIcon className="w-7 h-7 text-brand-secondary" />
                <span className="font-bold text-lg text-gray-800">{property.bedrooms}</span>
                <span className="text-sm text-gray-500">Beds</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BathIcon className="w-7 h-7 text-brand-secondary" />
                <span className="font-bold text-lg text-gray-800">{property.bathrooms}</span>
                <span className="text-sm text-gray-500">Baths</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RulerIcon className="w-7 h-7 text-brand-secondary" />
                <span className="font-bold text-lg text-gray-800">{property.sqft.toLocaleString()}</span>
                <span className="text-sm text-gray-500">sqft</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Property Details</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </div>

            <div className="mt-auto pt-8">
              <button className="w-full bg-brand-accent text-brand-primary font-bold py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3">
                <MailIcon className="w-6 h-6" />
                Contact Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};