import { fromZonedTime } from 'date-fns-tz';
import { getThelemicDate } from './src/lib/thelemic.js'; // Wait, let's just test fromZonedTime

try {
  const date = "2026-04-02";
  const time = "22:35";
  const localString = `${date}T${time}:00`;
  const timezone = "Europe/Rome"; 
  const utcDate = fromZonedTime(localString, timezone);
  console.log("utcDate:", utcDate);
} catch (e) {
  console.error("fromZonedTime fail:", e);
}
