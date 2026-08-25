import { Crop, FarmDetail, supabase } from '../lib/supabase';

export type CropRecommendationInput = {
  soil_type: string;
  soil_ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  rainfall: number;
  water_availability: string;
  current_season: string;
  farm_size_acres?: number;
  previous_crop?: string;
  irrigation_type?: string;
  district?: string;
  state?: string;
};

export type CropRecommendationDetail = Crop & {
  suitabilityScore: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  expectedGrowingDuration: string;
  waterRequirementLevel: 'Low' | 'Medium' | 'High' | 'Very High';
  expectedYieldRange: string;
  recommendedSowingPeriod: string;
  recommendedSowingPeriodTa: string;
  reasons: string[];
  reasonsTa: string[];
  rotationNote?: string;
  rotationNoteTa?: string;
};

// Comprehensive Master Crop Dataset for Indian/Tropical Agriculture
export const MASTER_CROPS: (Crop & {
  sowing_window: string;
  sowing_window_ta: string;
  min_ph: number;
  max_ph: number;
  opt_n: number;
  opt_p: number;
  opt_k: number;
  rotation_compatibility: string[];
})[] = [
  {
    id: 'crop-paddy-1',
    crop_name: 'Paddy (Rice)',
    scientific_name: 'Oryza sativa',
    soil_type: 'Clay',
    suitable_season: 'Monsoon Season',
    water_requirement: 'High',
    temperature_range: '22-34°C',
    rainfall_range: '1000-1500 mm',
    fertilizer: 'NPK 120:60:60 kg/ha + Zinc Sulphate 25kg/ha',
    growth_duration: '110-135 Days',
    expected_yield: '22-30 Quintals/Acre',
    market_value: '₹2,200 - ₹2,800/Quintal',
    image_url: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    sowing_window: 'June - July (Kharif) / Nov - Dec (Rabi)',
    sowing_window_ta: 'ஜூன் - ஜூலை (குறுவை/சம்பா) / நவ - டிச (நவரை)',
    min_ph: 5.5,
    max_ph: 7.5,
    opt_n: 100,
    opt_p: 50,
    opt_k: 60,
    rotation_compatibility: ['Pulses', 'Groundnut', 'Black Gram', 'Green Gram', 'Mustard'],
  },
  {
    id: 'crop-groundnut-2',
    crop_name: 'Groundnut (Peanut)',
    scientific_name: 'Arachis hypogaea',
    soil_type: 'Red',
    suitable_season: 'Monsoon Season',
    water_requirement: 'Medium',
    temperature_range: '24-32°C',
    rainfall_range: '500-750 mm',
    fertilizer: 'NPK 25:50:75 kg/ha + Gypsum 400kg/ha at pegging',
    growth_duration: '105-120 Days',
    expected_yield: '10-16 Quintals/Acre',
    market_value: '₹5,800 - ₹7,200/Quintal',
    image_url: 'https://images.unsplash.com/photo-1599818816933-421711202868?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    sowing_window: 'June - July / Jan - Feb',
    sowing_window_ta: 'ஜூன் - ஜூலை / ஜனவரி - பிப்ரவரி',
    min_ph: 6.0,
    max_ph: 7.8,
    opt_n: 30,
    opt_p: 60,
    opt_k: 80,
    rotation_compatibility: ['Paddy', 'Maize', 'Sorghum', 'Pearl Millet'],
  },
  {
    id: 'crop-cotton-3',
    crop_name: 'Cotton',
    scientific_name: 'Gossypium hirsutum',
    soil_type: 'Black',
    suitable_season: 'Monsoon Season',
    water_requirement: 'Medium',
    temperature_range: '21-35°C',
    rainfall_range: '600-1000 mm',
    fertilizer: 'NPK 120:60:60 kg/ha split into 3 doses',
    growth_duration: '150-180 Days',
    expected_yield: '12-18 Quintals/Acre',
    market_value: '₹6,500 - ₹8,000/Quintal',
    image_url: 'https://images.unsplash.com/photo-1594488518001-44755106b026?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    sowing_window: 'July - August',
    sowing_window_ta: 'ஜூலை - ஆகஸ்ட்',
    min_ph: 6.5,
    max_ph: 8.5,
    opt_n: 110,
    opt_p: 55,
    opt_k: 60,
    rotation_compatibility: ['Soybean', 'Chickpea', 'Wheat'],
  },
  {
    id: 'crop-maize-4',
    crop_name: 'Maize (Corn)',
    scientific_name: 'Zea mays',
    soil_type: 'Loamy',
    suitable_season: 'All Seasons',
    water_requirement: 'Medium',
    temperature_range: '18-32°C',
    rainfall_range: '500-800 mm',
    fertilizer: 'NPK 120:60:40 kg/ha + Zinc Sulphate',
    growth_duration: '90-110 Days',
    expected_yield: '25-35 Quintals/Acre',
    market_value: '₹1,900 - ₹2,400/Quintal',
    image_url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    sowing_window: 'Jun-Jul (Kharif) / Oct-Nov (Rabi) / Jan-Feb (Summer)',
    sowing_window_ta: 'ஜூன்-ஜூலை / அக்டோபர்-நவம்பர் / ஜனவரி',
    min_ph: 5.8,
    max_ph: 7.5,
    opt_n: 120,
    opt_p: 60,
    opt_k: 50,
    rotation_compatibility: ['Legumes', 'Groundnut', 'Potato', 'Mustard'],
  },
  {
    id: 'crop-blackgram-5',
    crop_name: 'Black Gram (Urad Dal)',
    scientific_name: 'Vigna mungo',
    soil_type: 'Loamy',
    suitable_season: 'Winter Season',
    water_requirement: 'Low',
    temperature_range: '22-30°C',
    rainfall_range: '400-600 mm',
    fertilizer: 'NPK 20:40:20 kg/ha + Rhizobium seed inoculation',
    growth_duration: '65-75 Days',
    expected_yield: '4-7 Quintals/Acre',
    market_value: '₹7,000 - ₹8,800/Quintal',
    image_url: 'https://images.unsplash.com/photo-1585671962215-47014ebb7d50?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    sowing_window: 'October - November (Rice Fallow: Jan - Feb)',
    sowing_window_ta: 'அக்டோபர் - நவம்பர் (நெல் தரிசு: ஜன - பிப்)',
    min_ph: 6.0,
    max_ph: 7.5,
    opt_n: 25,
    opt_p: 45,
    opt_k: 25,
    rotation_compatibility: ['Paddy', 'Maize', 'Sugarcane', 'Cotton'],
  },
  {
    id: 'crop-tomato-6',
    crop_name: 'Tomato',
    scientific_name: 'Solanum lycopersicum',
    soil_type: 'Loamy',
    suitable_season: 'All Seasons',
    water_requirement: 'Medium',
    temperature_range: '18-29°C',
    rainfall_range: '600-800 mm',
    fertilizer: 'NPK 150:100:100 kg/ha + Micronutrients spray',
    growth_duration: '100-120 Days',
    expected_yield: '120-180 Quintals/Acre',
    market_value: '₹1,500 - ₹4,500/Quintal',
    image_url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    sowing_window: 'Jun - Jul / Oct - Nov / Jan - Feb',
    sowing_window_ta: 'ஜூன் - ஜூலை / அக்டோபர் - நவம்பர் / ஜனவரி',
    min_ph: 6.0,
    max_ph: 7.2,
    opt_n: 140,
    opt_p: 90,
    opt_k: 90,
    rotation_compatibility: ['Legumes', 'Corn', 'Crucifers'],
  },
  {
    id: 'crop-sugarcane-7',
    crop_name: 'Sugarcane',
    scientific_name: 'Saccharum officinarum',
    soil_type: 'Alluvial',
    suitable_season: 'All Seasons',
    water_requirement: 'High',
    temperature_range: '24-38°C',
    rainfall_range: '1200-1800 mm',
    fertilizer: 'NPK 275:65:115 kg/ha in split applications',
    growth_duration: '300-360 Days',
    expected_yield: '350-450 Quintals/Acre',
    market_value: '₹315 - ₹350/Quintal (FRP)',
    image_url: 'https://images.unsplash.com/photo-1588693951525-6b83525387c2?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    sowing_window: 'December - March',
    sowing_window_ta: 'டிசம்பர் - மார்ச்',
    min_ph: 6.5,
    max_ph: 8.0,
    opt_n: 250,
    opt_p: 70,
    opt_k: 120,
    rotation_compatibility: ['Pulses', 'Wheat', 'Mustard', 'Sesbania'],
  },
  {
    id: 'crop-banana-8',
    crop_name: 'Banana',
    scientific_name: 'Musa acuminata',
    soil_type: 'Alluvial',
    suitable_season: 'All Seasons',
    water_requirement: 'High',
    temperature_range: '20-35°C',
    rainfall_range: '1000-1500 mm',
    fertilizer: 'NPK 200:50:300 g/plant per year',
    growth_duration: '300-365 Days',
    expected_yield: '200-300 Quintals/Acre',
    market_value: '₹1,800 - ₹3,200/Quintal',
    image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
    created_at: new Date().toISOString(),
    sowing_window: 'February - April / August - October',
    sowing_window_ta: 'பிப்ரவரி - ஏப்ரல் / ஆகஸ்ட் - அக்டோபர்',
    min_ph: 6.0,
    max_ph: 7.5,
    opt_n: 180,
    opt_p: 50,
    opt_k: 250,
    rotation_compatibility: ['Green Manure', 'Cowpea', 'Rice'],
  },
];

