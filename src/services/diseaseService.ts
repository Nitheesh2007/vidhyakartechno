export type DiseaseItem = {
  id: string;
  crop_name: string;
  crop_name_ta?: string;
  disease_name: string;
  disease_name_ta?: string;
  scientific_name?: string;
  pathogen_type: 'Fungal' | 'Bacterial' | 'Viral' | 'Insect Pest' | 'Nematode' | 'Deficiency';
  severity: 'Critical' | 'High' | 'Moderate' | 'Low';
  affected_parts: ('Leaves' | 'Stem' | 'Root' | 'Fruit/Grain' | 'Whole Plant' | 'Flower')[];
  estimated_yield_loss: string;
  weather_triggers: string;
  symptoms: string;
  symptoms_ta?: string;
  causes: string;
  prevention: string;
  treatment: string;
  organic_solution: string;
  chemical_dosage: string;
  organic_dosage: string;
  safety_waiting_period_days: number;
  image_url: string;
  season?: string;
};

export const MASTER_DISEASES: DiseaseItem[] = [
  // --- PADDY / RICE ---
  {
    id: 'dis-rice-1',
    crop_name: 'Paddy (Rice)',
    crop_name_ta: 'நெல் (Paddy)',
    disease_name: 'Rice Blast (Magnaporthe oryzae)',
    disease_name_ta: 'நெல் குலை நோய் (Rice Blast)',
    scientific_name: 'Magnaporthe oryzae',
    pathogen_type: 'Fungal',
    severity: 'Critical',
    affected_parts: ['Leaves', 'Stem', 'Fruit/Grain'],
    estimated_yield_loss: '30% - 70%',
    weather_triggers: 'High humidity (>90%), cloudy weather, night temp 18-24°C, excess Nitrogen fertilizer.',
    symptoms: 'Spindle-shaped elliptical spots with grey/white centers and dark brown margins on leaves. In severe cases, lesions coalesce and kill entire leaves (Neck blast causes panicle breakdown).',
    symptoms_ta: 'இலைகளில் கண் வடிவ அல்லது படகு வடிவ புள்ளிகள், மையத்தில் சாம்பல் நிறமாகவும் ஓரங்களில் பழுப்பு நிறமாகவும் காணப்படும். கதிர் கழுத்துப் பகுதியில் தாக்கி கதிர்கள் உடைந்துவிடும்.',
    causes: 'Air-borne fungal spores spreading rapidly during humid cloudy periods, exacerbated by high application of Urea.',
    prevention: 'Treat seeds with Carbendazim 2g/kg or Trichoderma viride 10g/kg. Avoid excess nitrogenous fertilizers. Maintain proper field spacing.',
    treatment: 'Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L at early boot leaf stage.',
    organic_solution: 'Foliar spray of 5% Neem Seed Kernel Extract (NSKE) or Pseudomonas fluorescens @ 5g/L + Panchagavya 3% at 10-day intervals.',
    chemical_dosage: 'Tricyclazole 75 WP: 120g in 200L water per acre',
    organic_dosage: 'Pseudomonas fluorescens: 1kg in 200L water + 2L Panchagavya per acre',
    safety_waiting_period_days: 14,
    image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    season: 'Monsoon Season',
  },
  {
    id: 'dis-rice-2',
    crop_name: 'Paddy (Rice)',
    crop_name_ta: 'நெல் (Paddy)',
    disease_name: 'Bacterial Leaf Blight (BLB)',
    disease_name_ta: 'பாக்டீரியா இலைக்கருகல் நோய் (BLB)',
    scientific_name: 'Xanthomonas oryzae pv. oryzae',
    pathogen_type: 'Bacterial',
    severity: 'High',
    affected_parts: ['Leaves', 'Whole Plant'],
    estimated_yield_loss: '20% - 50%',
    weather_triggers: 'Strong winds, cyclones, rainstorms, temperature 25-34°C, high humidity.',
    symptoms: 'Water-soaked translucent stripes starting from leaf tips and margins, turning yellowish-orange with wavy margins, drying into a bleached grey appearance (Kresek stage in seedlings).',
    symptoms_ta: 'இலையின் நுனியிலிருந்தும் ஓரங்களிலிருந்தும் அலை அலையான மஞ்சள் நிறக் கோடுகள் உருவாகி இலைகள் காய்ந்து வெளிறிவிடும்.',
    causes: 'Bacterium entering through leaf wounds made during strong winds or pest feeding; spread through irrigation water.',
    prevention: 'Clip seedling tips before transplanting. Use disease-free seeds. Drain standing water and allow soil to aerate during severe attack.',
    treatment: 'Spray Streptocycline 100ppm (18g) + Copper Oxychloride 500g in 200L water per acre.',
    organic_solution: 'Fresh cow dung extract spray (20kg cow dung soaked overnight, filtered, mixed with 200L water per acre) or Pseudomonas 1kg/acre.',
    chemical_dosage: 'Streptocycline 18g + Copper Oxychloride 500g in 200L water per acre',
    organic_dosage: 'Filtered Cow Dung Extract (10%) + 1L Sour Buttermilk per acre',
    safety_waiting_period_days: 10,
    image_url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    season: 'Monsoon Season',
  },
  {
    id: 'dis-rice-3',
    crop_name: 'Paddy (Rice)',
    crop_name_ta: 'நெல் (Paddy)',
    disease_name: 'Rice Yellow Stem Borer',
    disease_name_ta: 'நெல் குருத்துப்பூச்சி (Stem Borer)',
    scientific_name: 'Scirpophaga incertulas',
    pathogen_type: 'Insect Pest',
    severity: 'High',
    affected_parts: ['Stem', 'Fruit/Grain'],
    estimated_yield_loss: '25% - 60%',
    weather_triggers: 'Continuous cloudy weather, high humidity, warm temperature (20-30°C).',
    symptoms: 'Dead heart (drying of central tiller) in vegetative stage; White ear head (chaffy, upright white panicles with no grain filling) during flowering stage.',
    symptoms_ta: 'பயிரின் ஆரம்ப நிலையில் நடுக்குருத்து காய்ந்து ‘வெண்குருத்து’ உண்டாகும்; பூக்கும் பருவத்தில் மணிகள் இல்லாத ‘வெண்கதிர்’ தோன்றும்.',
    causes: 'Larvae hatch from egg masses covered with buff-coloured hair on leaf tips, bore inside leaf sheaths and central stems.',
    prevention: 'Clip leaf tips before transplanting to destroy egg masses. Set up Pheromone traps @ 5/acre. Release Trichogramma egg parasitoids.',
    treatment: 'Apply Cartap Hydrochloride 4G @ 10kg/acre or spray Chlorantraniliprole 18.5% SC @ 60ml in 200L water per acre.',
    organic_solution: 'Release Trichogramma japonicum @ 20,000/acre. Spray 5% Neem Seed Kernel Extract (NSKE) or Beauveria bassiana 1kg/acre.',
    chemical_dosage: 'Chlorantraniliprole 18.5% SC @ 60ml per 200L water per acre',
    organic_dosage: 'Neem Oil 10,000 ppm @ 3ml/L water with Khadi soap emulsifier',
    safety_waiting_period_days: 15,
    image_url: 'https://images.unsplash.com/photo-1599818816934-8c889f81643c?auto=format&fit=crop&w=800&q=80',
    season: 'All Seasons',
  },
  {
    id: 'dis-rice-4',
    crop_name: 'Paddy (Rice)',
    crop_name_ta: 'நெல் (Paddy)',
    disease_name: 'Brown Plant Hopper (BPH)',
    disease_name_ta: 'புகையான் பூச்சி (BPH)',
    scientific_name: 'Nilaparvata lugens',
    pathogen_type: 'Insect Pest',
    severity: 'Critical',
    affected_parts: ['Stem', 'Leaves', 'Whole Plant'],
    estimated_yield_loss: '50% - 90%',
    weather_triggers: 'Dense planting, high humidity, stagnant water, continuous cloudy weather.',
    symptoms: 'Circular patches of drying and yellowing in the field called "Hopper Burn", plants dry completely like burnt straw.',
    symptoms_ta: 'பயிர்கள் வட்ட வடிவில் காய்ந்து தீய்ந்தது போல் காணப்படும் (Hopper Burn). தூர்களில் அடியில் ஏராளமான சிறிய பூச்சிகள் மொய்க்கும்.',
    causes: 'Nymphs and adults congregate at base of tillers and suck plant sap, transmitting grassy stunt virus.',
    prevention: 'Form alleyways (1 foot opening every 8 feet). Avoid excessive nitrogen. Alternate wetting and drying of the field.',
    treatment: 'Spray Pymetrozine 50% WDG @ 120g/acre or Triflumezopyrim 10% SC @ 94ml/acre directed at the base of the plant.',
    organic_solution: 'Spray Neem oil 3000ppm @ 5ml/L directed strictly at tiller base; avoid spraying top leaves only.',
    chemical_dosage: 'Pymetrozine 50 WDG @ 120g per 200L water per acre directed at base',
    organic_dosage: '5% Neem Seed Extract + 0.5g detergent per litre directed at plant base',
    safety_waiting_period_days: 19,
    image_url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    season: 'Monsoon Season',
  },

  // --- TOMATO ---
  {
    id: 'dis-tom-1',
    crop_name: 'Tomato',
    crop_name_ta: 'தக்காளி (Tomato)',
    disease_name: 'Early Blight of Tomato',
    disease_name_ta: 'தக்காளி ஆரம்ப இலைக்கருகல் (Early Blight)',
    scientific_name: 'Alternaria solani',
    pathogen_type: 'Fungal',
    severity: 'High',
    affected_parts: ['Leaves', 'Stem', 'Fruit/Grain'],
    estimated_yield_loss: '30% - 50%',
    weather_triggers: 'Warm temperatures (24-29°C), frequent rains, heavy dew, humid conditions.',
    symptoms: 'Target-like concentric brown/black rings on older lower leaves. Surrounding tissue turns yellow, leading to defoliation and sunscald on fruits.',
    symptoms_ta: 'அடி இலைகளில் தட்டு வடிவிலான வளையங்கள் (Concentric rings) கொண்ட கரும்பழுப்பு புள்ளிகள் தோன்றி இலைகள் காய்ந்து உதிரும்.',
    causes: 'Soil-borne fungal spores splashed onto lower foliage by rain and irrigation drops.',
    prevention: 'Mulching with straw or black plastic. Prune lower leaves touching soil. 3-year crop rotation with non-solanaceous crops.',
    treatment: 'Spray Mancozeb 75% WP @ 2g/L or Azoxystrobin 23% SC @ 1ml/L at first appearance of spots.',
    organic_solution: 'Spray Trichoderma harzianum @ 5g/L + copper-based Bordeaux mixture 1% or baking soda (5g/L) spray.',
    chemical_dosage: 'Mancozeb 75 WP: 400g in 200L water per acre',
    organic_dosage: 'Bordeaux Mixture 1% (1kg Copper Sulphate + 1kg Quicklime in 100L water)',
    safety_waiting_period_days: 7,
    image_url: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&w=800&q=80',
    season: 'All Seasons',
  },
  {
    id: 'dis-tom-2',
    crop_name: 'Tomato',
    crop_name_ta: 'தக்காளி (Tomato)',
    disease_name: 'Tomato Leaf Curl Virus (ToLCV)',
    disease_name_ta: 'தக்காளி இலைச்சுருட்டு வைரஸ் (Leaf Curl)',
    scientific_name: 'Begomovirus',
    pathogen_type: 'Viral',
    severity: 'Critical',
    affected_parts: ['Leaves', 'Whole Plant', 'Flower'],
    estimated_yield_loss: '50% - 100%',
    weather_triggers: 'Dry warm weather favoring Whitefly (Bemisia tabaci) population explosion.',
    symptoms: 'Severe curling, puckering, crinkling and reduction in size of leaves. Stunted plant growth with bushy appearance; flowers drop without fruit set.',
    symptoms_ta: 'இலைகள் மேல்நோக்கி அல்லது கீழ்நோக்கி சுருண்டு, சிறுத்து, தடிப்பாக மாறும். செடி குட்டையாகி காய் பிடிக்காது.',
    causes: 'Transmitted exclusively by the insect vector Silverleaf Whitefly (Bemisia tabaci).',
    prevention: 'Install Yellow Sticky Traps @ 15-20 per acre. Grow maize or sorghum as border crop. Use virus-resistant hybrids.',
    treatment: 'Control whitefly vector: Spray Acetamiprid 20% SP @ 0.5g/L or Spiromesifen 22.9% SC @ 1ml/L.',
    organic_solution: 'Spray Neem oil 10,000 ppm @ 3ml/L + fish amino acid spray; spray Lecanicillium lecanii fungal bio-agent @ 5g/L.',
    chemical_dosage: 'Acetamiprid 20% SP @ 80g in 200L water per acre',
    organic_dosage: 'Neem Oil 10,000 ppm (600ml) + 1kg Verticillium lecanii in 200L water',
    safety_waiting_period_days: 10,
    image_url: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&w=800&q=80',
    season: 'Summer Season',
  },

  // --- COTTON ---
  {
    id: 'dis-cot-1',
    crop_name: 'Cotton',
    crop_name_ta: 'பருத்தி (Cotton)',
    disease_name: 'Cotton Pink Bollworm',
    disease_name_ta: 'பருத்தி இளஞ்சிவப்பு காய் புழு (Pink Bollworm)',
    scientific_name: 'Pectinophora gossypiella',
    pathogen_type: 'Insect Pest',
    severity: 'Critical',
    affected_parts: ['Fruit/Grain', 'Flower'],
    estimated_yield_loss: '30% - 80%',
    weather_triggers: 'Warm, humid weather during flowering and boll formation stages.',
    symptoms: 'Rosetted flowers that fail to open normally. Bolls show boreholes sealed with frass; inside seeds and lint are eaten and stained pink/brown.',
    symptoms_ta: 'பூக்கள் மலராமல் ரோஜா மொட்டு போல் மூடிக்கொள்ளும் (Rosetted flower). காய்களைத் துளைத்து பஞ்சையும் விதையையும் தின்று சேதப்படுத்தும்.',
    causes: 'Caterpillar bores into square buds and green bolls, feeding silently inside developing lint.',
    prevention: 'Install PB-Rope pheromone dispensers @ 80/acre. Monitor male moths with Delta Pheromone traps @ 5/acre.',
    treatment: 'Spray Emamectin Benzoate 5% SG @ 0.4g/L or Spinetoram 11.7% SC @ 1ml/L during peak squaring.',
    organic_solution: 'Spray Bacillus thuringiensis (Bt formulation) @ 2g/L or Neem seed extract (NSKE 5%) at 15-day intervals.',
    chemical_dosage: 'Emamectin Benzoate 5% SG: 80g in 200L water per acre',
    organic_dosage: 'Bacillus thuringiensis var. kurstaki @ 400g per 200L water per acre',
    safety_waiting_period_days: 14,
    image_url: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80',
    season: 'Monsoon Season',
  },

  // --- BANANA ---
  {
    id: 'dis-ban-1',
    crop_name: 'Banana',
    crop_name_ta: 'வாழை (Banana)',
    disease_name: 'Panama Wilt (Fusarium Wilt TR4)',
    disease_name_ta: 'வாழை பனாமா வாடல் நோய் (Fusarium Wilt)',
    scientific_name: 'Fusarium oxysporum f. sp. cubense',
    pathogen_type: 'Fungal',
    severity: 'Critical',
    affected_parts: ['Root', 'Stem', 'Whole Plant'],
    estimated_yield_loss: '60% - 100%',
    weather_triggers: 'Water-logged soil, acidic soils, continuous banana cultivation without rotation.',
    symptoms: 'Yellowing of lower leaf margins progressing inward, petiole collapses at pseudostem junction forming a skirt of dead leaves. Vascular strands show reddish-brown discoloration.',
    symptoms_ta: 'அடி இலைகளின் ஓரங்கள் மஞ்சள் நிறமாகி மட்டை ஒடிந்து தொங்கும். தண்டை குறுக்காக வெட்டினால் உள்பகுதியில் பழுப்பு நிற வளையங்கள் காணப்படும்.',
    causes: 'Soil-borne fungus surviving as chlamydospores in soil for 20+ years, entering through root nematodes or wounds.',
    prevention: 'Use tissue culture certified disease-free suckers. Apply lime to acidic soils (pH < 6.0). Dip suckers in Carbendazim 0.1% or Trichoderma.',
    treatment: 'Soil drenching with Carbendazim 2g/L or Propiconazole 1ml/L around root zone of infected and surrounding plants.',
    organic_solution: 'Apply Trichoderma viride (5kg) + Pseudomonas fluorescens (5kg) mixed in 500kg Farm Yard Manure + 50kg Neem cake per acre to root zone.',
    chemical_dosage: 'Carbendazim 50 WP: 2g/L water; drench 3-5 Litres per clump',
    organic_dosage: 'Trichoderma + Pseudomonas (10kg enriched FYM per pit before planting)',
    safety_waiting_period_days: 30,
    image_url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80',
    season: 'All Seasons',
  },
  {
    id: 'dis-ban-2',
    crop_name: 'Banana',
    crop_name_ta: 'வாழை (Banana)',
    disease_name: 'Sigatoka Leaf Spot',
    disease_name_ta: 'வாழை சிகடோகா இலைப்புள்ளி நோய்',
    scientific_name: 'Pseudocercospora musae',
    pathogen_type: 'Fungal',
    severity: 'High',
    affected_parts: ['Leaves'],
    estimated_yield_loss: '25% - 45%',
    weather_triggers: 'High humidity (>80%), frequent rains, warm temperature 23-28°C.',
    symptoms: 'Minute yellowish-green specks on leaf surface expanding into spindle-shaped brown streaks with dark borders and grey centers, causing premature drying of leaves and poor bunch filling.',
    symptoms_ta: 'இலைகளில் சிறிய மஞ்சள் கோடுகள் தோன்றி, பழுப்பு நிறமாக மாறி, நடுவில் சாம்பல் நிற மையத்தைக் கொண்டிருக்கும். இலைகள் முன்கூட்டியே காய்ந்துவிடும்.',
    causes: 'Air-borne fungal conidia and ascospores spread through rain splash and wind currents.',
    prevention: 'Maintain drainage and avoid water stagnation. Remove and burn heavily infected lower leaves. Maintain spacing of 6x6 ft.',
    treatment: 'Spray Propiconazole 25% EC @ 1ml/L or Mineral Oil (Banole) 1% mixed with systemic fungicide.',
    organic_solution: 'Foliar spray of Pseudomonas fluorescens @ 5g/L or 1% Bordeaux mixture on lower leaf surfaces.',
    chemical_dosage: 'Propiconazole 25% EC @ 200ml in 200L water + 1L agricultural mineral oil per acre',
    organic_dosage: 'Bordeaux Mixture 1% spray at 20-day intervals',
    safety_waiting_period_days: 21,
    image_url: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=800&q=80',
    season: 'Monsoon Season',
  },

  // --- SUGARCANE ---
  {
    id: 'dis-sug-1',
    crop_name: 'Sugarcane',
    crop_name_ta: 'கரும்பு (Sugarcane)',
    disease_name: 'Sugarcane Red Rot',
    disease_name_ta: 'கரும்பு செவ்வழுகல் நோய் (Red Rot)',
    scientific_name: 'Colletotrichum falcatum',
    pathogen_type: 'Fungal',
    severity: 'Critical',
    affected_parts: ['Stem', 'Leaves', 'Whole Plant'],
    estimated_yield_loss: '50% - 90%',
    weather_triggers: 'Waterlogged soils, high rainfall, high humidity, temperature 28-32°C.',
    symptoms: 'Third or fourth leaf from top shows yellowing and withering. Longitudinal splitting of cane stalk reveals red internal tissue with characteristic white horizontal transverse bands and alcohol odor.',
    symptoms_ta: 'மேலிருந்து 3-வது 4-வது இலைகள் மஞ்சளாகி காயும். கரும்பை பிளந்து பார்த்தால் உள்பகுதி சிவப்பாகவும், குறுக்கே வெள்ளை திட்டுகளுடனும் சாராய வாசனையுடன் காணப்படும்.',
    causes: 'Infected setts used as seed material; secondary spread by irrigation water and borers.',
    prevention: 'Moist Hot Air Treatment (MHAT) of seed setts at 54°C for 2.5 hours. Dip setts in Carbendazim 0.1% for 15 minutes before planting.',
    treatment: 'Rogue out and burn infected clumps. Drench surrounding root zones with Carbendazim 1g/L.',
    organic_solution: 'Sett treatment with Trichoderma harzianum @ 10g/L water + soil application of 5kg Trichoderma mixed in 500kg pressmud.',
    chemical_dosage: 'Sett dip in Carbendazim 50 WP @ 1g/L water for 20 minutes',
    organic_dosage: 'Trichoderma viride @ 5kg per acre mixed with organic compost during earthing up',
    safety_waiting_period_days: 30,
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    season: 'Monsoon Season',
  },

  // --- CHILLI ---
  {
    id: 'dis-chl-1',
    crop_name: 'Chilli',
    crop_name_ta: 'மிளகாய் (Chilli)',
    disease_name: 'Chilli Leaf Curl & Murda Complex',
    disease_name_ta: 'மிளகாய் இலைச்சுருட்டு மற்றும் முரணை நோய்',
    scientific_name: 'Thrips, Mites & Begomovirus complex',
    pathogen_type: 'Insect Pest',
    severity: 'High',
    affected_parts: ['Leaves', 'Flower', 'Fruit/Grain'],
    estimated_yield_loss: '35% - 70%',
    weather_triggers: 'Warm, dry weather promotes Thrips; humid warm weather promotes Yellow Mites.',
    symptoms: 'Upward curling of leaves indicates Thrips attack (boat-shaped); downward curling with thickening indicates Mites attack (inverted boat). Severe stunting and flower drop.',
    symptoms_ta: 'இலைகள் மேல்நோக்கி படகு போல் சுருண்டால் இலைப்பேன் (Thrips); கீழ்நோக்கி சுருண்டு தடித்தால் சிலந்தி (Mites) தாக்குதல். பூக்கள் உதிரும்.',
    causes: 'Sap-sucking pest complexes (Thrips palmi and Polyphagotarsonemus latus) damaging growing tips.',
    prevention: 'Set up Blue Sticky Traps for Thrips (10/acre) and Yellow Sticky Traps for Whiteflies (10/acre). Grow border crop of maize or castor.',
    treatment: 'For Thrips: Fipronil 5% SC @ 1.5ml/L or Spinetoram 11.7% SC @ 1ml/L. For Mites: Diafenthiuron 50% WP @ 1.2g/L.',
    organic_solution: 'Spray Agniastra / 5-leaf extract (Ainthilai Kashayam) @ 300ml in 10L water or Neem oil 10,000 ppm @ 3ml/L.',
    chemical_dosage: 'Diafenthiuron 50 WP: 250g in 200L water per acre',
    organic_dosage: 'Agniastra (Boiled neem, garlic, chilli, tobacco leaf extract) @ 3L in 200L water per acre',
    safety_waiting_period_days: 7,
    image_url: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80',
    season: 'All Seasons',
  },
  {
    id: 'dis-chl-2',
    crop_name: 'Chilli',
    crop_name_ta: 'மிளகாய் (Chilli)',
    disease_name: 'Anthracnose & Die-back (Fruit Rot)',
    disease_name_ta: 'மிளகாய் நுனிக் கருகல் மற்றும் பழ அழுகல் நோய்',
    scientific_name: 'Colletotrichum capsici',
    pathogen_type: 'Fungal',
    severity: 'High',
    affected_parts: ['Fruit/Grain', 'Stem'],
    estimated_yield_loss: '30% - 60%',
    weather_triggers: 'Continuous rains, humidity >80%, temperature 25-30°C during fruit ripening stage.',
    symptoms: 'Die-back from branch tips moving downwards. Circular sunken spots on ripe fruits with black concentric rings containing fungal fruiting bodies; fruits turn straw-colored and drop.',
    symptoms_ta: 'செடியின் கிளைகள் நுனியிலிருந்து கீழ்நோக்கி காய்ந்து வரும். பழுத்த மிளகாயில் வட்டமான குழிந்த கரும்புள்ளிகள் தோன்றி பழம் அழுகும்.',
    causes: 'Seed-borne and air-borne fungus spreading rapidly during morning dew and overhead sprinkler irrigation.',
    prevention: 'Seed treatment with Thiram or Captan @ 3g/kg. Avoid overhead sprinkler irrigation during fruiting.',
    treatment: 'Spray Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L or Mancozeb @ 2.5g/L at flowering.',
    organic_solution: 'Foliar spray of 10% ginger-garlic extract + 5% NSKE or Pseudomonas fluorescens @ 5g/L.',
    chemical_dosage: 'Azoxystrobin + Difenoconazole: 200ml in 200L water per acre',
    organic_dosage: 'Pseudomonas fluorescens @ 1kg + 2L Panchagavya in 200L water per acre',
    safety_waiting_period_days: 5,
    image_url: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=800&q=80',
    season: 'Monsoon Season',
  },

  // --- COCONUT ---
  {
    id: 'dis-coc-1',
    crop_name: 'Coconut',
    crop_name_ta: 'தென்னை (Coconut)',
    disease_name: 'Rhinoceros Beetle Infestation',
    disease_name_ta: 'தென்னை காண்டாமிருக வண்டு (Rhinoceros Beetle)',
    scientific_name: 'Oryctes rhinoceros',
    pathogen_type: 'Insect Pest',
    severity: 'High',
    affected_parts: ['Leaves', 'Stem'],
    estimated_yield_loss: '15% - 30%',
    weather_triggers: 'Year-round breeding in decomposing farmyard manure and rotting coconut trunks.',
    symptoms: 'V-shaped or triangular cuts on opened fronds. Boreholes at crown base with chewed fibrous frass.',
    symptoms_ta: 'விரியும் தென்னை மட்டைகளில் ஆங்கில எழுத்து ‘V’ வடிவிலான சமச்சீர் வெட்டுக்கள் காணப்படும். குருத்துப் பகுதியில் மரத்தூள் தள்ளியிருக்கும்.',
    causes: 'Adult beetle bores into unopened tender spear leaves and terminal spindle.',
    prevention: 'Treat FYM pits with Metarhizium anisopliae @ 4g/m3. Place Pheromone lure traps (Oryctalure) @ 1 trap per 2 acres.',
    treatment: 'Crown application of Naphthalene balls (3 balls of 3.5g each per palm) mixed with sand at top 2 leaf axils.',
    organic_solution: 'Fill topmost 3 leaf axils with mixture of Neem seed cake powder (100g) + sand (100g) or Phorate-free botanical repel balls.',
    chemical_dosage: 'Place 3 Naphthalene balls covered with fine sand in leaf axils at 45-day intervals',
    organic_dosage: 'Neem cake + Sand (1:1 ratio) 200g placed in innermost leaf axils',
    safety_waiting_period_days: 0,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    season: 'All Seasons',
  },
  {
    id: 'dis-coc-2',
    crop_name: 'Coconut',
    crop_name_ta: 'தென்னை (Coconut)',
    disease_name: 'Coconut Bud Rot & Basal Stem Rot (Thanjavur Wilt)',
    disease_name_ta: 'தென்னை தஞ்சாவூர் வாடல் நோய் (Thanjavur Wilt)',
    scientific_name: 'Ganoderma lucidum & Phytophthora',
    pathogen_type: 'Fungal',
    severity: 'Critical',
    affected_parts: ['Root', 'Stem', 'Leaves'],
    estimated_yield_loss: '70% - 100%',
    weather_triggers: 'Coastal and delta soils, water deficit in summer followed by heavy monsoon soaking.',
    symptoms: 'Brownish bleeding patches at tree base (up to 1-1.5m high). Outer leaves droop and wither; bracket-like Ganoderma fungal fruiting body emerges at base.',
    symptoms_ta: 'மரத்தின் அடிப்பகுதியில் பழுப்பு நிற திரவம் வழியும். வெளிப்புற மட்டைகள் காய்ந்து தொங்கும். அடிமரத்தில் காளான் போன்ற பொட்டுக்கள் தோன்றும்.',
    causes: 'Soil-inhabiting fungus attacking root xylem vessels; spreading through root contacts.',
    prevention: 'Dig isolation trenches (50cm wide, 1m deep) around infected trees. Apply 5kg Neem cake + 200g Trichoderma per palm annually.',
    treatment: 'Root feeding with Hexaconazole 2ml in 100ml water per tree at quarterly intervals + stem drench with Bordeaux paste.',
    organic_solution: 'Soil application of Trichoderma reesei / viride (200g) enriched in 50kg FYM and 5kg Neem cake around root basin.',
    chemical_dosage: 'Root feeding: Hexaconazole 5% EC (2ml in 100ml water in active live root) 3 times a year',
    organic_dosage: '200g Trichoderma + 5kg Neem Cake in root basin with copious irrigation',
    safety_waiting_period_days: 45,
    image_url: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80',
    season: 'All Seasons',
  },

  // --- WHEAT ---
  {
    id: 'dis-wht-1',
    crop_name: 'Wheat',
    crop_name_ta: 'கோதுமை (Wheat)',
    disease_name: 'Yellow (Stripe) Rust of Wheat',
    disease_name_ta: 'கோதுமை மஞ்சள் துரு நோய் (Stripe Rust)',
    scientific_name: 'Puccinia striiformis',
    pathogen_type: 'Fungal',
    severity: 'Critical',
    affected_parts: ['Leaves', 'Fruit/Grain'],
    estimated_yield_loss: '40% - 80%',
    weather_triggers: 'Cool, humid weather (10-15°C) with persistent morning dew in winter months.',
    symptoms: 'Bright yellow powdery pustules arranged in prominent parallel stripes along leaf veins. On touching, yellow rust powder sticks to fingers.',
    symptoms_ta: 'இலைகளில் நரம்புகளுக்கு இணையாக மஞ்சள் நிற கோடுகளாக துரு போன்ற துகள்கள் தோன்றும். விரலில் தொட்டால் மஞ்சள் தூள் ஒட்டும்.',
    causes: 'Wind-blown airborne urediniospores from sub-Himalayan hills spreading across plains.',
    prevention: 'Grow resistant varieties like HD-3086, DBW-187, DBW-222. Early sowing to escape peak fungal spore season.',
    treatment: 'Spray Propiconazole 25% EC (Tilt) @ 1ml/L or Tebuconazole 25.9% EC @ 1.25ml/L at first appearance of yellow stripes.',
    organic_solution: 'Foliar spray of 10% Cow urine + 5% Sour buttermilk extract at weekly intervals.',
    chemical_dosage: 'Propiconazole 25% EC: 200ml in 200L water per acre',
    organic_dosage: 'Sour Buttermilk (5L) + Fermented Cow Urine (5L) in 200L water per acre',
    safety_waiting_period_days: 25,
    image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    season: 'Winter Season',
  },

  // --- MAIZE / CORN ---
  {
    id: 'dis-mze-1',
    crop_name: 'Maize (Corn)',
    crop_name_ta: 'மக்காச்சோளம் (Maize)',
    disease_name: 'Fall Armyworm (FAW)',
    disease_name_ta: 'படைப்புழு தாக்குதல் (Fall Armyworm)',
    scientific_name: 'Spodoptera frugiperda',
    pathogen_type: 'Insect Pest',
    severity: 'Critical',
    affected_parts: ['Leaves', 'Stem', 'Fruit/Grain'],
    estimated_yield_loss: '30% - 70%',
    weather_triggers: 'Warm and humid spells during early seedling to whorl stage.',
    symptoms: 'Ragged, pinhole and shot-hole feeding on leaves. Heavy sawdust-like fecal pellets (frass) accumulated inside central whorl.',
    symptoms_ta: 'குருத்து இலைகளில் துளைகளும் சீரற்ற கிழிசல்களும் காணப்படும். குருத்தின் உள்ளே மரத்தூள் போன்ற எச்சங்கள் நிரம்பியிருக்கும்.',
    causes: 'Voracious nocturnal caterpillar feeding deep inside the plant whorl, safe from simple contact sprays.',
    prevention: 'Deep summer plowing. Intercrop with pulses (Cowpea/Desmodium). Set up FAW pheromone traps @ 5/acre.',
    treatment: 'Whorl application of Chlorantraniliprole 18.5% SC @ 0.4ml/L or Emamectin Benzoate 5% SG @ 0.4g/L directly into central whorls.',
    organic_solution: 'Drop dry sand mixed with neem cake (9:1) into central whorls. Spray Metarhizium rileyi or Bt kurstaki @ 2g/L.',
    chemical_dosage: 'Emamectin Benzoate 5% SG: 80g in 200L water per acre directed into whorls',
    organic_dosage: 'Dry Sand + Neem Cake mixture dropped into whorls (5-10g per plant)',
    safety_waiting_period_days: 14,
    image_url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
    season: 'All Seasons',
  },

  // --- GROUNDNUT ---
  {
    id: 'dis-grn-1',
    crop_name: 'Groundnut (Peanut)',
    crop_name_ta: 'நிலக்கடலை (Groundnut)',
    disease_name: 'Tikka Leaf Spot (Cercospora)',
    disease_name_ta: 'நிலக்கடலை டிக்கா இலைப்புள்ளி நோய்',
    scientific_name: 'Cercospora arachidicola & C. personata',
    pathogen_type: 'Fungal',
    severity: 'High',
    affected_parts: ['Leaves', 'Stem'],
    estimated_yield_loss: '20% - 50%',
    weather_triggers: 'Prolonged cloudy weather, high relative humidity (>85%), temp 25-30°C.',
    symptoms: 'Circular dark reddish-brown to black spots with prominent yellow chlorotic halos on upper leaf surfaces, causing severe premature leaf shedding.',
    symptoms_ta: 'இலைகளில் மஞ்சள் வளையத்துடன் கூடிய கரும்பழுப்பு வட்டப் புள்ளிகள் தோன்றி, இலைகள் உதிர்ந்து காய் திரட்சி குறையும்.',
    causes: 'Fungal pathogen surviving on crop debris and seed shells, airborne conidial spread.',
    prevention: 'Seed treatment with Trichoderma 10g/kg or Carbendazim 2g/kg. Crop rotation with cereals like Sorghum or Pearl Millet.',
    treatment: 'Spray Hexaconazole 5% EC @ 2ml/L or Mancozeb 75% WP @ 2g/L at 40 and 55 days after sowing.',
    organic_solution: 'Foliar spray of 5% NSKE or Pseudomonas fluorescens @ 5g/L + cow urine 5%.',
    chemical_dosage: 'Hexaconazole 5% EC @ 300ml in 200L water per acre',
    organic_dosage: 'Pseudomonas fluorescens 1kg + 5L Fermented Cow Urine in 200L water per acre',
    safety_waiting_period_days: 15,
    image_url: 'https://images.unsplash.com/photo-1568644396922-5c3bfae12521?auto=format&fit=crop&w=800&q=80',
    season: 'Monsoon Season',
  },

  // --- MANGO ---
  {
    id: 'dis-mgo-1',
    crop_name: 'Mango',
    crop_name_ta: 'மாமரம் (Mango)',
    disease_name: 'Mango Anthracnose & Powdery Mildew',
    disease_name_ta: 'மாமரம் பூங்கருகல் மற்றும் சாம்பல் நோய்',
    scientific_name: 'Colletotrichum gloeosporioides & Oidium mangiferae',
    pathogen_type: 'Fungal',
    severity: 'High',
    affected_parts: ['Flower', 'Leaves', 'Fruit/Grain'],
    estimated_yield_loss: '40% - 80%',
    weather_triggers: 'Unseasonal rains or heavy fog during flowering stage (Jan-March).',
    symptoms: 'White powdery coating on blossom panicles causing flower drop; black necrotic spots on leaves and tear-stain lesions on fruits.',
    symptoms_ta: 'பூங்கொத்துக்களில் வெள்ளை சாம்பல் போன்ற படலம் தோன்றி பூக்கள் உதிரும். காய்களில் கரும்புள்ளிகள் உருவாகும்.',
    causes: 'Spore germination stimulated by high humidity and dew during flowering.',
    prevention: 'Prune dead twigs and open canopy for sunlight. Spray Wettable Sulphur @ 2g/L before flowering.',
    treatment: 'Spray Hexaconazole 5% SC @ 1ml/L + Carbendazim @ 1g/L during panicle emergence and fruit set.',
    organic_solution: 'Spray Wettable Sulphur (80% WP) @ 2g/L or 3% Panchagavya + 5% Neem oil at flowering.',
    chemical_dosage: 'Hexaconazole 5% SC (200ml) + Carbendazim (200g) in 200L water',
    organic_dosage: 'Wettable Sulphur 80 WP @ 400g per 200L water per acre',
    safety_waiting_period_days: 15,
    image_url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    season: 'Summer Season',
  },

  // --- POTATO ---
  {
    id: 'dis-pot-1',
    crop_name: 'Potato',
    crop_name_ta: 'உருளைக்கிழங்கு (Potato)',
    disease_name: 'Late Blight of Potato',
    disease_name_ta: 'உருளைக்கிழங்கு பின்கருகல் நோய் (Late Blight)',
    scientific_name: 'Phytophthora infestans',
    pathogen_type: 'Fungal',
    severity: 'Critical',
    affected_parts: ['Leaves', 'Stem', 'Fruit/Grain'],
    estimated_yield_loss: '50% - 100%',
    weather_triggers: 'Cool, wet weather with continuous high humidity (>90%) and temp 12-20°C.',
    symptoms: 'Water-soaked irregular black/purplish lesions on leaf margins. White mildew on leaf undersides in morning. Tubers develop dry, granular reddish-brown rot.',
    symptoms_ta: 'இலைகளில் ஒழுங்கற்ற கரும்பழுப்பு கருகல் புள்ளிகள் தோன்றி, இலை அடியில் வெள்ளை பூஞ்சாண படலம் தெரியும். கிழங்கு அழுகும்.',
    causes: 'Rapidly mutating oomycete pathogen capable of destroying entire fields within 48-72 hours.',
    prevention: 'Use certified disease-free seed tubers. High earthing up to prevent zoospores reaching tubers. Plant resistant varieties.',
    treatment: 'Spray Cymoxanil 8% + Mancozeb 64% WP @ 2.5g/L or Dimethomorph 50% WP @ 1g/L immediately upon disease onset.',
    organic_solution: 'Preventive sprays of Copper Oxychloride @ 2.5g/L or Bordeaux mixture 1% before rainy spells.',
    chemical_dosage: 'Cymoxanil + Mancozeb: 500g in 200L water per acre',
    organic_dosage: 'Copper Oxychloride 50 WP: 500g in 200L water per acre',
    safety_waiting_period_days: 7,
    image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
    season: 'Winter Season',
  },

  // --- ONION ---
  {
    id: 'dis-on-1',
    crop_name: 'Onion',
    crop_name_ta: 'வெங்காயம் (Onion)',
    disease_name: 'Onion Purple Blotch & Stemphylium Blight',
    disease_name_ta: 'வெங்காயம் ஊதாக்கருகல் நோய் (Purple Blotch)',
    scientific_name: 'Alternaria porri',
    pathogen_type: 'Fungal',
    severity: 'High',
    affected_parts: ['Leaves', 'Stem'],
    estimated_yield_loss: '25% - 50%',
    weather_triggers: 'Warm, humid weather (25-30°C) with dew or frequent drizzle.',
    symptoms: 'Small water-soaked sunken lesions with purple to dark brownish centers, expanding rapidly into zonate bands and causing top leaves to snap and fall.',
    symptoms_ta: 'இலைகளில் ஊதா நிற மையத்துடன் கூடிய நீள்வட்டப் புள்ளிகள் தோன்றி, இலைகள் நடுவில் முறிந்து விழுந்துவிடும்.',
    causes: 'Fungal spores spread by wind and rain splash, favored by thrips feeding injuries.',
    prevention: 'Seed treatment with Thiram 3g/kg. Ensure good soil drainage and avoid over-watering.',
    treatment: 'Spray Difenoconazole 25% EC @ 1ml/L or Tebuconazole + Trifloxystrobin @ 0.7g/L.',
    organic_solution: 'Spray Trichoderma viride @ 5g/L + 5% Garlic-Chilli extract with sticker.',
    chemical_dosage: 'Difenoconazole 25% EC: 150ml in 200L water per acre with wetting agent',
    organic_dosage: 'Trichoderma viride 1kg + 500ml Agricultural Sticking Agent per acre',
    safety_waiting_period_days: 10,
    image_url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
    season: 'All Seasons',
  },

  // --- SOYBEAN ---
  {
    id: 'dis-soy-1',
    crop_name: 'Soybean',
    crop_name_ta: 'சோயாபீன் (Soybean)',
    disease_name: 'Asian Soybean Rust & Yellow Mosaic',
    disease_name_ta: 'சோயாபீன் துரு மற்றும் மஞ்சள் தேமல் நோய்',
    scientific_name: 'Phakopsora pachyrhizi',
    pathogen_type: 'Fungal',
    severity: 'High',
    affected_parts: ['Leaves', 'Whole Plant'],
    estimated_yield_loss: '30% - 60%',
    weather_triggers: 'Monsoon humidity (>80%) and temperatures between 20-28°C.',
    symptoms: 'Tiny brown pustules on leaf undersides causing rapid chlorosis and early defoliation; pod filling is drastically reduced.',
    symptoms_ta: 'இலைகளின் அடிப்பகுதியில் சிறிய பழுப்பு நிறப் புள்ளிகள் தோன்றி, இலைகள் மஞ்சளாகி உதிரும். காய்களில் மணி பிடிக்காது.',
    causes: 'Airborne rust spores capable of travelling hundreds of kilometers on wind currents.',
    prevention: 'Use tolerant varieties (JS-9560, JS-2034). Sowing with Rhizobium and Trichoderma seed inoculation.',
    treatment: 'Spray Hexaconazole 5% EC @ 2ml/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1ml/L.',
    organic_solution: 'Foliar spray of 5% Neem seed kernel extract + Pseudomonas fluorescens @ 5g/L.',
    chemical_dosage: 'Hexaconazole 5% EC @ 300ml per acre in 200L water',
    organic_dosage: 'Pseudomonas fluorescens 1kg + 1L Neem Oil per acre',
    safety_waiting_period_days: 15,
    image_url: 'https://images.unsplash.com/photo-1599818816934-8c889f81643c?auto=format&fit=crop&w=800&q=80',
    season: 'Monsoon Season',
  },

  // --- TEA ---
  {
    id: 'dis-tea-1',
    crop_name: 'Tea',
    crop_name_ta: 'தேயிலை (Tea)',
    disease_name: 'Tea Blister Blight & Red Spider Mite',
    disease_name_ta: 'தேயிலை குமிழ் நோய் மற்றும் சிவப்பு சிலந்தி',
    scientific_name: 'Exobasidium vexans & Oligonychus coffeae',
    pathogen_type: 'Fungal',
    severity: 'High',
    affected_parts: ['Leaves'],
    estimated_yield_loss: '20% - 40%',
    weather_triggers: 'Continuous overcast misty weather with relative humidity >80% and sunshine <3.5 hours/day.',
    symptoms: 'Translucent spots on tender young flush leaves forming circular blister-like depressions on upper side and white velvet cushions on lower side.',
    symptoms_ta: 'இளம் தேயிலைக் கொழுந்துகளில் குமிழ்கள் போன்ற வெளிறிய தடிப்புகள் தோன்றி சாம்பல் நிறமாக மாறும்.',
    causes: 'Air-borne basidiospores infecting newly harvested tender shoots and buds.',
    prevention: 'Prune shade trees before monsoon to allow direct sunlight penetration. Shorter plucking rounds.',
    treatment: 'Spray Copper Oxychloride 210g + Hexaconazole 100ml in 150L water per hectare at 5-7 day intervals.',
    organic_solution: 'Spray bio-control agent Bacillus subtilis @ 5g/L or 2% garlic-chilli extract.',
    chemical_dosage: 'Copper Oxychloride 50 WP (250g) in 150L water per acre',
    organic_dosage: 'Bacillus subtilis @ 500g in 150L water per acre',
    safety_waiting_period_days: 7,
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    season: 'Monsoon Season',
  },
];

