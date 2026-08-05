'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Sample {
  id: number;
  source_name: string;
  village: string;
  lat: number;
  lng: number;
  ph: number;
  turbidity_ntu: number;
  bacterial_cfu: number;
  e_coli: boolean;
  tds_ppm: number;
  temperature_c: number;
  is_safe: boolean;
  contamination_score: number;
  tested_by: string;
}

// Leaflet dynamic import (no SSR)
const WaterMap = dynamic(() => import('@/components/WaterQualityMap'), { ssr: false, loading: () => (
  <div className="h-96 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
    <span className="animate-pulse">Loading Interactive Map...</span>
  </div>
) });

export default function WaterQualityPage() {
  const [samples, setSamples] = useState<Sample[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Sample | null>(null);
  const [filter, setFilter] = useState<'all' | 'contaminated' | 'safe'>('all');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/v1/simulation/water-quality-samples?n=40');
        if (!res.ok) throw new Error();
        const data = await res.json();
        setSamples(data.samples);
      } catch {
        // Offline fallback
        const fallback: Sample[] = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          source_name: `Water Source ${i + 1}`,
          village: ['Sonapur', 'Lakhipur', 'Chabua', 'Chandrapur', 'Khonoma'][i % 5],
          lat: 26.1 + (i * 0.12),
          lng: 91.9 + (i * 0.08),
          ph: i % 3 === 0 ? 5.6 : 7.1,
          turbidity_ntu: i % 3 === 0 ? 21 : 3,
          bacterial_cfu: i % 3 === 0 ? 250 : 8,
          e_coli: i % 3 === 0 && i % 5 !== 0,
          tds_ppm: i % 3 === 0 ? 1200 : 300,
          temperature_c: 26 + (i % 4),
          is_safe: i % 3 !== 0,
          contamination_score: i % 3 === 0 ? 75 + i : 10 + i,
          tested_by: ['ASHA Kit', 'IoT Sensor', 'PHC Lab'][i % 3],
        }));
        setSamples(fallback);
      } finally { setLoading(false); }
    })();
  }, []);

  const filtered = samples.filter(s =>
    filter === 'all' ? true : filter === 'contaminated' ? !s.is_safe : s.is_safe
  );

  const chartData = ['Sonapur', 'Lakhipur', 'Chabua', 'Chandrapur', 'Khonoma'].map(v => ({
    village: v,
    contaminated: samples.filter(s => s.village === v && !s.is_safe).length,
    safe: samples.filter(s => s.village === v && s.is_safe).length,
  }));

  const safePercent = samples.length ? Math.round((samples.filter(s => s.is_safe).length / samples.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">💧 Water Quality Monitoring Dashboard</h1>
        <p className="text-gray-400 text-sm">Real-time IoT sensor + field test results across Northeast India water sources</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: '💧', label: 'Total Sources Tested', val: samples.length, color: 'text-blue-400' },
          { icon: '✅', label: 'Safe Sources', val: samples.filter(s => s.is_safe).length, color: 'text-green-400' },
          { icon: '☣', label: 'Contaminated', val: samples.filter(s => !s.is_safe).length, color: 'text-red-400' },
          { icon: '📊', label: 'Water Safety Score', val: `${safePercent}%`, color: safePercent >= 60 ? 'text-yellow-400' : 'text-red-400' },
        ].map(k => (
          <div key={k.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="text-2xl mb-1">{k.icon}</div>
            <div className={`text-2xl font-bold ${k.color}`}>{loading ? '…' : k.val}</div>
            <div className="text-xs text-gray-400 mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">📍 Geo-tagged Water Sources (OpenStreetMap)</h2>
        <WaterMap samples={filtered} onSelect={(s) => setSelected(s)} />
      </div>

      {/* Chart + Filter */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">Village-wise Contamination Count</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="village" tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <YAxis tick={{ fontSize: 10, fill: '#9ca3af' }} />
              <Tooltip contentStyle={{ background: '#111827', border: '1px solid #374151', borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="contaminated" fill="#ef4444" name="Contaminated" radius={[4, 4, 0, 0]} />
              <Bar dataKey="safe" fill="#22c55e" name="Safe" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Selected Source Detail */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-gray-300 mb-3">Selected Source Parameters</h2>
          {selected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${selected.is_safe ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {selected.is_safe ? '✅ SAFE' : '☣ CONTAMINATED'}
                </span>
                <span className="text-sm font-semibold text-white">{selected.source_name}</span>
              </div>
              {[
                { l: 'Village', v: selected.village },
                { l: 'pH Level', v: selected.ph, warn: selected.ph < 6.5 },
                { l: 'Turbidity', v: `${selected.turbidity_ntu} NTU`, warn: selected.turbidity_ntu > 10 },
                { l: 'E. Coli', v: selected.e_coli ? 'DETECTED' : 'Not Found', warn: selected.e_coli },
                { l: 'TDS', v: `${selected.tds_ppm} ppm`, warn: selected.tds_ppm > 500 },
                { l: 'Bacterial CFU', v: `${selected.bacterial_cfu}/100ml`, warn: selected.bacterial_cfu > 50 },
                { l: 'Tested By', v: selected.tested_by },
              ].map(r => (
                <div key={r.l} className="flex justify-between text-sm">
                  <span className="text-gray-400">{r.l}</span>
                  <span className={(r as any).warn ? 'text-red-400 font-semibold' : 'text-white'}>{r.v}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-500 text-sm">
              Click a marker on the map or a row below
            </div>
          )}
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-300">Water Test Records</h2>
          <div className="flex gap-2">
            {(['all', 'contaminated', 'safe'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs rounded-lg capitalize transition-all ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-gray-400 border-b border-gray-700">
                {['Source', 'Village', 'pH', 'Turbidity', 'TDS', 'E.Coli', 'Tested By', 'Status'].map(h => (
                  <th key={h} className="py-2 px-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`border-b border-gray-800 cursor-pointer transition-colors ${selected?.id === s.id ? 'bg-blue-900/20' : 'hover:bg-gray-800/40'}`}
                >
                  <td className="py-2 px-3 text-gray-200 max-w-[160px] truncate">{s.source_name}</td>
                  <td className="py-2 px-3 text-gray-300">{s.village}</td>
                  <td className={`py-2 px-3 font-mono ${s.ph < 6.5 ? 'text-red-400' : 'text-green-400'}`}>{s.ph}</td>
                  <td className={`py-2 px-3 font-mono ${s.turbidity_ntu > 10 ? 'text-orange-400' : 'text-green-400'}`}>{s.turbidity_ntu}</td>
                  <td className={`py-2 px-3 font-mono ${s.tds_ppm > 500 ? 'text-red-400' : 'text-gray-300'}`}>{s.tds_ppm}</td>
                  <td className="py-2 px-3">{s.e_coli ? <span className="text-red-400 font-bold">YES</span> : <span className="text-green-400">No</span>}</td>
                  <td className="py-2 px-3 text-gray-400">{s.tested_by}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-xs ${s.is_safe ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {s.is_safe ? 'SAFE' : 'UNSAFE'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