export async function getSmartCropRecommendations(input: CropRecommendationInput): Promise<CropRecommendationDetail[]> {
  // Try fetching dynamic crops from Supabase, or fall back to rich Master Dataset
  let dbCrops: Crop[] = [];
  try {
    const { data } = await supabase.from('crops').select('*');
    if (data && data.length > 0) {
      dbCrops = data;
    }
  } catch (err) {
    console.warn('Using built-in master crop dataset for recommendation engine', err);
  }

  const allAvailable = MASTER_CROPS;

  const scoredCrops = allAvailable.map((crop) => {
    let score = 0;
    const reasons: string[] = [];
    const reasonsTa: string[] = [];

    // 1. Soil Type Match (25 pts)
    const soilTypeLower = input.soil_type?.toLowerCase() || '';
    const cropSoilLower = crop.soil_type?.toLowerCase() || '';
    if (cropSoilLower.includes(soilTypeLower) || soilTypeLower.includes(cropSoilLower)) {
      score += 25;
      reasons.push(`Optimal soil match: ${crop.crop_name} thrives in ${input.soil_type} soil.`);
      reasonsTa.push(`மண் பொருத்தம்: ${crop.crop_name} ${input.soil_type} மண்ணில் நன்றாக வளரும்.`);
    } else if (
      (soilTypeLower.includes('loamy') && (cropSoilLower.includes('alluvial') || cropSoilLower.includes('red'))) ||
      (soilTypeLower.includes('alluvial') && cropSoilLower.includes('loamy'))
    ) {
      score += 18;
      reasons.push(`Compatible soil profile (${input.soil_type} is well-suited with organic additions).`);
      reasonsTa.push(`ஏற்ற மண் தன்மை: ${input.soil_type} மண் தேவையான அளவு பொருத்தமானது.`);
    } else {
      score += 8;
    }

    // 2. Soil pH Range (15 pts)
    const ph = Number(input.soil_ph) || 6.5;
    if (ph >= crop.min_ph && ph <= crop.max_ph) {
      score += 15;
      reasons.push(`Ideal soil pH: Your soil pH (${ph}) is within the optimal ${crop.min_ph} - ${crop.max_ph} range.`);
      reasonsTa.push(`மண் அமில/காரத்தன்மை (pH ${ph}) இந்த பயிருக்கு மிகவும் உகந்தது.`);
    } else if (Math.abs(ph - ((crop.min_ph + crop.max_ph) / 2)) <= 1.2) {
      score += 9;
      reasons.push(`Acceptable pH level (${ph}) with mild soil conditioning.`);
      reasonsTa.push(`ஏற்றுக்கொள்ளக்கூடிய pH அளவு (${ph}).`);
    } else {
      score += 3;
    }

    // 3. Season Compatibility (20 pts)
    const seasonInput = input.current_season?.toLowerCase() || '';
    const cropSeason = crop.suitable_season?.toLowerCase() || '';
    if (cropSeason.includes('all') || seasonInput.includes('all') || cropSeason.includes(seasonInput) || seasonInput.includes(cropSeason)) {
      score += 20;
      reasons.push(`Seasonal alignment: Fits current ${input.current_season} growing conditions.`);
      reasonsTa.push(`பருவகால பொருத்தம்: தற்போதைய ${input.current_season} பருவத்திற்கு சிறந்தது.`);
    } else {
      score += 5;
    }

    // 4. Temperature Suitability (15 pts)
    const temp = Number(input.temperature) || 28;
    const tempMatch = crop.temperature_range.match(/(\d+)-(\d+)/);
    if (tempMatch) {
      const minT = Number(tempMatch[1]);
      const maxT = Number(tempMatch[2]);
      if (temp >= minT && temp <= maxT) {
        score += 15;
        reasons.push(`Thermal suitability: Current average ${temp}°C matches the ideal ${minT}-${maxT}°C thermal requirement.`);
        reasonsTa.push(`வெப்பநிலை பொருத்தம்: தற்போதைய ${temp}°C பயிர் வளர்ச்சிக்கு உகந்தது.`);
      } else if (Math.abs(temp - ((minT + maxT) / 2)) < 6) {
        score += 9;
      } else {
        score += 3;
      }
    } else {
      score += 10;
    }

    // 5. Water & Irrigation Match (15 pts)
    const waterAvail = (input.water_availability || '').toLowerCase();
    const cropWater = crop.water_requirement.toLowerCase();
    const irrigation = (input.irrigation_type || '').toLowerCase();

    if (
      (cropWater.includes('high') && (waterAvail.includes('high') || irrigation.includes('canal') || irrigation.includes('tube'))) ||
      (cropWater.includes('medium') && (waterAvail.includes('medium') || waterAvail.includes('high') || irrigation.includes('drip') || irrigation.includes('sprinkler'))) ||
      (cropWater.includes('low') && (waterAvail.includes('low') || waterAvail.includes('medium') || irrigation.includes('rainfed')))
    ) {
      score += 15;
      reasons.push(`Irrigation capacity matches water requirement (${crop.water_requirement} demand).`);
      reasonsTa.push(`பாசன வசதி மற்றும் நீர் தேவை (${crop.water_requirement}) சரியாகப் பொருந்துகிறது.`);
    } else {
      score += 7;
    }

    // 6. Crop Rotation / Previous Crop Benefit (10 pts)
    let rotationNote: string | undefined;
    let rotationNoteTa: string | undefined;
    if (input.previous_crop) {
      const prev = input.previous_crop.toLowerCase();
      const isGoodRotation = crop.rotation_compatibility.some((c) => prev.includes(c.toLowerCase()));
      if (isGoodRotation) {
        score += 10;
        rotationNote = `Great crop rotation after ${input.previous_crop}: Breaks pest cycles and revitalizes soil nitrogen.`;
        rotationNoteTa = `${input.previous_crop} பயிருக்கு பின் சுழற்சி முறையில் பயிரிடுவது பூச்சி தாக்குதலைக் குறைத்து மண் வளத்தை பெருக்கும்.`;
        reasons.push(rotationNote);
        reasonsTa.push(rotationNoteTa);
      } else if (crop.crop_name.toLowerCase().includes(prev)) {
        score -= 10; // Penalize mono-cropping same crop
        rotationNote = `Caution: Monocropping (${input.previous_crop} after ${input.previous_crop}) may elevate pest and disease risk.`;
        rotationNoteTa = `எச்சரிக்கை: ஒரே பயிரை மீண்டும் பயிரிடுவது நோய் தாக்குதல் அபாயத்தை அதிகரிக்கும்.`;
      }
    }

    const finalScore = Math.min(98, Math.max(25, score));
    const riskLevel: 'Low' | 'Moderate' | 'High' = finalScore >= 80 ? 'Low' : finalScore >= 60 ? 'Moderate' : 'High';

    return {
      ...crop,
      suitabilityScore: finalScore,
      riskLevel,
      expectedGrowingDuration: crop.growth_duration,
      waterRequirementLevel: crop.water_requirement as any,
      expectedYieldRange: crop.expected_yield,
      recommendedSowingPeriod: crop.sowing_window,
      recommendedSowingPeriodTa: crop.sowing_window_ta,
      reasons,
      reasonsTa,
      rotationNote,
      rotationNoteTa,
    };
  });

  return scoredCrops.sort((a, b) => b.suitabilityScore - a.suitabilityScore);
}
