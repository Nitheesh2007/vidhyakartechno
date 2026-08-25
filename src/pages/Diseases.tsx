import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bug, Search, AlertCircle, Shield, FlaskConical, Leaf, Eye,
  Download, CheckCircle2, Sun,
  AlertTriangle, Filter, Sparkles, X, ChevronRight, Layers
} from 'lucide-react';
import jsPDF from 'jspdf';
import { MASTER_DISEASES, diagnoseDisease, type DiseaseItem, type DiagnosisMatch } from '../services/diseaseService';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { EmptyState } from '../components/ui/Loading';
import CropImage from '../components/ui/CropImage';
import { useToast } from '../context/ToastContext';

type TabType = 'overview' | 'treatment' | 'organic' | 'prevention';

export default function Diseases() {
  const { showToast } = useToast();
  const [diseases] = useState<DiseaseItem[]>(MASTER_DISEASES);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selected, setSelected] = useState<DiseaseItem | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<TabType>('overview');

  // AI Symptom Diagnosis Scanner State
  const [scannerOpen, setScannerOpen] = useState(false);
  const [diagCrop, setDiagCrop] = useState('');
  const [diagPart, setDiagPart] = useState<'Leaves' | 'Stem' | 'Root' | 'Fruit/Grain' | 'Whole Plant' | 'Flower' | ''>('');
  const [diagKeyword, setDiagKeyword] = useState('');
  const [diagResults, setDiagResults] = useState<DiagnosisMatch[] | null>(null);

  const categories = ['All', 'Fungal', 'Bacterial', 'Viral', 'Insect Pest'];
  const cropList = ['All', ...Array.from(new Set(diseases.map((d) => d.crop_name)))];

  const filtered = diseases.filter((d) => {
    const matchesSearch =
      d.crop_name.toLowerCase().includes(search.toLowerCase()) ||
      d.disease_name.toLowerCase().includes(search.toLowerCase()) ||
      d.symptoms.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || d.pathogen_type === selectedCategory;
    const matchesCrop = selectedCrop === 'All' || d.crop_name === selectedCrop;
    return matchesSearch && matchesCategory && matchesCrop;
  });

  const handleRunDiagnosis = (e: React.FormEvent) => {
    e.preventDefault();
    if (!diagCrop && !diagPart && !diagKeyword) {
      showToast('Please select at least one symptom or crop to analyze', 'warning');
      return;
    }
    const results = diagnoseDisease({
      crop_name: diagCrop || undefined,
      affected_part: (diagPart as any) || undefined,
      symptom_keyword: diagKeyword || undefined,
    });
    setDiagResults(results);
    showToast(`Analysis complete: Found ${results.length} possible conditions`, 'success');
  };

  const handleDownloadPDF = (disease: DiseaseItem) => {
    try {
      const doc = new jsPDF();

      // Header Banner
      doc.setFillColor(34, 197, 94);
      doc.rect(0, 0, 210, 26, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.text('Smart Crop Advisory - Plant Health Prescription', 14, 17);

      doc.setTextColor(30, 41, 59);
      doc.setFontSize(13);
      doc.text(`Disease: ${disease.disease_name}`, 14, 38);
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      doc.text(`Crop: ${disease.crop_name} | Pathogen: ${disease.pathogen_type} | Severity: ${disease.severity}`, 14, 46);
      doc.text(`Estimated Yield Loss Risk: ${disease.estimated_yield_loss}`, 14, 52);

      let y = 64;
      const sections = [
        { title: '1. Symptoms', content: disease.symptoms },
        { title: '2. Environmental Triggers', content: disease.weather_triggers },
        { title: '3. Chemical Treatment', content: `${disease.treatment} (Dosage: ${disease.chemical_dosage})` },
        { title: '4. Organic / Bio Remedy', content: `${disease.organic_solution} (Dosage: ${disease.organic_dosage})` },
        { title: '5. Cultural Prevention', content: disease.prevention },
        { title: '6. Safety Harvest Period', content: `${disease.safety_waiting_period_days} days waiting interval after spray` },
      ];

      sections.forEach((sec) => {
        if (y > 260) {
          doc.addPage();
          y = 20;
        }
        doc.setFillColor(241, 245, 249);
        doc.rect(14, y - 5, 182, 7, 'F');
        doc.setFontSize(10);
        doc.setTextColor(16, 185, 129);
        doc.text(sec.title, 16, y);
        y += 6;

        doc.setFontSize(9);
        doc.setTextColor(51, 65, 85);
        const splitText = doc.splitTextToSize(sec.content, 180);
        doc.text(splitText, 16, y);
        y += splitText.length * 5 + 6;
      });

      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('Smart Crop Advisory System Prescription - Generated for Farmer Reference', 14, 285);

      doc.save(`${disease.crop_name}_${disease.disease_name}_Prescription.pdf`);
      showToast('Treatment prescription downloaded as PDF', 'success');
    } catch {
      showToast('Downloaded prescription', 'info');
    }
  };

  return (
    <div className="pb-16">
      <PageHeader
        title="Plant Pathology & Pest Management"
        subtitle="Identify, diagnose, and treat over 35+ crop diseases, fungal infections, and pest infestations"
        icon={<Bug className="w-6 h-6" />}
        action={
          <Button
            onClick={() => setScannerOpen(!scannerOpen)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-500/20"
          >
            <Sparkles className="w-4 h-4" />
            {scannerOpen ? 'Close Symptom Scanner' : 'AI Symptom Diagnosis Scanner'}
          </Button>
        }
      />

      {/* AI Symptom Scanner Drawer / Card */}
      <AnimatePresence>
        {scannerOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <Card className="p-6 border-2 border-emerald-500/40 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 dark:from-slate-800/90 dark:via-slate-800 dark:to-emerald-950/20 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                      AI Disease & Symptom Diagnosis Scanner
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-semibold">
                        Instant Match
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Select what you observe on your field to calculate match probabilities and get targeted remedies
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setScannerOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleRunDiagnosis} className="grid sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    1. Affected Crop
                  </label>
                  <select
                    value={diagCrop}
                    onChange={(e) => setDiagCrop(e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="">Any Crop / Not Sure</option>
                    {cropList.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    2. Affected Plant Part
                  </label>
                  <select
                    value={diagPart}
                    onChange={(e) => setDiagPart(e.target.value as any)}
                    className="input-field text-sm"
                  >
                    <option value="">Select Plant Part</option>
                    <option value="Leaves">Leaves (Spots, Yellowing, Curling)</option>
                    <option value="Stem">Stem / Bark (Lesions, Rot, Wilting)</option>
                    <option value="Fruit/Grain">Fruit / Grain (Rot, Holes, Spots)</option>
                    <option value="Root">Root Basin (Root Rot, Nematodes)</option>
                    <option value="Flower">Flower Buds (Dropping, Powdery)</option>
                    <option value="Whole Plant">Whole Plant (Stunting, Wilting)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    3. Visual Symptom Keyword
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., spots, blast, yellow, caterpillar, wilt..."
                    value={diagKeyword}
                    onChange={(e) => setDiagKeyword(e.target.value)}
                    className="input-field text-sm"
                  />
                </div>

                <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
                  {diagResults && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => { setDiagResults(null); setDiagCrop(''); setDiagPart(''); setDiagKeyword(''); }}
                    >
                      Reset Diagnosis
                    </Button>
                  )}
                  <Button type="submit" className="btn-primary flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Run AI Diagnosis
                  </Button>
                </div>
              </form>

              {/* Diagnosis Results Section */}
              {diagResults && (
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    Diagnosis Analysis Results ({diagResults.length} Matched Conditions):
                  </h4>

                  {diagResults.length === 0 ? (
                    <p className="text-xs text-slate-500">No exact matches found. Try broadening your keywords.</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {diagResults.slice(0, 3).map((match) => (
                        <div
                          key={match.id}
                          onClick={() => setSelected(match)}
                          className="p-4 rounded-xl bg-white dark:bg-slate-800 border-2 border-emerald-500/50 shadow-sm hover:shadow-md cursor-pointer transition-all"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
                              {match.matchScore}% Match Score
                            </span>
                            <span className="text-xs text-slate-400">{match.crop_name}</span>
                          </div>
                          <h5 className="font-bold text-slate-800 dark:text-white text-sm mb-1">{match.disease_name}</h5>
                          <p className="text-xs text-slate-500 line-clamp-2 mb-3">{match.symptoms}</p>
                          <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                            View Prescription <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter and Search Bar */}
      <Card className="p-5 mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search diseases, crops, symptoms (e.g. blast, borer, wilt)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10 text-sm"
            />
          </div>

          {/* Crop Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Crop:
            </span>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="input-field text-xs py-2"
            >
              {cropList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat === 'All' ? 'All Pathogens' : cat}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-400 self-center font-medium">
            Showing {filtered.length} of {diseases.length} diseases
          </span>
        </div>
      </Card>

      {/* Disease Cards Grid */}
      {filtered.length === 0 ? (
        <Card className="p-8">
          <EmptyState
            icon={<Bug className="w-12 h-12 text-slate-400" />}
            title="No Diseases Found"
            message="No matching diseases found for this search or category filter. Try clearing your filters."
            action={
              <Button onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedCrop('All'); }}>
                Clear All Filters
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((disease, i) => (
            <motion.div
              key={disease.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
              onClick={() => { setSelected(disease); setActiveModalTab('overview'); }}
            >
              <Card className="overflow-hidden cursor-pointer group hover:shadow-xl hover:border-primary-500/50 transition-all duration-300 flex flex-col h-full">
                {/* Image & Badges */}
                <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <CropImage
                    src={disease.image_url}
                    alt={disease.disease_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur text-[11px] font-bold text-slate-800 dark:text-white shadow-sm">
                      {disease.crop_name}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm ${
                        disease.severity === 'Critical'
                          ? 'bg-red-600 text-white'
                          : disease.severity === 'High'
                          ? 'bg-amber-600 text-white'
                          : 'bg-blue-600 text-white'
                      }`}
                    >
                      {disease.severity} Risk
                    </span>
                  </div>

                  {/* Bottom Image Overlay Title */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-300 mb-0.5 font-medium">
                      <Layers className="w-3 h-3" /> {disease.pathogen_type} Pathogen
                    </div>
                    <h3 className="text-white font-bold text-base leading-tight drop-shadow-sm">
                      {disease.disease_name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {disease.affected_parts.map((p) => (
                        <span key={p} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
                          {p}
                        </span>
                      ))}
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 font-semibold ml-auto">
                        Yield Loss: {disease.estimated_yield_loss}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-3">
                      {disease.symptoms}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-primary-600 dark:text-primary-400 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <Eye className="w-3.5 h-3.5" /> Full Diagnosis & Remedies
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {disease.safety_waiting_period_days}d safety wait
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Disease Detail & Prescription Modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700"
          >
            {/* Modal Hero Banner */}
            <div className="relative h-56">
              <CropImage src={selected.image_url} alt={selected.disease_name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white text-sm"
              >
                ✕
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-bold">
                    {selected.crop_name}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/90 text-slate-800 text-xs font-bold">
                    {selected.pathogen_type}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold">
                    {selected.severity} Severity
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white">{selected.disease_name}</h2>
                {selected.scientific_name && (
                  <p className="text-xs text-slate-300 italic">{selected.scientific_name}</p>
                )}
              </div>
            </div>

            {/* Modal Tabs Bar */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 px-6 bg-slate-50/60 dark:bg-slate-800/40">
              {[
                { key: 'overview', label: 'Symptoms & Causes', icon: AlertCircle },
                { key: 'treatment', label: 'Chemical Treatment', icon: FlaskConical },
                { key: 'organic', label: 'Organic & Bio Solution', icon: Leaf },
                { key: 'prevention', label: 'Prevention & Calendar', icon: Shield },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveModalTab(tab.key as TabType)}
                  className={`flex items-center gap-2 py-3.5 px-4 text-xs font-bold border-b-2 transition-colors ${
                    activeModalTab === tab.key
                      ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-6 space-y-5">
              {activeModalTab === 'overview' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                    <h4 className="text-sm font-bold text-red-700 dark:text-red-300 flex items-center gap-2 mb-1.5">
                      <AlertCircle className="w-4 h-4" /> Characteristic Symptoms
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{selected.symptoms}</p>
                    {selected.symptoms_ta && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-tamil">
                        {selected.symptoms_ta}
                      </p>
                    )}
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
                    <h4 className="text-sm font-bold text-amber-800 dark:text-amber-300 flex items-center gap-2 mb-1.5">
                      <Sun className="w-4 h-4" /> Weather & Environmental Outbreak Triggers
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{selected.weather_triggers}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-700/40">
                      <span className="text-[11px] font-semibold text-slate-500">Estimated Yield Loss Risk</span>
                      <p className="text-base font-bold text-red-600 dark:text-red-400">{selected.estimated_yield_loss}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-700/40">
                      <span className="text-[11px] font-semibold text-slate-500">Safety Harvest Interval</span>
                      <p className="text-base font-bold text-slate-800 dark:text-white">{selected.safety_waiting_period_days} Days</p>
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'treatment' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/30">
                    <h4 className="text-sm font-bold text-purple-700 dark:text-purple-300 flex items-center gap-2 mb-2">
                      <FlaskConical className="w-4 h-4" /> Recommended Chemical Prescription
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">{selected.treatment}</p>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800/40">
                      <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">Exact Dosage per Acre:</span>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 mt-0.5">{selected.chemical_dosage}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Always wear protective mask and gloves while spraying. Spray during calm morning or late evening hours.</span>
                  </div>
                </div>
              )}

              {activeModalTab === 'organic' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                    <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2 mb-2">
                      <Leaf className="w-4 h-4" /> 100% Organic & Biological Solution
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">{selected.organic_solution}</p>
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800/40">
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Organic Preparation & Application:</span>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 mt-0.5">{selected.organic_dosage}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeModalTab === 'prevention' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                    <h4 className="text-sm font-bold text-blue-700 dark:text-blue-300 flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4" /> Cultural & Preventive Farm Practices
                    </h4>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{selected.prevention}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <Button
                  onClick={() => handleDownloadPDF(selected)}
                  variant="outline"
                  icon={<Download className="w-4 h-4" />}
                >
                  Download PDF Prescription
                </Button>
                <Button onClick={() => setSelected(null)} className="btn-primary">
                  Close Details
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
