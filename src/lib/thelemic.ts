import { Seasons, MakeTime, SunPosition, Libration } from 'astronomy-engine';

const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer',
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

const LATIN_DAYS = [
  'Dies Solis', 'Dies Lunae', 'Dies Martis', 'Dies Mercurii',
  'Dies Jovis', 'Dies Veneris', 'Dies Saturni'
];

function toRoman(num: number): string {
  if (num === 0) return '0';
  const roman: Record<string, number> = {
    M: 1000, CM: 900, D: 500, CD: 400,
    C: 100, XC: 90, L: 50, XL: 40,
    X: 10, IX: 9, V: 5, IV: 4, I: 1
  };
  let result = '';
  for (const key in roman) {
    while (num >= roman[key]) {
      result += key;
      num -= roman[key];
    }
  }
  return result;
}

export function formatDegree(decimalDegree: number): { sign: string; degree: number; minute: number } {
  // Normalize to 0-360
  let norm = decimalDegree % 360;
  if (norm < 0) norm += 360;

  const signIndex = Math.floor(norm / 30);
  const remainder = norm % 30;
  
  const degree = Math.floor(remainder);
  const minute = Math.floor((remainder - degree) * 60);

  return {
    sign: ZODIAC_SIGNS[signIndex],
    degree,
    minute
  };
}

export function getThelemicDate(date: Date) {
  const year = date.getUTCFullYear();
  
  // Calculate equinox for this year
  const equinox = Seasons(year).mar_equinox.date;
  
  let thelemicYearNum;
  if (date.getTime() >= equinox.getTime()) {
    thelemicYearNum = year - 1904;
  } else {
    thelemicYearNum = year - 1905;
  }

  const cycle = Math.floor(thelemicYearNum / 22);
  const yearInCycle = thelemicYearNum % 22;

  const cycleRoman = toRoman(cycle);
  const yearRoman = toRoman(yearInCycle).toLowerCase();
  
  const anno = `${cycleRoman}:${yearRoman}`;

  // Astronomical positions
  const astroTime = MakeTime(date);
  const sunLon = SunPosition(astroTime).elon;
  const moonLon = Libration(astroTime).mlon;

  const sunPos = formatDegree(sunLon);
  const moonPos = formatDegree(moonLon);

  // Day of week
  const dayOfWeek = date.getDay(); // 0 is Sunday
  const latinDay = LATIN_DAYS[dayOfWeek];

  return {
    sun: sunPos,
    moon: moonPos,
    day: latinDay,
    anno: anno,
    formatted: `Sol ${sunPos.degree}° ${sunPos.sign}, Luna ${moonPos.degree}° ${moonPos.sign}, ${latinDay}, Anno ${anno}`
  };
}
