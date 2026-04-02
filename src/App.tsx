import { useState } from 'react';
import { CalculationForm } from './components/CalculationForm';
import { ResultDisplay } from './components/ResultDisplay';
import { getThelemicDate } from './lib/thelemic';
import type { LocationData } from './lib/geocoding';
import { fromZonedTime } from 'date-fns-tz';

export interface ThelemicResult {
  sun: { sign: string; degree: number; minute: number; };
  moon: { sign: string; degree: number; minute: number; };
  day: string;
  anno: string;
  formatted: string;
  location: LocationData;
}

function App() {
  const [resultData, setResultData] = useState<ThelemicResult | null>(null);

  const handleCalculate = (location: LocationData, date: string, time: string) => {
    try {
      // Create a local timestamp string without trailing 'Z'
      // Example: "2026-03-20T14:30:00"
      const localString = `${date}T${time}:00`;

      // Convert the local time in the specified timezone to a UTC Date object
      const utcDate = fromZonedTime(localString, location.timezone);
      
      const result = getThelemicDate(utcDate);
      setResultData({ ...result, location });
    } catch (e) {
      console.error("Calculation failed", e);
      alert("Failed to calculate the date. Please try again.");
    }
  };

  const handleReset = () => {
    setResultData(null);
  };

  return (
    <div className="w-full flex-col flex items-center justify-center min-h-screen p-4 md:p-8">
      {!resultData ? (
        <CalculationForm onCalculate={handleCalculate} />
      ) : (
        <ResultDisplay data={resultData} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
