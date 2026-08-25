import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, User, Sparkles, Trash2, Bug, FlaskConical, TrendingUp, Award, Globe } from 'lucide-react';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useToast } from '../context/ToastContext';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

const categorizedQuestions = [
  {
    category: 'Disease & Pests',
    icon: Bug,
    questions: [
      { en: 'How to cure Rice Blast and Neck Blast organically?', ta: 'நெல் குலை நோயை இயற்கை முறையில் கட்டுப்படுத்துவது எப்படி?' },
      { en: 'What is the treatment for Fall Armyworm in Maize?', ta: 'மக்காச்சோள படைப்புழுவுக்கு என்ன மருந்து தெளிக்க வேண்டும்?' },
      { en: 'How to prevent Tomato Early Blight and leaf curl?', ta: 'தக்காளி இலைச்சுருட்டு நோய்க்கு என்ன தீர்வு?' },
      { en: 'Treatment for Coconut Rhinoceros Beetle and Thanjavur Wilt', ta: 'தென்னை காண்டாமிருக வண்டு மற்றும் தஞ்சாவூர் வாடல் நோய்க்கு தீர்வு' },
    ],
  },
  {
    category: 'Fertilizers & Soil',
    icon: FlaskConical,
    questions: [
      { en: 'How many bags of Urea and DAP needed for 5 acres of Paddy?', ta: '5 ஏக்கர் நெல் சாகுபடிக்கு எத்தனை மூட்டை யூரியா, DAP தேவை?' },
      { en: 'What are the best organic substitutes for chemical Potash?', ta: 'இரசாயன பொட்டாஷுக்கு சிறந்த இயற்கை மாற்று எது?' },
      { en: 'How to correct acidic soil with pH below 5.5?', ta: 'அமிலத் தன்மை கொண்ட மண்ணை எவ்வாறு சமநிலைப்படுத்துவது?' },
      { en: 'What is the 4-stage split application schedule for crops?', ta: 'பயிர்களுக்கு 4-கட்ட உரமிடும் அட்டவணை என்ன?' },
    ],
  },
  {
    category: 'Mandi Prices & Markets',
    icon: TrendingUp,
    questions: [
      { en: 'What is the current Paddy Grade A MSP rate in Tamil Nadu?', ta: 'தமிழ்நாட்டில் நெல் கிரேடு A குறைந்தபட்ச ஆதரவு விலை (MSP) என்ன?' },
      { en: 'Which Mandi offers the highest price for Cotton and Red Chilli?', ta: 'பருத்தி மற்றும் மிளகாய்க்கு அதிக விலை தரும் மார்க்கெட் எது?' },
      { en: 'How is net profit calculated on 50 quintals of harvest?', ta: '50 குவிண்டால் மகசூலில் நிகர லாபம் எவ்வாறு கணக்கிடப்படுகிறது?' },
    ],
  },
  {
    category: 'Govt Schemes & Subsidies',
    icon: Award,
    questions: [
      { en: 'How to apply for 100% / 55% Drip Irrigation Subsidy under PMKSY?', ta: 'சொட்டு நீர் பாசன மானியம் (PMKSY) பெறுவது எப்படி?' },
      { en: 'What are the benefits of PM-KISAN and Kisan Credit Card (KCC)?', ta: 'PM-KISAN ₹6000 மற்றும் கிசான் கிரெடிட் கார்டு நன்மைகள் என்ன?' },
      { en: 'How to get free Soil Health Card testing from Agriculture Dept?', ta: 'இலவச மண் பரிசோதனை அட்டை பெறுவது எப்படி?' },
    ],
  },
];

