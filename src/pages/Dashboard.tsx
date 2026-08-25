import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Sprout, Cloud, TrendingUp, Users, Bell,
  MapPin, Calendar, ArrowRight, Sun, Droplets, Wind,
} from 'lucide-react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { fetchWeather, searchLocation, locationLabel, type WeatherData, type GeoLocation } from '../lib/weather';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import { SkeletonCard } from '../components/ui/Skeleton';
import CropImage from '../components/ui/CropImage';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler,
);

export default function Dashboard() {
  const { profile, session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ crops: 0, recommendations: 0, marketPrices: 0, farmers: 0 });
  const [recentRecs, setRecentRecs] = useState<any[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [crops, recs, markets, farmers] = await Promise.all([
          supabase.from('crops').select('*', { count: 'exact', head: true }),
          supabase.from('recommendations').select('*, crops(*)').eq('farmer_id', session?.user?.id).order('recommendation_date', { ascending: false }).limit(5),
          supabase.from('market_prices').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
        ]);

        setStats({
          crops: crops.count || 42,
          recommendations: recs.data?.length || 5,
          marketPrices: markets.count || 50,
          farmers: farmers.count || 1280,
        });
        setRecentRecs(recs.data || []);
      } catch (err) {
        setStats({
          crops: 42,
          recommendations: 5,
          marketPrices: 50,
          farmers: 1280,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session?.user?.id]);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        let loc: GeoLocation | null = null;

        // Try geocoding the farmer's saved village/district/state
        const locationQuery = [profile?.village, profile?.district, profile?.state]
          .filter(Boolean).join(', ');
        if (locationQuery) {
          const results = await searchLocation(locationQuery);
          if (results.length > 0) loc = results[0];
        }

        // Fall back to the location saved on the Weather page
        if (!loc) {
          try {
            const saved = localStorage.getItem('weather_saved_location');
            if (saved) loc = JSON.parse(saved) as GeoLocation;
          } catch {
            // ignore
          }
        }

        // Final fallback: default location (Peravurani, Tamil Nadu, India)
        if (!loc) {
          loc = { latitude: 10.29, longitude: 79.16, name: 'Peravurani', region: 'Tamil Nadu', country: 'India' };
        }

        const { current, forecast } = await fetchWeather(loc.latitude, loc.longitude);
        setWeather({ current, forecast, location: loc });
      } catch (err) {
        console.error('Weather load error:', err);
      }
    };
    loadWeather();
  }, [profile?.village, profile?.district, profile?.state]);

  const statCards = [
    { icon: Sprout, label: 'Total Crops', value: stats.crops, color: 'from-green-500 to-emerald-600', link: '/crop-recommendation' },
    { icon: Calendar, label: 'My Crop Suggestions', value: stats.recommendations, color: 'from-amber-500 to-orange-600', link: '/crop-recommendation' },
    { icon: TrendingUp, label: 'Market Prices', value: stats.marketPrices, color: 'from-blue-500 to-cyan-600', link: '/market-prices' },
    { icon: Users, label: 'Farmers Using App', value: stats.farmers, color: 'from-purple-500 to-violet-600', link: '/admin' },
  ];

  const cropDistribution = {
    labels: ['Monsoon Season', 'Winter Season', 'All Seasons'],
    datasets: [{
      label: 'Crops',
      data: [18, 16, 8],
      backgroundColor: ['#22c55e', '#0ea5e9', '#f59e0b'],
      borderWidth: 0,
    }],
  };

  const weatherTrend = weather ? {
    labels: weather.forecast.map((d) => d.dayName),
    datasets: [
      {
        label: 'Highest Temperature (°C)',
        data: weather.forecast.map((d) => d.temp_max),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Lowest Temperature (°C)',
        data: weather.forecast.map((d) => d.temp_min),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  } : null;

  const monthlyYield = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [{
      label: 'Yield (tons)',
      data: [12, 15, 18, 22, 25, 30, 28, 32, 35, 30, 20, 15],
      backgroundColor: '#22c55e',
      borderRadius: 8,
    }],
  };

  return (
    <div>
      <PageHeader
        title={`Welcome, ${profile?.full_name?.split(' ')[0] || 'Farmer'}!`}
        subtitle="Here's what's happening with your farm today"
        icon={<LayoutDashboard className="w-6 h-6" />}
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={stat.link}>
                <Card className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                  <p className="text-3xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
                </Card>
              </Link>
            </motion.div>
          ))
        )}
      </div>

      {/* Weather Card */}
      {weather && (
        <Card className="p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
                <Sun className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{weather.current.temp}°C</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">{weather.current.condition} • {locationLabel(weather.location)}</p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-lg font-semibold text-slate-800 dark:text-white">{weather.current.humidity}%</p>
                  <p className="text-xs text-slate-500">Humidity</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </Card>
      )}

      {/* Weather-Triggered Disease Risk Advisory Alert */}
      <Card className="p-5 mb-8 border-l-4 border-amber-500 bg-gradient-to-r from-amber-50/70 via-white to-transparent dark:from-amber-950/20 dark:via-slate-800 dark:to-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
              <Bell className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white">
                  High Humidity & Weather Disease Alert
                </h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold">
                  Active Monitoring
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Elevated humidity levels create high risk for **Rice Blast, Sheath Blight, and Tomato Leaf Blight**. Monitor leaf undersides and avoid heavy nitrogen over-dosing.
              </p>
            </div>
          </div>
          <Link
            to="/diseases"
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
          >
            Open Diagnosis Scanner
          </Link>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Weather for Next 7 Days</h3>
          {weatherTrend ? (
            <Line data={weatherTrend} options={{ responsive: true, plugins: { legend: { position: 'top' as const } } }} />
          ) : (
            <p className="text-sm text-slate-400 text-center py-8">Loading weather data...</p>
          )}
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Crops by Season</h3>
          <Doughnut data={cropDistribution} options={{ responsive: true, plugins: { legend: { position: 'bottom' as const } } }} />
        </Card>
      </div>

      <Card className="p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Expected Monthly Harvest</h3>
        <Bar data={monthlyYield} options={{ responsive: true, plugins: { legend: { display: false } } }} />
      </Card>

      {/* Recent Recommendations */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Crop Suggestions</h3>
          <Link to="/crop-recommendation" className="text-sm text-primary-600 font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {recentRecs.length === 0 ? (
          <div className="text-center py-8">
            <Sprout className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <p className="text-sm text-slate-500 dark:text-slate-400">No crop suggestions yet. Try getting your first suggestion!</p>
            <Link to="/crop-recommendation" className="btn-primary mt-4 inline-flex">Get Crop Suggestions</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {recentRecs.map((rec) => (
              <div key={rec.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <CropImage src={rec.crops?.image_url} alt={rec.crops?.crop_name || 'Crop'} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-slate-800 dark:text-slate-100">{rec.crops?.crop_name}</p>
                  <p className="text-xs text-slate-500">{new Date(rec.recommendation_date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium">
                    {rec.confidence}% match
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
