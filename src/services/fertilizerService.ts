export type FertilizerItem = {
  id: string;
  fertilizer_name: string;
  fertilizer_name_ta?: string;
  type: 'Chemical' | 'Organic' | 'Bio-Fertilizer' | 'Micronutrient';
  npk_ratio?: string;
  suitable_crops: string[];
  soil_condition: string;
  standard_dose_per_acre: string;
  bags_per_acre_50kg: number;
  approx_cost_inr_per_bag: number;
  application_stage: 'Basal (Land Prep)' | 'Vegetative / Tillering' | 'Flowering / Panicle' | 'Fruit / Grain Filling' | 'All Stages';
  application_method: string;
  precautions: string;
  organic_alternative?: string;
  benefits: string[];
};

export const MASTER_FERTILIZERS: FertilizerItem[] = [
  {
    id: 'fert-urea',
    fertilizer_name: 'Urea (46% Nitrogen)',
    fertilizer_name_ta: 'யூரியா (Urea 46% N)',
    type: 'Chemical',
    npk_ratio: '46:0:0',
    suitable_crops: ['Paddy (Rice)', 'Wheat', 'Sugarcane', 'Maize', 'Cotton'],
    soil_condition: 'Nitrogen deficient soil / General top dressing',
    standard_dose_per_acre: '50 - 100 kg/acre (in 2-3 splits)',
    bags_per_acre_50kg: 2,
    approx_cost_inr_per_bag: 268,
    application_stage: 'Vegetative / Tillering',
    application_method: 'Broadcast evenly in moist soil (not standing flooded water); incorporate within 24 hours.',
    precautions: 'Do not apply in standing water or during high noon sun. Avoid touching plant foliage directly to prevent burn.',
    organic_alternative: 'Neem Cake (150kg/acre) or Azotobacter biofertilizer (2kg/acre)',
    benefits: ['Rapid vegetative growth', 'Vibrant green canopy', 'High protein synthesis in grain'],
  },
  {
    id: 'fert-dap',
    fertilizer_name: 'Di-Ammonium Phosphate (DAP 18:46:0)',
    fertilizer_name_ta: 'டி.ஏ.பி (DAP 18-46-0)',
    type: 'Chemical',
    npk_ratio: '18:46:0',
    suitable_crops: ['Paddy (Rice)', 'Wheat', 'Gram', 'Groundnut', 'Potato', 'Cotton'],
    soil_condition: 'Phosphorus deficient soil / Basal planting',
    standard_dose_per_acre: '50 kg/acre as basal dose',
    bags_per_acre_50kg: 1,
    approx_cost_inr_per_bag: 1350,
    application_stage: 'Basal (Land Prep)',
    application_method: 'Band placement 4-5 cm below and to the side of seed placement during sowing.',
    precautions: 'Never mix with lime or basic slags. Must be placed near root zone as phosphorus is immobile in soil.',
    organic_alternative: 'Rock Phosphate (100kg) + Phosphobacteria (PSB 2kg/acre)',
    benefits: ['Vigorous root establishment', 'Early seedling vigor', 'Sturdy plant anchorage'],
  },
  {
    id: 'fert-mop',
    fertilizer_name: 'Muriate of Potash (MOP 0:0:60)',
    fertilizer_name_ta: 'பொட்டாஷ் (MOP 0-0-60)',
    type: 'Chemical',
    npk_ratio: '0:0:60',
    suitable_crops: ['Paddy (Rice)', 'Banana', 'Sugarcane', 'Coconut', 'Potato', 'Tomato'],
    soil_condition: 'Potassium deficient soil / High yield crops',
    standard_dose_per_acre: '30 - 50 kg/acre',
    bags_per_acre_50kg: 1,
    approx_cost_inr_per_bag: 1650,
    application_stage: 'Flowering / Panicle',
    application_method: 'Apply 50% as basal and 50% during panicle initiation or fruit enlargement.',
    precautions: 'Do not use for chloride-sensitive crops like Tobacco or Grapes (use Potassium Sulphate instead).',
    organic_alternative: 'Potash Mobilizing Bacteria (Frateuria aurantia) + Wood ash (200kg)',
    benefits: ['Pest & disease resistance', 'Drought tolerance', 'Bold grain & heavy bunch weight'],
  },
  {
    id: 'fert-ssp',
    fertilizer_name: 'Single Super Phosphate (SSP 16% P2O5 + 11% Sulphur)',
    fertilizer_name_ta: 'சிங்கிள் சூப்பர் பாஸ்பேட் (SSP)',
    type: 'Chemical',
    npk_ratio: '0:16:0 + 11% S',
    suitable_crops: ['Groundnut', 'Mustard', 'Soybean', 'Pulses', 'Sunflower'],
    soil_condition: 'Sulphur & Phosphorus deficient oilseed soils',
    standard_dose_per_acre: '100 kg/acre',
    bags_per_acre_50kg: 2,
    approx_cost_inr_per_bag: 450,
    application_stage: 'Basal (Land Prep)',
    application_method: 'Incorporate thoroughly into soil during final ploughing before sowing.',
    precautions: 'Store in dry place to avoid clumping due to moisture absorption.',
    organic_alternative: 'Bone meal + Gypsum (100kg/acre)',
    benefits: ['High oil content in seeds', 'Nodule formation in legumes', 'High sulphur nutrition'],
  },
  {
    id: 'fert-vermi',
    fertilizer_name: 'Enriched Vermicompost (Earthworm Organic Manure)',
    fertilizer_name_ta: 'செறிவூட்டப்பட்ட மண்புழு உரம்',
    type: 'Organic',
    npk_ratio: '2.5:1.5:1.5 + Humic acid',
    suitable_crops: ['All Crops', 'Vegetables', 'Fruits', 'Flowers', 'Spices'],
    soil_condition: 'All soil types / Degraded low carbon soils',
    standard_dose_per_acre: '1000 - 2000 kg/acre',
    bags_per_acre_50kg: 20,
    approx_cost_inr_per_bag: 300,
    application_stage: 'Basal (Land Prep)',
    application_method: 'Spread across field during land preparation or in crop basin rings.',
    precautions: 'Keep shaded and moist; do not expose to direct scorching sunlight.',
    organic_alternative: 'Farmyard Manure (FYM 5 tonnes/acre)',
    benefits: ['Multiplies beneficial soil microbes', 'Increases soil water retention by 40%', 'Eliminates chemical soil salinity'],
  },
  {
    id: 'fert-neem-cake',
    fertilizer_name: 'Neem Cake (Azadirachtin enriched)',
    fertilizer_name_ta: 'வேப்பம் புண்ணாக்கு (Neem Cake)',
    type: 'Organic',
    npk_ratio: '5.2:1.0:1.4',
    suitable_crops: ['Paddy', 'Banana', 'Sugarcane', 'Cardamom', 'Vegetables'],
    soil_condition: 'Nematode-infested / High insect incidence soils',
    standard_dose_per_acre: '100 - 150 kg/acre',
    bags_per_acre_50kg: 3,
    approx_cost_inr_per_bag: 1200,
    application_stage: 'Basal (Land Prep)',
    application_method: 'Mix with soil during final land preparation or blend with Urea (1:5 ratio) for slow nitrogen release.',
    precautions: 'Incorporate well below soil surface for maximum nematode control efficacy.',
    organic_alternative: 'Castor cake or Karanja / Pongamia cake',
    benefits: ['Slow-release nitrogen inhibitor (saves 20% urea)', 'Controls soil nematodes & termites', 'Enhances earthworm population'],
  },
  {
    id: 'fert-zinc',
    fertilizer_name: 'Zinc Sulphate (ZnSO4 21% or 33%)',
    fertilizer_name_ta: 'ஜிங்க் சல்பேட் (துத்தநாக உரம்)',
    type: 'Micronutrient',
    npk_ratio: '21% Zn + 10% S',
    suitable_crops: ['Paddy (Rice)', 'Maize', 'Wheat', 'Citrus', 'Cotton'],
    soil_condition: 'Zinc deficient soil / Khaira disease prone soils',
    standard_dose_per_acre: '10 - 15 kg/acre (soil) or 0.5% foliar spray',
    bags_per_acre_50kg: 0.3,
    approx_cost_inr_per_bag: 1800,
    application_stage: 'Basal (Land Prep)',
    application_method: 'Broadcast with sand or FYM. For foliar: 5g/L + 2.5g lime (to prevent leaf scorching).',
    precautions: 'NEVER mix directly with DAP or SSP in fertilizer tank (forms insoluble Zinc Phosphate precipitate).',
    organic_alternative: 'Zinc Solubilizing Bacteria (ZSB 2kg/acre) + Compost',
    benefits: ['Cures Khaira disease & rusty bronze leaves', 'Boosts auxin synthesis', 'Improves grain weight'],
  },
  {
    id: 'fert-bio-rhizo',
    fertilizer_name: 'Rhizobium Biofertilizer (Nitrogen fixing)',
    fertilizer_name_ta: 'ரைசோபியம் உயிரி உரம்',
    type: 'Bio-Fertilizer',
    npk_ratio: 'Bio N-Fixer',
    suitable_crops: ['Groundnut', 'Blackgram', 'Greengram', 'Chickpea', 'Soybean'],
    soil_condition: 'Pulse & Legume fields',
    standard_dose_per_acre: '3 packets (600g) for seed treatment per acre',
    bags_per_acre_50kg: 0.02,
    approx_cost_inr_per_bag: 50,
    application_stage: 'Basal (Land Prep)',
    application_method: 'Mix with rice kanji / jaggery water and coat seeds 30 mins before sowing in shade.',
    precautions: 'Do not mix with chemical pesticides or bactericides. Use within expiry date.',
    organic_alternative: 'Azotobacter / Azospirillum for non-legume crops',
    benefits: ['Fixes 20-40 kg atmospheric Nitrogen/acre', 'Saves 25% chemical urea', 'Leaves residual fertility for next crop'],
  },
];

export function calculateFertilizerDose(acres: number, selectedFertilizerId: string) {
  const fert = MASTER_FERTILIZERS.find((f) => f.id === selectedFertilizerId);
  if (!fert) return null;

  const totalBags = Math.ceil(fert.bags_per_acre_50kg * acres);
  const totalKg = Math.round(fert.bags_per_acre_50kg * acres * 50);
  const estimatedCost = totalBags * fert.approx_cost_inr_per_bag;

  return {
    fertilizer: fert,
    acres,
    totalBags,
    totalKg,
    estimatedCost,
  };
}
