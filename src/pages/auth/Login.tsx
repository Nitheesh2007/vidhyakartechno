import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sprout, Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Login() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { loginWithDemo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: 'vicky@gmail.com', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });
      if (error) throw error;
      showToast('Welcome back!', 'success');
      navigate('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      
      // If network fails (e.g. Supabase credentials not set on Vercel), allow smooth demo login
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('fetch')) {
        showToast('Connecting in Demo Mode (Supabase offline/not configured)...', 'info');
        const role = form.email.toLowerCase().includes('admin') ? 'admin' : 'farmer';
        const name = form.email.split('@')[0];
        loginWithDemo(role, name, form.email);
        navigate('/dashboard');
      } else {
        showToast(errorMessage, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (role: 'farmer' | 'admin') => {
    loginWithDemo(role);
    showToast(`Logged in as Demo ${role === 'admin' ? 'Officer' : 'Farmer'}!`, 'success');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/20">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Welcome Back</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in to your Crop Advisory account</p>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mb-6 p-3 bg-primary-50 dark:bg-primary-950/40 border border-primary-100 dark:border-primary-800/40 rounded-xl">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-700 dark:text-primary-300 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Instant Demo Access:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('farmer')}
                className="py-2 px-3 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Sprout className="w-3.5 h-3.5 text-primary-600" />
                Demo Farmer
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="py-2 px-3 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                Demo Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="input-field pl-10"
                  placeholder="farmer@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-field pl-10 pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-primary-600 font-medium hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="text-primary-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
