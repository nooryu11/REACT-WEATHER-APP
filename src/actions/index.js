import axios from 'axios'

const api = '04841b84d1e3920110e3cc9fb9ec32f6'
const url = `http://api.openweathermap.org/data/2.5/forecast?appid=${api}`
export const FETCH_WEATHER = 'FETCH_WEATHER';
export function fetchWeather(city){
  const url2 = `${url}&q=${city},us`
  const request = axios.get(url2);
console.log('request:',request)
  return {
    type: FETCH_WEATHER,
    payload:request
  }
}
