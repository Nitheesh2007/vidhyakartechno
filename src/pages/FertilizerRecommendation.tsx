import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FlaskConical, Search, Calculator, Beaker, Info, Leaf, CheckCircle2,
  Calendar, ArrowRight, ShieldCheck, Sparkles, DollarSign, Layers
} from 'lucide-react';
import { MASTER_FERTILIZERS, calculateFertilizerDose, type FertilizerItem } from '../services/fertilizerService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';

export default function FertilizerRecommendation() {
  const { profile } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [fertilizers] = useState<FertilizerItem[]>(MASTER_FERTILIZERS);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  // Acreage Dosage Calculator State
  const [calcAcres, setCalcAcres] = useState<number>(Number(profile?.farm_size) || 3);
  const [selectedFertId, setSelectedFertId] = useState<string>('fert-urea');
  const [activeTab, setActiveTab] = useState<'recommendations' | 'calculator' | 'schedule'>('recommendations');

  const types = ['All', 'Chemical', 'Organic', 'Bio-Fertilizer', 'Micronutrient'];

  const filtered = fertilizers.filter((f) => {
    const matchesSearch =
      f.fertilizer_name.toLowerCase().includes(search.toLowerCase()) ||
      f.soil_condition.toLowerCase().includes(search.toLowerCase()) ||
      f.suitable_crops.some((c) => c.toLowerCase().includes(search.toLowerCase()));
    const matchesType = selectedType === 'All' || f.type === selectedType;
    return matchesSearch && matchesType;
  });

  const calcResult = calculateFertilizerDose(calcAcres, selectedFertId);

  return (
    <div className="pb-16">
      <PageHeader
        title="Smart Fertilizer Advisory & Calculator"
        subtitle="Nutrient management, chemical vs organic alternatives, and exact acreage dose calculation"
        icon={<FlaskConical className="w-6 h-6" />}
        action={
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'recommendations' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('recommendations')}
              icon={<FlaskConical className="w-4 h-4" />}
            >
              Fertilizers & Nutrients
            </Button>
            <Button
              variant={activeTab === 'calculator' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('calculator')}
              icon={<Calculator className="w-4 h-4" />}
            >
              Acreage Dosage Calculator
            </Button>
            <Button
              variant={activeTab === 'schedule' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('schedule')}
              icon={<Calendar className="w-4 h-4" />}
            >
              Split Schedule
            </Button>
          </div>
        }
      />

      {/* Acreage Dose Calculator View */}
      {activeTab === 'calculator' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="p-6 border-2 border-primary-500/30 bg-gradient-to-br from-primary-50/40 via-white to-amber-50/30 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center text-white shadow-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  Farm Acreage Fertilizer & Cost Estimator
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Calculate exact number of 50kg bags and budget required for your farm size
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Farm Size (in Acres)
                  </label>
                  <Input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={calcAcres}
                    onChange={(e) => setCalcAcres(Math.max(0.5, Number(e.target.value)))}
                    placeholder="e.g. 5 Acres"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Select Fertilizer to Calculate
                  </label>
                  <select
                    value={selectedFertId}
                    onChange={(e) => setSelectedFertId(e.target.value)}
                    className="input-field text-sm"
                  >
                    {fertilizers.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.fertilizer_name} ({f.npk_ratio || f.type})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {calcResult && (
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-sm">
                  <div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      Calculation for {calcAcres} Acres
                    </span>
                    <h4 className="text-base font-bold text-slate-800 dark:text-white mt-2">
                      {calcResult.fertilizer.fertilizer_name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">{calcResult.fertilizer.standard_dose_per_acre}</p>

                    <div className="grid grid-cols-3 gap-3 mt-4">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-center">
                        <span className="text-[10px] text-slate-400 font-semibold">Total Quantity</span>
                        <p className="text-lg font-black text-slate-800 dark:text-white mt-0.5">{calcResult.totalKg} kg</p>
                      </div>
                      <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-center">
                        <span className="text-[10px] text-primary-600 font-semibold">50kg Bags</span>
                        <p className="text-lg font-black text-primary-600 dark:text-primary-400 mt-0.5">{calcResult.totalBags} Bags</p>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-center">
                        <span className="text-[10px] text-amber-600 font-semibold">Estimated Cost</span>
                        <p className="text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5">₹{calcResult.estimatedCost.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {calcResult.fertilizer.organic_alternative && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2 text-xs text-emerald-600 font-medium">
                      <Leaf className="w-4 h-4 shrink-0" />
                      <span>Organic Substitute: {calcResult.fertilizer.organic_alternative}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Split Application Schedule View */}
      {activeTab === 'schedule' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="p-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              Scientific 4-Stage Split Application Schedule
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Applying fertilizer in balanced split stages prevents leaching, volatilization loss, and increases crop uptake efficiency by over 35%.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  stage: '1. Basal Application',
                  timing: 'During Final Land Preparation',
                  nutrients: '100% Phosphorus (DAP/SSP) + 50% Potash + 25% Nitrogen + Zinc',
                  reason: 'Stimulates vigorous root system and early tillering.',
                  color: 'from-amber-500 to-orange-600',
                },
                {
                  stage: '2. Vegetative Stage',
                  timing: '20-25 Days After Sowing / Planting',
                  nutrients: '50% Nitrogen (Urea) Top-Dressing + Biofertilizers',
                  reason: 'Promotes rapid tillering, branching, and leaf canopy development.',
                  color: 'from-emerald-500 to-green-600',
                },
                {
                  stage: '3. Panicle / Flowering',
                  timing: '45-55 Days (Boot leaf / Budding)',
                  nutrients: '25% Nitrogen + 50% Potash (MOP) + Boron Micronutrient spray',
                  reason: 'Ensures healthy panicle emergence and prevents flower shedding.',
                  color: 'from-blue-500 to-cyan-600',
                },
                {
                  stage: '4. Grain / Fruit Filling',
                  timing: '70-85 Days (Milky / Maturation stage)',
                  nutrients: 'Foliar spray of 19:19:19 or Potassium Nitrate (13:0:45) @ 1%',
                  reason: 'Maximizes test grain weight, sugar content, and fruit shine.',
                  color: 'from-purple-500 to-indigo-600',
                },
              ].map((item) => (
                <div key={item.stage} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center font-bold text-xs mb-3 shadow-md`}>
                    {item.stage.slice(0, 2)}
                  </div>
                  <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.stage}</h4>
                  <p className="text-[11px] text-primary-600 font-semibold mt-0.5">{item.timing}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 font-medium bg-white dark:bg-slate-700/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-600">
                    {item.nutrients}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2">{item.reason}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Main Fertilizer List View */}
      {activeTab === 'recommendations' && (
        <>
          {/* Search & Filters */}
          <Card className="p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by fertilizer, crop, or nutrient condition..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="input-field pl-10 text-sm"
                />
              </div>

              <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedType === t
                        ? 'bg-primary-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {filtered.map((fert, i) => (
              <motion.div
                key={fert.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-6 h-full flex flex-col justify-between hover:shadow-lg transition-all border border-slate-200 dark:border-slate-700">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                          <Beaker className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-slate-800 dark:text-white">{fert.fertilizer_name}</h3>
                          <span className="text-[11px] font-semibold text-primary-600">{fert.soil_condition}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 shrink-0">
                        {fert.type}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs mt-4">
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40">
                        <span className="font-semibold text-slate-700 dark:text-slate-200">Recommended Standard Dose:</span>
                        <p className="text-primary-700 dark:text-primary-300 font-bold mt-0.5">{fert.standard_dose_per_acre}</p>
                      </div>

                      <div>
                        <span className="font-semibold text-slate-500">Suitable Crops:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {fert.suitable_crops.map((c) => (
                            <span key={c} className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px]">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="font-semibold text-slate-500">Key Benefits:</span>
                        <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-0.5 mt-1">
                          {fert.benefits.map((b, idx) => (
                            <li key={idx}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Approx ₹{fert.approx_cost_inr_per_bag}/50kg bag</span>
                    <button
                      onClick={() => { setSelectedFertId(fert.id); setActiveTab('calculator'); }}
                      className="text-primary-600 font-semibold hover:underline flex items-center gap-1"
                    >
                      Calculate for My Farm <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
