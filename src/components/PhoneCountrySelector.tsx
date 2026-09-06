import React, { useState, useRef, useEffect } from 'react';
import { UNIVERSAL_COUNTRIES, CountryItem, DEFAULT_COUNTRY } from '../data/countriesData';
import { Search, ChevronDown, Check, Phone } from 'lucide-react';

interface PhoneCountrySelectorProps {
  phoneNumber: string;
  selectedCountry: CountryItem;
  onPhoneChange: (phone: string) => void;
  onCountryChange: (country: CountryItem) => void;
  idPrefix?: string;
  required?: boolean;
}

export const PhoneCountrySelector: React.FC<PhoneCountrySelectorProps> = ({
  phoneNumber,
  selectedCountry = DEFAULT_COUNTRY,
  onCountryChange,
  onPhoneChange,
  idPrefix = 'auth-phone',
  required = true
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredCountries = UNIVERSAL_COUNTRIES.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    return (
      c.name.toLowerCase().includes(q) ||
      c.dialCode.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q)
    );
  });

  const handleSelectCountry = (country: CountryItem) => {
    onCountryChange(country);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="space-y-1.5" ref={dropdownRef}>
      <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
        Mobile / WhatsApp Number {required && '*'}
      </label>
      <div className="relative flex items-center rounded-xl border border-stone-300 focus-within:ring-2 focus-within:ring-[#5925DC] focus-within:border-[#5925DC] bg-white transition-all overflow-visible">
        {/* Country Selector Trigger */}
        <button
          id={`${idPrefix}-country-btn`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 px-3 py-2.5 border-r border-stone-200 hover:bg-stone-50 transition-colors shrink-0 cursor-pointer text-stone-800 text-xs sm:text-sm font-medium"
        >
          <span className="text-base leading-none">{selectedCountry.flag}</span>
          <span className="font-semibold text-stone-700">{selectedCountry.dialCode}</span>
          <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Phone input */}
        <div className="relative flex-1 flex items-center">
          <Phone className="w-4 h-4 text-stone-400 absolute left-3 pointer-events-none" />
          <input
            id={`${idPrefix}-input`}
            type="tel"
            required={required}
            value={phoneNumber}
            onChange={(e) => {
              // Strip non-numeric/hyphen characters
              const clean = e.target.value.replace(/[^\d\s-]/g, '');
              onPhoneChange(clean);
            }}
            placeholder="50 123 4567"
            className="w-full pl-9 pr-3 py-2.5 text-sm text-stone-900 placeholder-stone-400 bg-transparent focus:outline-none"
          />
        </div>

        {/* Universal Countries Dropdown */}
        {isOpen && (
          <div className="absolute z-50 top-full left-0 mt-1.5 w-72 sm:w-80 bg-white border border-stone-200 rounded-2xl shadow-xl max-h-72 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Search Country Input */}
            <div className="p-2.5 border-b border-stone-100 bg-stone-50">
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search country or dial code (+966)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-lg border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#5925DC]"
                />
              </div>
            </div>

            {/* Country List */}
            <div className="overflow-y-auto flex-1 divide-y divide-stone-100 py-1">
              {filteredCountries.length === 0 ? (
                <div className="p-4 text-center text-xs text-stone-500">
                  No matching countries found
                </div>
              ) : (
                filteredCountries.map((c) => {
                  const isSelected = c.code === selectedCountry.code;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => handleSelectCountry(c)}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-purple-50/70 transition-colors text-xs cursor-pointer ${
                        isSelected ? 'bg-purple-50 font-semibold text-[#5925DC]' : 'text-stone-700'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base shrink-0">{c.flag}</span>
                        <span className="truncate">{c.name}</span>
                        {c.popular && (
                          <span className="px-1.5 py-0.2 text-[9px] rounded-sm bg-purple-100 text-[#5925DC] font-semibold shrink-0">
                            GCC / Top
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <span className="text-stone-500 font-mono text-[11px]">{c.dialCode}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#5925DC]" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