// AI Diagnosis rule matcher
export type DiagnosisQuery = {
  crop_name?: string;
  affected_part?: 'Leaves' | 'Stem' | 'Root' | 'Fruit/Grain' | 'Whole Plant' | 'Flower';
  symptom_keyword?: string;
};

export type DiagnosisMatch = DiseaseItem & {
  matchScore: number;
  matchReasons: string[];
};

export function diagnoseDisease(query: DiagnosisQuery): DiagnosisMatch[] {
  return MASTER_DISEASES.map((dis) => {
    let score = 0;
    const reasons: string[] = [];

    // Crop match (40%)
    if (query.crop_name) {
      if (dis.crop_name.toLowerCase().includes(query.crop_name.toLowerCase())) {
        score += 40;
        reasons.push(`Direct crop match for ${dis.crop_name}`);
      }
    } else {
      score += 15; // default baseline if any crop
    }

    // Affected Part match (35%)
    if (query.affected_part) {
      if (dis.affected_parts.includes(query.affected_part)) {
        score += 35;
        reasons.push(`Symptoms specifically affect ${query.affected_part}`);
      }
    }

    // Symptom keyword match (25%)
    if (query.symptom_keyword) {
      const kw = query.symptom_keyword.toLowerCase();
      const inSymptoms = dis.symptoms.toLowerCase().includes(kw);
      const inCauses = dis.causes.toLowerCase().includes(kw);
      const inName = dis.disease_name.toLowerCase().includes(kw);

      if (inSymptoms || inName) {
        score += 25;
        reasons.push(`Matches characteristic keyword "${query.symptom_keyword}"`);
      } else if (inCauses) {
        score += 15;
        reasons.push(`Associated with cause terms "${query.symptom_keyword}"`);
      }
    }

    return {
      ...dis,
      matchScore: Math.min(100, score),
      matchReasons: reasons,
    };
  })
  .filter((d) => d.matchScore > 20)
  .sort((a, b) => b.matchScore - a.matchScore);
}
