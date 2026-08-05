'use client';

import { useEffect, useRef } from 'react';

interface Sample {
  id: number;
  source_name: string;
  village: string;
  lat: number;
  lng: number;
  is_safe: boolean;
  turbidity_ntu: number;
  ph: number;
  e_coli: boolean;
  contamination_score: number;
  tested_by: string;
  bacterial_cfu: number;
  tds_ppm: number;
  temperature_c: number;
}

interface Props {
  samples: Sample[];
  onSelect: (s: Sample) => void;
}

export default function WaterQualityMap({ samples, onSelect }: Props) {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let isMounted = true;

    (async () => {
      const L = (await import('leaflet')).default;
      await import('leaflet/dist/leaflet.css');

      if (!isMounted) return;

      if (!mapRef.current) {
        const container = document.getElementById('water-quality-map');
        if (!container) return;
        const map = L.map(container, { center: [26.1, 91.9], zoom: 7, zoomControl: true });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18,
        }).addTo(map);
        mapRef.current = map;
      }

      // Clear old markers
      markersRef.current.forEach(m => m.remove());
      markersRef.current = [];

      // Plot new markers
      samples.forEach(s => {
        const color = s.is_safe ? '#22c55e' : s.contamination_score > 80 ? '#7c3aed' : '#ef4444';
        const icon = (window as any).L.divIcon({
          html: `<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 6px ${color}"></div>`,
          className: '',
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        const marker = L.marker([s.lat, s.lng], { icon });
        marker.bindPopup(`
          <div style="font-family:sans-serif;min-width:180px">
            <div style="font-weight:700;margin-bottom:6px">${s.source_name}</div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="color:#9ca3af">Status</span>
              <span style="color:${s.is_safe ? '#22c55e' : '#ef4444'};font-weight:700">${s.is_safe ? '✅ SAFE' : '☣ CONTAMINATED'}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="color:#9ca3af">pH</span>
              <span style="color:${s.ph < 6.5 ? '#ef4444' : '#22c55e'}">${s.ph}</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="color:#9ca3af">Turbidity</span>
              <span>${s.turbidity_ntu} NTU</span>
            </div>
            <div style="display:flex;justify-content:space-between;margin-bottom:4px">
              <span style="color:#9ca3af">E. Coli</span>
              <span style="color:${s.e_coli ? '#ef4444' : '#22c55e'}">${s.e_coli ? 'DETECTED' : 'Clear'}</span>
            </div>
            <div style="display:flex;justify-content:space-between">
              <span style="color:#9ca3af">Tested By</span>
              <span style="font-size:11px">${s.tested_by}</span>
            </div>
          </div>
        `);
        marker.on('click', () => onSelect(s));
        marker.addTo(mapRef.current);
        markersRef.current.push(marker);
      });
    })();

    return () => { isMounted = false; };
  }, [samples]);

  return <div id="water-quality-map" className="h-96 w-full rounded-xl overflow-hidden z-0" />;
}
