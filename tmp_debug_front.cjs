import { fromZonedTime } from 'date-fns-tz';
import { getThelemicDate } from './src/lib/thelemic.js';

try {
  const localString = `2026-04-02T22:35:00`;
  const utcDate = fromZonedTime(localString, "Europe/Rome");
  console.log("utcDate:", utcDate);
  const result = getThelemicDate(utcDate);
  console.log("Result:", result);
} catch(e) {
  console.error("FAIL:", e);
}
