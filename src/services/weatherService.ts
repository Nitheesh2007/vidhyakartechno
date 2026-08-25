export type GeoLocation = {
  latitude: number;
  longitude: number;
  name: string;
  region: string;
  country: string;
};

export type CurrentWeather = {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  condition: string;
  description: string;
  pressure: number;
  visibility: number;
  weather_code: number;
  uv_index: number;
  rain_probability: number;
  sunrise: string;
  sunset: string;
};

export type ForecastDay = {
  date: string;
  dayName: string;
  temp_max: number;
  temp_min: number;
  condition: string;
  weather_code: number;
  icon: string;
  precipitation_probability: number;
  precipitation_mm: number;
  wind_speed_max: number;
};

export type AgriAdvisory = {
  id: string;
  type: 'irrigation' | 'spraying' | 'fertilizer' | 'disease' | 'harvest' | 'general';
  severity: 'info' | 'warning' | 'critical' | 'success';
  title: string;
  titleTa: string;
  description: string;
  descriptionTa: string;
  actionRequired: boolean;
};

export type WeatherData = {
  current: CurrentWeather;
  forecast: ForecastDay[];
  location: GeoLocation;
  advisories: AgriAdvisory[];
  dataSource: string;
  lastUpdated: string;
};

const weatherCodeMap: Record<number, { condition: string; description: string; icon: string }> = {
  0: { condition: 'Clear Sky', description: 'clear sky', icon: '01d' },
  1: { condition: 'Mainly Clear', description: 'mainly clear', icon: '02d' },
  2: { condition: 'Partly Cloudy', description: 'partly cloudy', icon: '02d' },
  3: { condition: 'Overcast', description: 'overcast', icon: '03d' },
  45: { condition: 'Fog', description: 'foggy', icon: '50d' },
  48: { condition: 'Rime Fog', description: 'depositing rime fog', icon: '50d' },
  51: { condition: 'Light Drizzle', description: 'light drizzle', icon: '09d' },
  53: { condition: 'Drizzle', description: 'moderate drizzle', icon: '09d' },
  55: { condition: 'Heavy Drizzle', description: 'dense drizzle', icon: '09d' },
  56: { condition: 'Freezing Drizzle', description: 'light freezing drizzle', icon: '09d' },
  57: { condition: 'Freezing Drizzle', description: 'dense freezing drizzle', icon: '09d' },
  61: { condition: 'Light Rain', description: 'slight rain', icon: '10d' },
  63: { condition: 'Rain', description: 'moderate rain', icon: '10d' },
  65: { condition: 'Heavy Rain', description: 'heavy rain', icon: '10d' },
  66: { condition: 'Freezing Rain', description: 'light freezing rain', icon: '10d' },
  67: { condition: 'Freezing Rain', description: 'heavy freezing rain', icon: '10d' },
  71: { condition: 'Light Snow', description: 'slight snow fall', icon: '13d' },
  73: { condition: 'Snow', description: 'moderate snow fall', icon: '13d' },
  75: { condition: 'Heavy Snow', description: 'heavy snow fall', icon: '13d' },
  77: { condition: 'Snow Grains', description: 'snow grains', icon: '13d' },
  80: { condition: 'Light Showers', description: 'slight rain showers', icon: '10d' },
  81: { condition: 'Showers', description: 'moderate rain showers', icon: '10d' },
  82: { condition: 'Heavy Showers', description: 'violent rain showers', icon: '10d' },
  85: { condition: 'Snow Showers', description: 'slight snow showers', icon: '13d' },
  86: { condition: 'Snow Showers', description: 'heavy snow showers', icon: '13d' },
  95: { condition: 'Thunderstorm', description: 'thunderstorm', icon: '11d' },
  96: { condition: 'Thunderstorm', description: 'thunderstorm with slight hail', icon: '11d' },
  99: { condition: 'Thunderstorm', description: 'thunderstorm with heavy hail', icon: '11d' },
};

