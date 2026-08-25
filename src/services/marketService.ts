export type MarketPriceItem = {
  id: string;
  crop_name: string;
  crop_name_ta?: string;
  category: 'Cereals' | 'Pulses' | 'Cash Crops' | 'Vegetables' | 'Fruits' | 'Oilseeds' | 'Spices';
  market_name: string;
  district: string;
  state: string;
  current_price: number; // in INR per quintal (100 kg)
  previous_price: number;
  min_price: number;
  max_price: number;
  price_trend: 'Up' | 'Down' | 'Stable';
  price_change_pct: number;
  msp_price?: number; // Minimum Support Price benchmark
  updated_date: string;
};

export const MASTER_MARKET_PRICES: MarketPriceItem[] = [
  // --- PADDY / RICE ---
  {
    id: 'mkt-paddy-thanjavur',
    crop_name: 'Paddy (Rice) Grade A',
    crop_name_ta: 'நெல் (கிரேடு A)',
    category: 'Cereals',
    market_name: 'Thanjavur DPC Regulated Market',
    district: 'Thanjavur',
    state: 'Tamil Nadu',
    current_price: 2320,
    previous_price: 2280,
    min_price: 2200,
    max_price: 2450,
    price_trend: 'Up',
    price_change_pct: 1.75,
    msp_price: 2300,
    updated_date: new Date().toISOString(),
  },
  {
    id: 'mkt-paddy-madurai',
    crop_name: 'Paddy (Rice) Common',
    crop_name_ta: 'நெல் (சாதாரண ரகம்)',
    category: 'Cereals',
    market_name: 'Madurai APMC Market',
    district: 'Madurai',
    state: 'Tamil Nadu',
    current_price: 2250,
    previous_price: 2260,
    min_price: 2150,
    max_price: 2350,
    price_trend: 'Down',
    price_change_pct: -0.44,
    msp_price: 2203,
    updated_date: new Date().toISOString(),
  },
  {
    id: 'mkt-paddy-karnal',
    crop_name: 'Basmati Rice (Pusa 1121)',
    crop_name_ta: 'பாசுமதி அரிசி (Pusa 1121)',
    category: 'Cereals',
    market_name: 'Karnal Grain Market',
    district: 'Karnal',
    state: 'Haryana',
    current_price: 4650,
    previous_price: 4500,
    min_price: 4200,
    max_price: 4900,
    price_trend: 'Up',
    price_change_pct: 3.33,
    msp_price: 0,
    updated_date: new Date().toISOString(),
  },

  // --- COTTON ---
  {
    id: 'mkt-cotton-rajkot',
    crop_name: 'Cotton (Medium Staple)',
    crop_name_ta: 'பருத்தி (Cotton)',
    category: 'Cash Crops',
    market_name: 'Rajkot Main Yard',
    district: 'Rajkot',
    state: 'Gujarat',
    current_price: 7450,
    previous_price: 7300,
    min_price: 7100,
    max_price: 7800,
    price_trend: 'Up',
    price_change_pct: 2.05,
    msp_price: 7121,
    updated_date: new Date().toISOString(),
  },
  {
    id: 'mkt-cotton-guntur',
    crop_name: 'Cotton (Long Staple)',
    crop_name_ta: 'பருத்தி (நீண்ட இழை)',
    category: 'Cash Crops',
    market_name: 'Guntur Commercial Market',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    current_price: 7600,
    previous_price: 7650,
    min_price: 7300,
    max_price: 7950,
    price_trend: 'Down',
    price_change_pct: -0.65,
    msp_price: 7521,
    updated_date: new Date().toISOString(),
  },

  // --- SUGARCANE ---
  {
    id: 'mkt-sug-erode',
    crop_name: 'Sugarcane (Crushing)',
    crop_name_ta: 'கரும்பு (அரவை கரும்பு)',
    category: 'Cash Crops',
    market_name: 'Erode Cooperative Sugar Mill',
    district: 'Erode',
    state: 'Tamil Nadu',
    current_price: 340, // per quintal (FRP rate)
    previous_price: 340,
    min_price: 330,
    max_price: 360,
    price_trend: 'Stable',
    price_change_pct: 0,
    msp_price: 340,
    updated_date: new Date().toISOString(),
  },

  // --- TOMATO ---
  {
    id: 'mkt-tom-kolar',
    crop_name: 'Tomato (Hybrid Red)',
    crop_name_ta: 'தக்காளி (Tomato)',
    category: 'Vegetables',
    market_name: 'Kolar APMC Mandi',
    district: 'Kolar',
    state: 'Karnataka',
    current_price: 2100,
    previous_price: 1850,
    min_price: 1500,
    max_price: 2600,
    price_trend: 'Up',
    price_change_pct: 13.51,
    msp_price: 0,
    updated_date: new Date().toISOString(),
  },
  {
    id: 'mkt-tom-koyambedu',
    crop_name: 'Tomato (Local Country)',
    crop_name_ta: 'நாட்டுத் தக்காளி',
    category: 'Vegetables',
    market_name: 'Koyambedu Wholesale Market',
    district: 'Chennai',
    state: 'Tamil Nadu',
    current_price: 2400,
    previous_price: 2200,
    min_price: 1900,
    max_price: 2800,
    price_trend: 'Up',
    price_change_pct: 9.09,
    msp_price: 0,
    updated_date: new Date().toISOString(),
  },

  // --- CHILLI ---
  {
    id: 'mkt-chl-guntur',
    crop_name: 'Red Chilli (Teja Variety)',
    crop_name_ta: 'சிவப்பு மிளகாய் (தேஜா ரகம்)',
    category: 'Spices',
    market_name: 'Guntur Asia Largest Chilli Yard',
    district: 'Guntur',
    state: 'Andhra Pradesh',
    current_price: 18500,
    previous_price: 18000,
    min_price: 16500,
    max_price: 21000,
    price_trend: 'Up',
    price_change_pct: 2.78,
    msp_price: 0,
    updated_date: new Date().toISOString(),
  },

  // --- ONION ---
  {
    id: 'mkt-on-lasalgaon',
    crop_name: 'Onion (Red Nashik)',
    crop_name_ta: 'வெங்காயம் (நாசிக் சிவப்பு)',
    category: 'Vegetables',
    market_name: 'Lasalgaon APMC (Asia Largest)',
    district: 'Nashik',
    state: 'Maharashtra',
    current_price: 1950,
    previous_price: 2100,
    min_price: 1400,
    max_price: 2400,
    price_trend: 'Down',
    price_change_pct: -7.14,
    msp_price: 0,
    updated_date: new Date().toISOString(),
  },

  // --- COCONUT ---
  {
    id: 'mkt-coc-pollachi',
    crop_name: 'Coconut (Raw Dehusked)',
    crop_name_ta: 'மட்டை உரிக்காத தேங்காய் (Pollachi)',
    category: 'Fruits',
    market_name: 'Pollachi Regulated Market',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    current_price: 3100, // per 1000 nuts or quintal equivalent
    previous_price: 2950,
    min_price: 2700,
    max_price: 3400,
    price_trend: 'Up',
    price_change_pct: 5.08,
    msp_price: 0,
    updated_date: new Date().toISOString(),
  },

  // --- BANANA ---
  {
    id: 'mkt-ban-trichy',
    crop_name: 'Banana (Grand Naine / G9)',
    crop_name_ta: 'வாழைத்தார் (G9 ரகம்)',
    category: 'Fruits',
    market_name: 'Tiruchirappalli Gandhi Market',
    district: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    current_price: 1800,
    previous_price: 1750,
    min_price: 1400,
    max_price: 2200,
    price_trend: 'Up',
    price_change_pct: 2.86,
    msp_price: 0,
    updated_date: new Date().toISOString(),
  },

  // --- WHEAT ---
  {
    id: 'mkt-wht-khanna',
    crop_name: 'Wheat (Mill Quality)',
    crop_name_ta: 'கோதுமை (மில் தரம்)',
    category: 'Cereals',
    market_name: 'Khanna Mandi',
    district: 'Ludhiana',
    state: 'Punjab',
    current_price: 2420,
    previous_price: 2400,
    min_price: 2350,
    max_price: 2550,
    price_trend: 'Up',
    price_change_pct: 0.83,
    msp_price: 2275,
    updated_date: new Date().toISOString(),
  },

  // --- GROUNDNUT ---
  {
    id: 'mkt-grn-tindivanam',
    crop_name: 'Groundnut (Pods)',
    crop_name_ta: 'நிலக்கடலை காய் (Groundnut Pods)',
    category: 'Oilseeds',
    market_name: 'Tindivanam Regulated Market',
    district: 'Villupuram',
    state: 'Tamil Nadu',
    current_price: 6850,
    previous_price: 6700,
    min_price: 6300,
    max_price: 7300,
    price_trend: 'Up',
    price_change_pct: 2.24,
    msp_price: 6783,
    updated_date: new Date().toISOString(),
  },

  // --- MAIZE ---
  {
    id: 'mkt-mze-davangere',
    crop_name: 'Maize (Yellow Hybrid)',
    crop_name_ta: 'மஞ்சள் மக்காச்சோளம் (Maize)',
    category: 'Cereals',
    market_name: 'Davangere APMC Yard',
    district: 'Davangere',
    state: 'Karnataka',
    current_price: 2280,
    previous_price: 2310,
    min_price: 2100,
    max_price: 2450,
    price_trend: 'Down',
    price_change_pct: -1.3,
    msp_price: 2090,
    updated_date: new Date().toISOString(),
  },
];

export function calculateHarvestProfit(params: {
  quintals: number;
  pricePerQuintal: number;
  productionCostTotal?: number;
  transportPerQuintal?: number;
}) {
  const grossRevenue = params.quintals * params.pricePerQuintal;
  const transportCost = (params.transportPerQuintal || 60) * params.quintals;
  const mandiFee = Math.round(grossRevenue * 0.015); // ~1.5% APMC market cess
  const productionCost = params.productionCostTotal || (grossRevenue * 0.45); // estimated 45% farm input cost
  const totalCost = productionCost + transportCost + mandiFee;
  const netProfit = grossRevenue - totalCost;
  const roiPercentage = Math.round((netProfit / (totalCost || 1)) * 100);

  return {
    grossRevenue,
    transportCost,
    mandiFee,
    productionCost,
    totalCost,
    netProfit,
    roiPercentage,
  };
}
