import React, { useState, useEffect } from 'react';
import { geocodeLocation } from '../lib/geocoding';
import type { LocationData } from '../lib/geocoding';
import { MapPin, Calendar, Clock, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreeOfLife } from './TreeOfLife';

interface Props {
  onCalculate: (location: LocationData, date: string, time: string) => void;
}

export function CalculationForm({ onCalculate }: Props) {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [date, setDate] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  });
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  });

  useEffect(() => {
    const debounceSearch = setTimeout(async () => {
      if (query.trim().length > 2 && !selectedLocation) {
        setIsSearching(true);
        const results = await geocodeLocation(query);
        setLocations(results);
        setIsSearching(false);
      } else {
        setLocations([]);
      }
    }, 600);

    return () => clearTimeout(debounceSearch);
  }, [query, selectedLocation]);

  const handleLocationSelect = (loc: LocationData) => {
    setSelectedLocation(loc);
    setQuery(loc.name);
    setLocations([]);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedLocation(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLocation && date && time) {
      onCalculate(selectedLocation, date, time);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit} 
      className="glass-panel rounded-2xl p-8 max-w-md w-full relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[--color-primary] via-[--color-secondary] to-[--color-primary]" />
      
      <div className="text-center mb-8 w-full block">
        <TreeOfLife className="w-12 h-12 text-[--color-secondary] mx-auto mb-4" />
        <h2 className="text-3xl font-[--font-serif] text-transparent bg-clip-text bg-gradient-to-r from-[#fcd34d] to-[#d4af37]">
          Thelemic Calculator
        </h2>
        <p className="text-sm text-[#e2e8f0]/60 mt-2 font-[--font-sans]">
          Discover your true celestial coordinates
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <label className="block text-sm text-[#e2e8f0]/80 mb-2 uppercase tracking-wider font-semibold">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d4af37]/70" />
            <input
              type="text"
              required
              value={query}
              onChange={handleQueryChange}
              placeholder="e.g. Cefalù, Sicily"
              className="w-full pl-10 pr-4 py-3 rounded-xl text-base"
              autoComplete="off"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 animate-spin text-[#d4af37]/70" />
            )}
          </div>
          
          <AnimatePresence>
            {locations.length > 0 && !selectedLocation && (
              <motion.ul 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute z-10 w-full mt-2 bg-[#020617]/95 border border-[#d4af37]/30 rounded-xl max-h-48 overflow-y-auto backdrop-blur-md shadow-2xl"
              >
                {locations.map((loc, i) => (
                  <li 
                    key={i}
                    onClick={() => handleLocationSelect(loc)}
                    className="px-4 py-3 hover:bg-[#1e1b4b]/50 cursor-pointer text-sm text-[#e2e8f0] border-b border-[#d4af37]/10 last:border-0 transition-colors"
                  >
                    {loc.name}
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-[#e2e8f0]/80 mb-2 uppercase tracking-wider font-semibold">Date</label>
            <div className="relative border-b-2 border-transparent">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d4af37]/70 pointer-events-none" />
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-10 pr-2 py-3 rounded-xl text-base appearance-none cursor-pointer"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-[#e2e8f0]/80 mb-2 uppercase tracking-wider font-semibold">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#d4af37]/70 pointer-events-none" />
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full pl-10 pr-2 py-3 rounded-xl text-base appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={!selectedLocation || !date || !time}
          className="w-full py-4 mt-6 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-[#d4af37] to-[#fcd34d] hover:from-[#fcd34d] hover:to-[#d4af37] text-[#020617] shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:shadow-none"
        >
          Calculate
        </button>
      </div>
    </motion.form>
  );
}