const knowledgeBase: Record<string, string> = {
  'rice blast': `🌾 **Rice Blast Treatment & Organic Management:**
1. **Chemical Treatment:** Spray Tricyclazole 75% WP @ 0.6g/L (120g/acre) or Isoprothiolane 40% EC @ 1.5ml/L at early boot leaf stage.
2. **100% Organic Solution:** Foliar spray of 5% Neem Seed Kernel Extract (NSKE) or Pseudomonas fluorescens @ 5g/L + 2L Panchagavya per acre.
3. **Cultural Practice:** Reduce excessive Urea application during cloudy/misty weather. Maintain proper field drainage.`,

  'fall armyworm': `🌽 **Fall Armyworm (FAW) in Maize Control:**
1. **Immediate Spray:** Apply Chlorantraniliprole 18.5% SC @ 0.4ml/L (60ml/acre) or Emamectin Benzoate 5% SG @ 0.4g/L directed straight into central plant whorls.
2. **Organic/Natural Method:** Drop dry sand mixed with neem cake powder (9:1 ratio) directly into central whorls (5-10g per plant).
3. **Biological Control:** Release Trichogramma egg parasitoids @ 20,000/acre at seedling stage.`,

  'urea dap': `🧪 **Fertilizer Calculation for 5 Acres of Paddy:**
- **Urea (46% N):** 10 bags of 50kg (Total: 500kg) applied in 3 splits (Basal 2 bags, Tillering 5 bags, Panicle 3 bags). Cost ~₹2,680.
- **DAP (18:46:0):** 5 bags of 50kg (Total: 250kg) applied 100% as basal during final land preparation. Cost ~₹6,750.
- **MOP (Potash 60%):** 4 bags of 50kg (Total: 200kg) applied in 2 splits. Cost ~₹6,600.
- **Total Fertilizer Budget:** Approx ₹16,030 for 5 acres.`,

  'organic substitute': `🍃 **Organic Substitutes for Chemical Potash:**
1. **Wood Ash (சாம்பல் உரம்):** Rich in soluble potassium carbonate (contains 5-10% K2O). Apply 200-300kg/acre.
2. **Potash Mobilizing Bacteria (KRB - Frateuria aurantia):** Inoculate soil with 2kg/acre enriched in 500kg farm compost.
3. **Banana Pseudostem Sap / Compost:** Outstanding natural source of organic potassium.`,

  'msp rate': `📈 **Paddy MSP Benchmark & Mandi Rates (2024-2025):**
- **Paddy Grade A (Fine):** ₹2,320 per quintal (MSP ₹2,300 + ₹20 TN state incentive).
- **Paddy Common:** ₹2,250 per quintal (MSP ₹2,203).
- **Top Paying Mandis:** Thanjavur Direct Purchase Centers (DPCs), Madurai APMC, Tiruchirappalli.`,

  'drip irrigation': `💧 **PMKSY Drip Irrigation Subsidy Details:**
- **Small & Marginal Farmers (<5 Acres):** Eligible for **100% Subsidy in Tamil Nadu** (and up to 75-90% in other states).
- **Other / Large Farmers (>5 Acres):** Eligible for **75% Subsidy**.
- **Required Documents:** Chitta / Patta copy, FMB sketch, Aadhaar card, Bank passbook, Soil & Water test report.
- **Application Portal:** Apply online at your state Agri Engineering / Horticulture portal (e.g. tnhorticulture.tn.gov.in).`,

  'pm-kisan': `🏛️ **PM-KISAN & Kisan Credit Card (KCC) Scheme:**
- **PM-KISAN:** ₹6,000 per year directly transferred to bank account in 3 equal installments of ₹2,000 every 4 months.
- **Kisan Credit Card (KCC):** Crop loans up to ₹3,00,000 at a subsidized interest rate of just **4% per annum** (with 3% prompt repayment incentive). No collateral required up to ₹1.60 Lakhs!`,
};

