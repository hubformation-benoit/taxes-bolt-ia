import React from 'react';
import { Languages } from 'lucide-react';
import { Language } from '../types/language';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLanguage, onLanguageChange }) => {
  history.pushState({}, "", `#${currentLanguage}`)

  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg shadow-md p-2 border border-gray-200">
      <Languages className="w-4 h-4 text-gray-600" />
      <button
        onClick={() => onLanguageChange('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
          currentLanguage === 'en'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => onLanguageChange('fr')}
        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 ${
          currentLanguage === 'fr'
            ? 'bg-blue-600 text-white shadow-sm'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageToggle;