const rainCodes = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99];

export function isRainCode(code: number): boolean {
  return rainCodes.includes(code);
}

export function generateAgriAdvisories(current: CurrentWeather, forecast: ForecastDay[]): AgriAdvisory[] {
  const advisories: AgriAdvisory[] = [];
  const tomorrow = forecast[1] || forecast[0];
  const willRainTomorrow = tomorrow && (tomorrow.precipitation_probability > 50 || isRainCode(tomorrow.weather_code));
  const willRainHeavy = forecast.some((d, idx) => idx < 3 && d.precipitation_mm > 15);

  if (willRainTomorrow) {
    advisories.push({
      id: 'adv-rain-irrigation',
      type: 'irrigation',
      severity: 'warning',
      title: 'Postpone Irrigation (Rain Expected)',
      titleTa: 'பாசனத்தை ஒத்திவைக்கவும் (மழை வாய்ப்பு)',
      description: `Rain probability is ${tomorrow.precipitation_probability}% tomorrow. Postpone scheduled irrigation to save water and prevent root rotting.`,
      descriptionTa: `நாளை மழை வாய்ப்பு ${tomorrow.precipitation_probability}% உள்ளது. தண்ணீரைச் சேமிக்கவும் வேர் அழுகலைத் தடுக்கவும் பாசனத்தை ஒத்திவைக்கவும்.`,
      actionRequired: true,
    });
  }

  if (willRainHeavy) {
    advisories.push({
      id: 'adv-rain-fertilizer',
      type: 'fertilizer',
      severity: 'critical',
      title: 'Avoid Fertilizer Application',
      titleTa: 'உரம் இடுவதைத் தவிர்க்கவும்',
      description: 'Heavy rainfall expected within 48-72 hours. Avoid chemical or foliar fertilizer broadcast to prevent nutrient runoff/leaching.',
      descriptionTa: 'அடுத்த 48-72 மணி நேரத்திற்குள் கனமழை எதிர்பார்க்கப்படுகிறது. உரம் அடித்துச் செல்லப்படுவதைத் தவிர்க்க உரம் இடுவதை நிறுத்தவும்.',
      actionRequired: true,
    });
  }

  if (current.wind_speed > 22) {
    advisories.push({
      id: 'adv-wind-spraying',
      type: 'spraying',
      severity: 'warning',
      title: 'High Wind: Avoid Pesticide Spraying',
      titleTa: 'அதிக காற்று: பூச்சிக்கொல்லி தெளிப்பதைத் தவிர்க்கவும்',
      description: `Current wind speed is ${current.wind_speed} km/h. Avoid pesticide/fungicide spraying to prevent drift loss and uneven coverage.`,
      descriptionTa: `தற்போதைய காற்றின் வேகம் ${current.wind_speed} கி.மீ/மணி. மருந்து வீணாவதைத் தடுக்க பூச்சிக்கொல்லி தெளிப்பதைத் தவிர்க்கவும்.`,
      actionRequired: true,
    });
  }

  if (current.temp >= 36) {
    advisories.push({
      id: 'adv-heat-stress',
      type: 'irrigation',
      severity: 'warning',
      title: 'High Temperature & Heat Stress',
      titleTa: 'அதிக வெப்பநிலை மற்றும் வெப்ப அழுத்தம்',
      description: `Temperature is ${current.temp}°C. Irrigate crops during early morning or late evening. Apply straw mulching to conserve moisture.`,
      descriptionTa: `வெப்பநிலை ${current.temp}°C ஆக உள்ளது. அதிகாலை அல்லது மாலையில் தண்ணீர் பாய்ச்சவும். ஈரப்பதத்தை பாதுகாக்க வைக்கோல் மூடாக்கு இடவும்.`,
      actionRequired: false,
    });
  }

  if (current.humidity >= 80 && current.temp >= 24 && current.temp <= 33) {
    advisories.push({
      id: 'adv-fungal-disease',
      type: 'disease',
      severity: 'warning',
      title: 'Fungal Disease Alert (High Humidity)',
      titleTa: 'பூஞ்சை நோய் எச்சரிக்கை (அதிக ஈரப்பதம்)',
      description: `Relative humidity is ${current.humidity}% with warm conditions. Ideal climate for blast, blight, and mildew. Monitor leaf undersides.`,
      descriptionTa: `ஈரப்பதம் ${current.humidity}% ஆக உள்ளது. இது இலைக்கருகல் மற்றும் பூஞ்சை நோய்களுக்கு சாதகமானது. பயிர்களைக் கண்காணிக்கவும்.`,
      actionRequired: false,
    });
  }

  if (advisories.length === 0) {
    advisories.push({
      id: 'adv-optimal',
      type: 'general',
      severity: 'success',
      title: 'Optimal Field Working Conditions',
      titleTa: 'விவசாய வேலைக்கு ஏற்ற வானிலை',
      description: 'Current weather conditions are favorable for weeding, intercultural operations, and general crop management.',
      descriptionTa: 'தற்போதைய வானிலை களை எடுத்தல் மற்றும் பொதுவான பயிர் மேலாண்மைக்கு மிகவும் சாதகமாக உள்ளது.',
      actionRequired: false,
    });
  }

  return advisories;
}