function getAIResponse(query: string): string {
  const q = query.toLowerCase();
  for (const [key, answer] of Object.entries(knowledgeBase)) {
    const words = key.split(' ');
    if (words.some((w) => q.includes(w))) {
      return answer;
    }
  }

  return `🌿 **Smart Farming AI Advisor:**
Thank you for your question about *"**${query}**"*.

Based on agricultural university guidelines:
1. **Soil & Climate:** Ensure soil pH is tested between 6.0 - 7.5 and adequate organic carbon (>0.75%) is maintained.
2. **Crop Nutrition:** Follow the 4-stage split application (Basal, Tillering, Flowering, Fruit filling).
3. **Integrated Pest Management (IPM):** Combine biological bio-agents (Trichoderma, Pseudomonas, Neem oil) with targeted micro-doses of recommended treatments.

For instant disease diagnosis, please explore the **Crop Diseases** module, or check live APMC market rates in the **Market Prices** section!`;
}

export default function AIAssistant() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [lang, setLang] = useState<'en' | 'ta'>('en');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const handleSend = (text?: string) => {
    const query = text || input.trim();
    if (!query) return;
    const userMsg: Message = { role: 'user', content: query, timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = getAIResponse(query);
      const aiMsg: Message = { role: 'assistant', content: response, timestamp: new Date().toISOString() };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 1000);
  };

  const handleClear = () => {
    setMessages([]);
    showToast('Conversation cleared', 'info');
  };

  return (
    <div className="pb-16">
      <PageHeader
        title="AI Agricultural Extension Assistant"
        subtitle="Instant multilingual expert guidance on crop pathology, organic remedies, fertilizer dosages, and government subsidies"
        icon={<Bot className="w-6 h-6" />}
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs font-bold text-primary-600"
            >
              <Globe className="w-3.5 h-3.5" /> {lang === 'en' ? 'Switch to தமிழ்' : 'English Mode'}
            </button>
            {messages.length > 0 && (
              <Button variant="ghost" onClick={handleClear} icon={<Trash2 className="w-4 h-4" />}>
                Clear
              </Button>
            )}
          </div>
        }
      />

      <Card className="flex flex-col h-[650px] shadow-xl border border-slate-200 dark:border-slate-700">
        {/* Messages View */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center text-white mb-3 shadow-lg shadow-primary-500/20">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                {lang === 'en' ? 'Ask Your AI Farming Specialist' : 'வேளாண் AI உதவியாளரிடம் கேளுங்கள்'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mt-1">
                {lang === 'en'
                  ? 'Ask about any crop disease, organic recipe, fertilizer dose calculation, or mandi rate.'
                  : 'பயிர் நோய்கள், இயற்கை மருந்துகள், உர அளவு அல்லது மார்க்கெட் விலைகள் பற்றி கேட்கலாம்.'}
              </p>

              {/* Categorized Question Chips */}
              <div className="grid sm:grid-cols-2 gap-3 mt-6 max-w-3xl w-full text-left">
                {categorizedQuestions.map((group) => (
                  <div key={group.category} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-primary-600">
                      <group.icon className="w-4 h-4" /> {group.category}
                    </div>
                    <div className="space-y-1.5">
                      {group.questions.map((q, idx) => {
                        const label = lang === 'en' ? q.en : q.ta;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleSend(q.en)}
                            className="w-full text-left p-2 rounded-xl bg-white dark:bg-slate-700/60 hover:bg-primary-50 dark:hover:bg-slate-700 text-xs text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-600 transition-colors line-clamp-1"
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    msg.role === 'user'
                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600'
                      : 'bg-gradient-to-br from-primary-500 to-emerald-600 text-white shadow-md'
                  }`}
                >
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-5 py-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary-600 text-white rounded-tr-none'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-3 flex gap-1.5 border border-slate-200 dark:border-slate-700">
                {[0, 0.2, 0.4].map((delay) => (
                  <motion.div
                    key={delay}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay }}
                    className="w-2 h-2 rounded-full bg-primary-500"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Bar */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50/50 dark:bg-slate-800/40">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={lang === 'en' ? 'Ask about crop diseases, remedies, fertilizers, subsidies...' : 'விவசாயம் பற்றிய கேள்விகளை தட்டச்சு செய்யவும்...'}
              className="input-field flex-1 text-sm"
            />
            <Button onClick={() => handleSend()} disabled={!input.trim()} icon={<Send className="w-4 h-4" />}>
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
