'use client';

import { useState, useEffect } from 'react';

// ── Recharts ──────────────────────────────────────────────
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const RISK_COLORS: Record<string, string> = {
  LOW: '#22c55e',
  MEDIUM: '#f59e0b',
  HIGH: '#ef4444',
  CRITICAL: '#7c3aed',
};

/* ── Outbreak Simulation Panel ─────────────────────────── */
interface TimelinePoint {
  day: number; date: string; rainfall_mm: number;
  turbidity_ntu: number; symptom_cases: number;
  risk_score: number; risk_level: string; alert_triggered: boolean;
  e_coli: boolean; ph_level: number;
}

interface SimulationData {
  village: string;
  simulation_days: number;
  outbreak_detected_on_day: number | null;
  peak_risk_score: number;
  timeline: TimelinePoint[];
}

export default function OutbreakSimulationPage() {
  const [sim, setSim] = useState<SimulationData | null>(null);
  const [village, setVillage] = useState('Sonapur');
  const [loading, setLoading] = useState(false);
  const [activeDay, setActiveDay] = useState<TimelinePoint | null>(null);

  const villages = ['Sonapur', 'Lakhipur', 'Chandrapur', 'Chabua', 'Khonoma', 'Jorhat'];

  const fetchSimulation = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/simulation/outbreak-timeline?village=${village}&days=14`);
      if (!res.ok) throw new Error('API down');
      const data = await res.json();
      setSim(data);
      setActiveDay(data.timeline[data.timeline.length - 1]);
    } catch {
      // ── Fallback synthetic data ──────────────────────────────
      const t: TimelinePoint[] = Array.from({ length: 15 }, (_, i) => {
        const risk_score = i < 3 ? 15 : i < 5 ? 30 : i < 7 ? 55 : i < 10 ? 85 : i < 12 ? 75 : 45;
        return {
          day: i, date: `Day ${i}`,
          rainfall_mm: i >= 3 && i <= 5 ? 110 - i * 8 : i <= 8 ? 50 : 10,
          turbidity_ntu: i >= 4 && i <= 7 ? 22 - (i - 4) * 2 : i <= 3 ? 4 : 3,
          ph_level: i >= 4 && i <= 7 ? 5.6 : 7.1,
          e_coli: i >= 5 && i <= 9,
          symptom_cases: i < 4 ? 1 : i < 6 ? 4 : i < 10 ? 16 : i < 12 ? 11 : 4,
          risk_score, alert_triggered: risk_score >= 75,
          risk_level: risk_score >= 80 ? 'CRITICAL' : risk_score >= 55 ? 'HIGH' : risk_score >= 30 ? 'MEDIUM' : 'LOW',
        };
      });
      setSim({ village, simulation_days: 14, outbreak_detected_on_day: 7, peak_risk_score: 85, timeline: t });
      setActiveDay(t[t.length - 1]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchSimulation(); }, []);

  const getRiskBadge = (level: string) => ({
    LOW: 'bg-green-500/20 text-green-300 border-green-500/30',
    MEDIUM: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    HIGH: 'bg-red-500/20 text-red-300 border-red-500/30',
    CRITICAL: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  }[level] ?? 'bg-gray-500/20 text-gray-300');

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-sm font-bold">⚠</div>
          <h1 className="text-2xl font-bold text-white">Live Outbreak Simulation Engine</h1>
        </div>
        <p className="text-gray-400 text-sm">Day-by-day cascade: Heavy Rainfall → Water Contamination → Symptom Surge → AI Alert</p>
      </div>

      {/* Controls */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <select
          value={village}
          onChange={e => setVillage(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {villages.map(v => <option key={v} value={v}>{v}, Assam</option>)}
        </select>
        <button
          onClick={fetchSimulation}
          disabled={loading}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? '⟳ Simulating...' : '▶ Run Simulation'}
        </button>
      </div>

      {sim && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Village', val: sim.village, icon: '🏘' },
              { label: 'Alert Triggered', val: sim.outbreak_detected_on_day !== null ? `Day ${sim.outbreak_detected_on_day}` : 'None', icon: '🚨' },
              { label: 'Peak Risk Score', val: `${sim.peak_risk_score}%`, icon: '📈' },
              { label: 'Simulation Days', val: sim.simulation_days, icon: '📅' },
            ].map(k => (
              <div key={k.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="text-xl mb-1">{k.icon}</div>
                <div className="text-lg font-bold text-white">{k.val}</div>
                <div className="text-xs text-gray-400">{k.label}</div>
              </div>
            ))}
          </div>

          {/* Cascade Chart */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
            <h2 className="text-base font-semibold mb-4 text-white">Environmental → Clinical Cascade</h2>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={sim.timeline} margin={{ top: 0, right: 20, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="gradRain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gradRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 10 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Area type="monotone" dataKey="rainfall_mm" stroke="#3b82f6" fill="url(#gradRain)" name="Rainfall (mm)" strokeWidth={2} />
                <Area type="monotone" dataKey="risk_score" stroke="#ef4444" fill="url(#gradRisk)" name="Risk Score" strokeWidth={2} />
                <Line type="monotone" dataKey="symptom_cases" stroke="#f59e0b" strokeWidth={2} dot={false} name="Symptom Cases" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Day-by-Day Timeline Table */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
            <h2 className="text-base font-semibold mb-4 text-white">Day-by-Day Outbreak Log</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs border-b border-gray-700">
                    {['Day', 'Date', 'Rainfall', 'Turbidity', 'pH', 'E.Coli', 'Cases', 'Risk', 'Alert'].map(h => (
                      <th key={h} className="text-left py-2 px-3 font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sim.timeline.map(row => (
                    <tr
                      key={row.day}
                      onClick={() => setActiveDay(row)}
                      className={`border-b border-gray-800 cursor-pointer transition-colors ${activeDay?.day === row.day ? 'bg-blue-900/20' : 'hover:bg-gray-800/50'}`}
                    >
                      <td className="py-2 px-3 font-mono text-gray-300">{row.day}</td>
                      <td className="py-2 px-3 text-gray-300">{row.date}</td>
                      <td className="py-2 px-3 text-blue-400">{row.rainfall_mm} mm</td>
                      <td className="py-2 px-3 text-orange-400">{row.turbidity_ntu} NTU</td>
                      <td className={`py-2 px-3 font-mono ${row.ph_level < 6.5 ? 'text-red-400' : 'text-green-400'}`}>{row.ph_level}</td>
                      <td className="py-2 px-3">{row.e_coli ? <span className="text-red-400 font-bold">YES</span> : <span className="text-green-400">NO</span>}</td>
                      <td className="py-2 px-3 font-semibold text-white">{row.symptom_cases}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getRiskBadge(row.risk_level)}`}>
                          {row.risk_level}
                        </span>
                      </td>
                      <td className="py-2 px-3">{row.alert_triggered ? <span className="text-red-400 animate-pulse">🚨</span> : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Active Day Detail */}
          {activeDay && (
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-5">
              <h2 className="text-base font-semibold mb-3 text-white">Selected Day Detail — Day {activeDay.day}</h2>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {[
                  { label: 'Rainfall', val: `${activeDay.rainfall_mm} mm`, color: 'text-blue-400' },
                  { label: 'Turbidity', val: `${activeDay.turbidity_ntu} NTU`, color: 'text-orange-400' },
                  { label: 'pH Level', val: activeDay.ph_level, color: activeDay.ph_level < 6.5 ? 'text-red-400' : 'text-green-400' },
                  { label: 'E. Coli', val: activeDay.e_coli ? 'DETECTED' : 'Clear', color: activeDay.e_coli ? 'text-red-400' : 'text-green-400' },
                  { label: 'Symptom Cases', val: activeDay.symptom_cases, color: 'text-yellow-400' },
                  { label: 'Risk Score', val: `${activeDay.risk_score}%`, color: activeDay.risk_score >= 70 ? 'text-red-400' : 'text-green-400' },
                ].map(d => (
                  <div key={d.label} className="text-center">
                    <div className={`text-xl font-bold ${d.color}`}>{d.val}</div>
                    <div className="text-xs text-gray-400 mt-1">{d.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