export async function searchLocation(query: string): Promise<GeoLocation[]> {
  if (!query.trim()) return [];
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to search location');
  const data = await res.json();
  if (!data.results) return [];
  return data.results.map((r: { latitude: number; longitude: number; name: string; admin1?: string; country?: string }) => ({
    latitude: r.latitude,
    longitude: r.longitude,
    name: r.name,
    region: r.admin1 || '',
    country: r.country || '',
  }));
}

export async function reverseGeocode(lat: number, lon: number): Promise<GeoLocation> {
  try {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const res = await fetch(url);
    if (!res.ok) throw new Error();
    const data = await res.json();
    return {
      latitude: lat,
      longitude: lon,
      name: data.city || data.locality || data.principalSubdivision || 'Current Location',
      region: data.principalSubdivision || '',
      country: data.countryName || '',
    };
  } catch {
    return { latitude: lat, longitude: lon, name: 'Current Location', region: '', country: '' };
  }
}

export function getCurrentPosition(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => {
        const messages: Record<number, string> = {
          1: 'Location access denied. Please allow location permissions in your browser.',
          2: 'Location unavailable. Please search for your town or district.',
          3: 'Location request timed out. Please try again.',
        };
        reject(new Error(messages[err.code] || 'Failed to get location'));
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDayName(dateStr: string): string {
  const d = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const diff = Math.round((target.getTime() - today.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  return d.toLocaleDateString([], { weekday: 'short' });
}

export async function fetchWeather(lat: number, lon: number): Promise<{ current: CurrentWeather; forecast: ForecastDay[]; advisories: AgriAdvisory[] }> {
  try {
    const params = new URLSearchParams({
      latitude: String(lat),
      longitude: String(lon),
      current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,pressure_msl,visibility,uv_index',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,sunrise,sunset',
      timezone: 'auto',
      forecast_days: '7',
    });
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!res.ok) throw new Error('Failed to fetch Open-Meteo weather');
    const data = await res.json();

    const wc = data.current.weather_code as number;
    const mapped = weatherCodeMap[wc] || { condition: 'Clear Sky', description: 'clear sky', icon: '01d' };

    const current: CurrentWeather = {
      temp: Math.round(data.current.temperature_2m),
      feels_like: Math.round(data.current.apparent_temperature),
      humidity: Math.round(data.current.relative_humidity_2m),
      wind_speed: Math.round(data.current.wind_speed_10m),
      condition: mapped.condition,
      description: mapped.description,
      pressure: Math.round(data.current.pressure_msl),
      visibility: Math.round((data.current.visibility || 10000) / 1000),
      weather_code: wc,
      uv_index: Math.round(data.current.uv_index || 5),
      rain_probability: data.daily?.precipitation_probability_max?.[0] || 0,
      sunrise: formatTime(data.daily.sunrise[0]),
      sunset: formatTime(data.daily.sunset[0]),
    };

    const forecast: ForecastDay[] = (data.daily.time as string[]).map((date, i) => {
      const fwc = data.daily.weather_code[i] as number;
      const fmapped = weatherCodeMap[fwc] || { condition: 'Clear Sky', description: 'clear sky', icon: '01d' };
      return {
        date,
        dayName: formatDayName(date),
        temp_max: Math.round(data.daily.temperature_2m_max[i]),
        temp_min: Math.round(data.daily.temperature_2m_min[i]),
        condition: fmapped.condition,
        weather_code: fwc,
        icon: fmapped.icon,
        precipitation_probability: data.daily.precipitation_probability_max?.[i] || 0,
        precipitation_mm: data.daily.precipitation_sum?.[i] || 0,
        wind_speed_max: Math.round(data.daily.wind_speed_10m_max?.[i] || 10),
      };
    });

    const advisories = generateAgriAdvisories(current, forecast);

    return { current, forecast, advisories };
  } catch (error) {
    // Fallback in case of network unavailability
    console.warn('Weather API failed, using fallback agricultural weather data', error);
    const mockCurrent: CurrentWeather = {
      temp: 29,
      feels_like: 31,
      humidity: 68,
      wind_speed: 12,
      condition: 'Partly Cloudy',
      description: 'partly cloudy with sunny spells',
      pressure: 1012,
      visibility: 9,
      weather_code: 2,
      uv_index: 6,
      rain_probability: 20,
      sunrise: '06:05 AM',
      sunset: '06:35 PM',
    };
    const mockForecast: ForecastDay[] = [
      { date: '2026-08-25', dayName: 'Today', temp_max: 32, temp_min: 24, condition: 'Partly Cloudy', weather_code: 2, icon: '02d', precipitation_probability: 20, precipitation_mm: 0, wind_speed_max: 14 },
      { date: '2026-08-26', dayName: 'Tomorrow', temp_max: 31, temp_min: 23, condition: 'Light Rain', weather_code: 61, icon: '10d', precipitation_probability: 65, precipitation_mm: 8, wind_speed_max: 18 },
      { date: '2026-08-27', dayName: 'Thu', temp_max: 30, temp_min: 23, condition: 'Rain', weather_code: 63, icon: '10d', precipitation_probability: 75, precipitation_mm: 14, wind_speed_max: 20 },
      { date: '2026-08-28', dayName: 'Fri', temp_max: 32, temp_min: 24, condition: 'Partly Cloudy', weather_code: 2, icon: '02d', precipitation_probability: 30, precipitation_mm: 2, wind_speed_max: 12 },
      { date: '2026-08-29', dayName: 'Sat', temp_max: 33, temp_min: 25, condition: 'Clear Sky', weather_code: 0, icon: '01d', precipitation_probability: 10, precipitation_mm: 0, wind_speed_max: 10 },
      { date: '2026-08-30', dayName: 'Sun', temp_max: 34, temp_min: 25, condition: 'Mainly Clear', weather_code: 1, icon: '01d', precipitation_probability: 15, precipitation_mm: 0, wind_speed_max: 11 },
      { date: '2026-08-31', dayName: 'Mon', temp_max: 33, temp_min: 24, condition: 'Partly Cloudy', weather_code: 2, icon: '02d', precipitation_probability: 25, precipitation_mm: 1, wind_speed_max: 13 },
    ];
    return {
      current: mockCurrent,
      forecast: mockForecast,
      advisories: generateAgriAdvisories(mockCurrent, mockForecast),
    };
  }
}

export function locationLabel(loc: GeoLocation): string {
  return [loc.name, loc.region, loc.country].filter(Boolean).join(', ');
}
