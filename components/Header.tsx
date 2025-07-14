import React from 'react';

const HouseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.5l-8 6v11h6v-6h4v6h6v-11l-8-6zm0 2.118l6 4.5v9.382h-4v-6h-4v6h-4v-9.382l6-4.5z"/>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-brand-primary/90 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
             <HouseIcon className="w-8 h-8 text-brand-accent"/>
            <span className="ml-3 text-2xl font-bold text-white tracking-tight">Dream Dwellings</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">For Sale</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">For Rent</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">Agents</a>
            <a href="#" className="bg-brand-accent text-brand-primary font-semibold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-300">
              Contact Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};
