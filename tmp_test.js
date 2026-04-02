import { Seasons, MakeTime, Body, SunPosition, Libration } from 'astronomy-engine';

const date = new Date();
const time = MakeTime(date);

console.log('Sun lon:', SunPosition(time).elon);
console.log('Moon lon:', Libration(time).mlon);
