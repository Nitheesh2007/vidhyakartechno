import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Search, ArrowUpDown, MapPin,
  Calculator, DollarSign
} from 'lucide-react';
import { MASTER_MARKET_PRICES, calculateHarvestProfit, type MarketPriceItem } from '../services/marketService';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Input, Select } from '../components/ui/Input';
import { useToast } from '../context/ToastContext';

type SortKey = 'crop_name' | 'current_price' | 'market_name' | 'price_change_pct';
type SortOrder = 'asc' | 'desc';

export default function MarketPrices() {
  const { showToast } = useToast();
  const [prices] = useState<MarketPriceItem[]>(MASTER_MARKET_PRICES);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [marketFilter, setMarketFilter] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('crop_name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Profit Calculator State
  const [calcOpen, setCalcOpen] = useState(false);
  const [calcCrop, setCalcCrop] = useState<string>('Paddy (Rice) Grade A');
  const [calcQuintals, setCalcQuintals] = useState<number>(50);
  const [calcCustomPrice, setCalcCustomPrice] = useState<number>(2320);

  const categories = ['All', 'Cereals', 'Cash Crops', 'Vegetables', 'Fruits', 'Spices', 'Oilseeds'];
  const markets = useMemo(() => [...new Set(prices.map((p) => p.market_name))], [prices]);

  const filtered = useMemo(() => {
    let result = prices.filter((p) => {
      const matchesSearch =
        p.crop_name.toLowerCase().includes(search.toLowerCase()) ||
        p.market_name.toLowerCase().includes(search.toLowerCase()) ||
        p.district.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const matchesMarket = marketFilter === '' || p.market_name === marketFilter;
      return matchesSearch && matchesCategory && matchesMarket;
    });

    result.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'crop_name') cmp = a.crop_name.localeCompare(b.crop_name);
      else if (sortKey === 'current_price') cmp = a.current_price - b.current_price;
      else if (sortKey === 'price_change_pct') cmp = a.price_change_pct - b.price_change_pct;
      else cmp = a.market_name.localeCompare(b.market_name);
      return sortOrder === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [prices, search, categoryFilter, marketFilter, sortKey, sortOrder]);

  const selectedPriceItem = prices.find((p) => p.crop_name === calcCrop) || prices[0];
  const profitReport = calculateHarvestProfit({
    quintals: calcQuintals,
    pricePerQuintal: calcCustomPrice || selectedPriceItem.current_price,
  });

  const handleSelectCropForCalc = (cropName: string, price: number) => {
    setCalcCrop(cropName);
    setCalcCustomPrice(price);
    setCalcOpen(true);
    showToast(`Loaded ${cropName} into Harvest Profit Calculator`, 'info');
  };

  return (
    <div className="pb-16">
      <PageHeader
        title="Live APMC Mandi Market Prices"
        subtitle="Real-time mandi rates, price trends, MSP benchmarks, and harvest revenue calculator"
        icon={<TrendingUp className="w-6 h-6" />}
        action={
          <Button
            onClick={() => setCalcOpen(!calcOpen)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20"
          >
            <Calculator className="w-4 h-4" />
            {calcOpen ? 'Close Profit Calculator' : 'Harvest Revenue & Profit Calculator'}
          </Button>
        }
      />

      {/* Harvest Revenue & Profit Calculator */}
      {calcOpen && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="p-6 border-2 border-blue-500/30 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/40 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                  Harvest Yield Revenue & Net Profit Calculator
                </h3>
                <p className="text-xs text-slate-500">
                  Estimate total market sales revenue, transportation, and net profits from your harvest
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Select Crop
                  </label>
                  <select
                    value={calcCrop}
                    onChange={(e) => {
                      setCalcCrop(e.target.value);
                      const item = prices.find((p) => p.crop_name === e.target.value);
                      if (item) setCalcCustomPrice(item.current_price);
                    }}
                    className="input-field text-sm"
                  >
                    {prices.map((p) => (
                      <option key={p.id} value={p.crop_name}>
                        {p.crop_name} ({p.market_name} - ₹{p.current_price}/Q)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Expected Yield (Quintals)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      value={calcQuintals}
                      onChange={(e) => setCalcQuintals(Math.max(1, Number(e.target.value)))}
                      placeholder="e.g. 50 Quintals"
                    />
                    <span className="text-[10px] text-slate-400">1 Quintal = 100 kg</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Selling Price (₹ / Quintal)
                    </label>
                    <Input
                      type="number"
                      min="100"
                      value={calcCustomPrice}
                      onChange={(e) => setCalcCustomPrice(Math.max(1, Number(e.target.value)))}
                      placeholder="Price per quintal"
                    />
                  </div>
                </div>
              </div>

              {/* Profit Report Breakdown */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-slate-500">Gross Harvest Value</span>
                    <span className="text-xl font-black text-slate-800 dark:text-white">
                      ₹{profitReport.grossRevenue.toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300 border-t border-b border-slate-100 dark:border-slate-700 py-3">
                    <div className="flex justify-between">
                      <span>Estimated Production & Input Costs:</span>
                      <span className="font-semibold text-red-500">- ₹{profitReport.productionCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transport & Handling Cost:</span>
                      <span className="font-semibold text-red-500">- ₹{profitReport.transportCost.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>APMC Mandi Cess & Market Fee (1.5%):</span>
                      <span className="font-semibold text-red-500">- ₹{profitReport.mandiFee.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wide">Net Profit to Farmer</span>
                    <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      ₹{profitReport.netProfit.toLocaleString()}
                    </p>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    {profitReport.roiPercentage}% Profit Margin
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Filters & Search */}
      <Card className="p-4 mb-6">
        <div className="grid sm:grid-cols-3 gap-3 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search crop, mandi, district..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10 text-sm"
            />
          </div>

          <Select
            value={marketFilter}
            onChange={(e) => setMarketFilter(e.target.value)}
            options={[{ value: '', label: 'All Mandis / Markets' }, ...markets.map((m) => ({ value: m, label: m }))]}
          />

          <div className="flex gap-2">
            <Select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              options={[
                { value: 'crop_name', label: 'Sort: Crop Name' },
                { value: 'current_price', label: 'Sort: Price (Highest)' },
                { value: 'price_change_pct', label: 'Sort: Top Gainers' },
                { value: 'market_name', label: 'Sort: Mandi Name' },
              ]}
            />
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategoryFilter(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                categoryFilter === c
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
          <span className="ml-auto text-xs text-slate-400 self-center">
            {filtered.length} Mandi rates tracked
          </span>
        </div>
      </Card>

      {/* Market Prices Table */}
      <Card className="overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80">
                <th className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">Crop & Variety</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">APMC Mandi & District</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-right">Modal Rate</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-center">Day Trend</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-right">MSP Benchmark</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, i) => {
                const isUp = item.price_trend === 'Up';
                return (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50/80 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-800 dark:text-slate-100 block text-sm">{item.crop_name}</span>
                      <span className="text-[11px] text-slate-400 font-medium">{item.category}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-primary-500 shrink-0" />
                        <span>{item.market_name}, {item.district}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 ml-5">{item.state}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-black text-base text-slate-800 dark:text-white">
                        ₹{item.current_price.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-slate-400 block font-normal">per quintal</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                          isUp
                            ? 'bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400'
                            : item.price_trend === 'Down'
                            ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-600'
                        }`}
                      >
                        {isUp ? <TrendingUp className="w-3 h-3" /> : item.price_trend === 'Down' ? <TrendingDown className="w-3 h-3" /> : null}
                        {item.price_change_pct > 0 ? `+${item.price_change_pct}%` : `${item.price_change_pct}%`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs">
                      {item.msp_price ? (
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          ₹{item.msp_price.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Open Market</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleSelectCropForCalc(item.crop_name, item.current_price)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 font-semibold text-xs transition-colors"
                      >
                        Calculate Profit
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
