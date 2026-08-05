'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getOfflineGISData } from '@/lib/mockApi';
import { MapPin, AlertTriangle, ShieldCheck, Droplet, RefreshCw } from 'lucide-react';

interface OutbreakMapProps {
  selectedDistrict?: string;
}

export default function OutbreakMap({ selectedDistrict }: OutbreakMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<any>(null);
  const [data, setData] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'CRITICAL' | 'WATER'>('ALL');

  useEffect(() => {
    const gisData = getOfflineGISData();
    setData(gisData);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current || !data) return;

    // Dynamically load Leaflet CSS and JS
    const leafletCss = document.createElement('link');
    leafletCss.rel = 'stylesheet';
    leafletCss.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(leafletCss);

    import('leaflet').then((L) => {
      if (leafletMap.current) {
        leafletMap.current.remove();
      }

      // Center map on Northeast India (Guwahati / Assam region: 26.14, 92.5)
      const map = L.map(mapRef.current!).setView([26.14, 92.5], 7);
      leafletMap.current = map;

      // Dark / Modern OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors | MDoNER GIS Engine',
        maxZoom: 18
      }).addTo(map);

      // Plot Villages & Risk Zone Circles
      data.villages.forEach((v: any) => {
        if (activeFilter === 'CRITICAL' && v.risk_level !== 'CRITICAL' && v.risk_level !== 'HIGH') return;

        const color = v.risk_level === 'CRITICAL' ? '#ef4444' : v.risk_level === 'HIGH' ? '#f97316' : v.risk_level === 'MEDIUM' ? '#eab308' : '#10b981';
        
        // Heatmap Risk Zone Buffer Circle
        L.circle([v.latitude, v.longitude], {
          color: color,
          fillColor: color,
          fillOpacity: 0.25,
          radius: v.risk_score * 120
        }).addTo(map);

        // Marker Pin
        const marker = L.circleMarker([v.latitude, v.longitude], {
          radius: 9,
          color: '#ffffff',
          weight: 2,
          fillColor: color,
          fillOpacity: 0.95
        }).addTo(map);

        marker.bindPopup(`
          <div style="font-family: system-ui, sans-serif; padding: 4px; color: #0f172a;">
            <div style="font-weight: 800; font-size: 14px; color: ${color};">${v.name} (${v.state})</div>
            <div style="font-size: 11px; margin-top: 2px;"><strong>Risk Level:</strong> <span style="color: ${color}; font-weight: 700;">${v.risk_level} (${v.risk_score}/100)</span></div>
            <div style="font-size: 11px;"><strong>Population:</strong> ${v.population.toLocaleString()}</div>
            <div style="font-size: 11px;"><strong>Water Source:</strong> ${v.primary_water_source}</div>
            <div style="margin-top: 6px; padding-top: 4px; border-top: 1px solid #e2e8f0; font-size: 10px; color: #64748b;">
              AI Warning Engine: Early Chlorination Suggested
            </div>
          </div>
        `);
      });

      // Plot Water Sources (Blue Droplets)
      if (activeFilter === 'ALL' || activeFilter === 'WATER') {
        data.water_tests.forEach((wt: any) => {
          const wColor = wt.is_safe ? '#06b6d4' : '#dc2626';
          const wMarker = L.circleMarker([wt.latitude, wt.longitude], {
            radius: 6,
            color: '#ffffff',
            weight: 1.5,
            fillColor: wColor,
            fillOpacity: 0.9
          }).addTo(map);

          wMarker.bindPopup(`
            <div style="font-family: system-ui, sans-serif; padding: 4px;">
              <div style="font-weight: 700; font-size: 13px; color: ${wColor};">💧 ${wt.water_source_name}</div>
              <div style="font-size: 11px;"><strong>pH:</strong> ${wt.ph_level} | <strong>Turbidity:</strong> ${wt.turbidity_ntu} NTU</div>
              <div style="font-size: 11px;"><strong>E. Coli:</strong> ${wt.e_coli_presence ? '<span style="color:red; font-weight:bold;">DETECTED</span>' : '<span style="color:green;">SAFE</span>'}</div>
              <div style="font-size: 11px;"><strong>Status:</strong> ${wt.is_safe ? '✅ SAFE DRINKING' : '⚠️ CONTAMINATED'}</div>
            </div>
          `);
        });
      }
    });

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [data, activeFilter]);

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl relative">
      {/* Map Header Overlay Controls */}
      <div className="absolute top-4 left-4 z-[400] bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 shadow-xl flex flex-wrap items-center gap-2 text-xs">
        <span className="font-bold text-slate-200 flex items-center gap-1.5 mr-2">
          <MapPin className="w-4 h-4 text-emerald-400" />
          GIS Outbreak Map
        </span>
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${activeFilter === 'ALL' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          All Layers
        </button>
        <button
          onClick={() => setActiveFilter('CRITICAL')}
          className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${activeFilter === 'CRITICAL' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          High Risk Hotspots
        </button>
        <button
          onClick={() => setActiveFilter('WATER')}
          className={`px-2.5 py-1 rounded-lg font-semibold transition-colors ${activeFilter === 'WATER' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
        >
          Water Sampling Points
        </button>
      </div>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 right-4 z-[400] bg-slate-950/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 shadow-xl text-[11px] space-y-1.5">
        <div className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Risk Legend</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500"></span><span className="text-slate-200">Critical (&gt;80% Risk)</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-500"></span><span className="text-slate-200">High Risk Zone</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span><span className="text-slate-200">Medium Risk Zone</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="text-slate-200">Safe / Low Risk</span></div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400"></span><span className="text-slate-200">💧 Water Source</span></div>
      </div>

      {/* Leaflet Map Div */}
      <div ref={mapRef} className="w-full h-[520px] bg-slate-950" />
    </div>
  );
}
