import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-gray-400">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white">Dream Dwellings</h3>
            <p className="max-w-md mt-2 text-sm">Your partner in finding the perfect place to call home. Powered by generative AI.</p>
          </div>
          <div className="flex mt-6 md:mt-0 space-x-6">
            <a href="#" className="hover:text-white transition-colors duration-300">Facebook</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Twitter</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Instagram</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Dream Dwellings. All rights reserved. A fictional portfolio project.</p>
        </div>
      </div>
    </footer>
  );
};
