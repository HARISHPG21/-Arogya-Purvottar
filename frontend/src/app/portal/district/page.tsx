'use client';

import React, { useState } from 'react';
import OutbreakMap from '@/components/OutbreakMap';
import { getOfflineGISData } from '@/lib/mockApi';
import { AlertOctagon, Send, FileText, Shield, BarChart2, CheckCircle2, Download, Building2, MapPin } from 'lucide-react';

export default function DistrictPortal() {
  const [alertTitle, setAlertTitle] = useState('CRITICAL: Cholera Outbreak Alert - Sonapur Sector');
  const [alertMsg, setAlertMsg] = useState('High E. Coli bacterial contamination detected in river stream source. All ASHA workers are instructed to super-chlorinate wells and distribute ORS.');
  const [district, setDistrict] = useState('Kamrup Metropolitan');
  const [sentAlerts, setSentAlerts] = useState<string[]>([]);

  const gisData = getOfflineGISData();

  const handleBroadcastAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setSentAlerts((prev) => [alertTitle, ...prev]);
    alert("Emergency Alert Broadcasted to District Health Channels!");
  };

  const handleDownloadPDFReport = () => {
    const reportText = `
===================================================================
MINISTRY OF DEVELOPMENT OF NORTH EASTERN REGION (MDoNER)
DISTRICT HEALTH SURVEILLANCE REPORT - SIH 2025
===================================================================
District: ${district} | State: Assam
Report ID: REP-MDoNER-20260805120000
Generated At: 05 August 2026, 12:00 IST

SUMMARY METRICS:
- Monitored Rural Villages: ${gisData.villages.length}
- Active Cholera & Diarrhea Outbreak Zones: 3 Villages (Sonapur, Chandrapur, Lakhipur)
- Highest Risk Score: Sonapur Village (86.4 / 100 - CRITICAL)
- Contaminated Water Sources: 2 River Stream Intake Points
- Bed Capacity Available: 132 Beds (GMCH & Sonapur PHC)

RECOMMENDED DISTRICT INTERVENTIONS:
1. Immediate super-chlorination of river intake pump reservoirs.
2. Deployment of 2,000 ORS sachets & 500 Halazone strips from district medical store.
3. Mobile PHC medical unit deployment to Sonapur sub-center.

Authority Signatory: Dr. Hemanta Gogoi, District Medical Officer (DHO)
===================================================================
    `;
    const element = document.createElement("a");
    const file = new Blob([reportText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `District_Health_Surveillance_Report_${district}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8 py-2">

      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-amber-950/60 text-amber-200 border border-amber-400/40">
            District Medical Officer Command
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">Kamrup Metro Epidemic Control Center</h1>
        </div>

        <button
          onClick={handleDownloadPDFReport}
          className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-amber-50 transition-colors flex items-center gap-2 self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-amber-600" />
          <span>Export Surveillance Report</span>
        </button>
      </div>

      {/* Key District Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="text-slate-500 font-bold uppercase">District Risk Index</div>
          <div className="text-2xl font-black text-rose-500 mt-1">78.5 / 100</div>
          <div className="text-[10px] text-rose-400 mt-0.5">High Monsoonal Vulnerability</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="text-slate-500 font-bold uppercase">Active Outbreak Villages</div>
          <div className="text-2xl font-black text-amber-500 mt-1">3 Villages</div>
          <div className="text-[10px] text-amber-400 mt-0.5">Sonapur, Chandrapur, Lakhipur</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="text-slate-500 font-bold uppercase">Unsafe Water Intakes</div>
          <div className="text-2xl font-black text-cyan-500 mt-1">2 Sources</div>
          <div className="text-[10px] text-cyan-400 mt-0.5">E. Coli Positive</div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <div className="text-slate-500 font-bold uppercase">Available Hospital Beds</div>
          <div className="text-2xl font-black text-emerald-500 mt-1">132 Beds</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">GMCH & Sonapur PHC</div>
        </div>
      </div>

      {/* GIS Command Map */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-amber-500" />
          District GIS Hotspot Surveillance Map
        </h2>
        <OutbreakMap selectedDistrict={district} />
      </div>

      {/* Emergency Alert Broadcaster */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center space-x-2 text-rose-500 font-bold text-base border-b border-slate-200 dark:border-slate-800 pb-3">
            <AlertOctagon className="w-5 h-5" />
            <span>Emergency District Alert Broadcaster</span>
          </div>

          <form onSubmit={handleBroadcastAlert} className="space-y-3">
            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300">Alert Title</label>
              <input type="text" value={alertTitle} onChange={(e) => setAlertTitle(e.target.value)} className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white" />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300">Alert Message Body</label>
              <textarea rows={3} value={alertMsg} onChange={(e) => setAlertMsg(e.target.value)} className="w-full mt-1 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white" />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Broadcast Alert to All ASHA & Citizen Channels</span>
            </button>
          </form>
        </div>

        {/* Sent Alerts Log */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
          <h3 className="font-bold text-sm text-white">Recent Broadcasted District Warnings</h3>
          <div className="space-y-2">
            {sentAlerts.length > 0 ? (
              sentAlerts.map((title, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2 text-rose-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{title}</span>
                </div>
              ))
            ) : (
              <div className="text-slate-400 text-[11px] italic">No warnings broadcasted in last 24h.</div>
            )}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 text-[11px]">
              ⚠️ CRITICAL: Cholera Outbreak Alert - Sonapur Sector (Broadcasted 3h ago)
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-amber-300 text-[11px]">
              ⚠️ HIGH RISK: Typhoid Surge - Lakhipur Sector (Broadcasted 1d ago)
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
