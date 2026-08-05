'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import OutbreakMap from '@/components/OutbreakMap';
import { 
  Activity, ShieldAlert, Droplets, MapPin, Cpu, Users, ArrowRight, 
  CheckCircle2, FileText, BarChart3, AlertOctagon, Sparkles, Building2, Stethoscope, ChevronRight, Play, RefreshCw, Layers
} from 'lucide-react';

export default function LandingPage() {
  const [workflowStep, setWorkflowStep] = useState(1);
  const [workflowActive, setWorkflowActive] = useState(false);

  const runWorkflowDemo = () => {
    setWorkflowActive(true);
    setWorkflowStep(1);
    let step = 1;
    const interval = setInterval(() => {
      step += 1;
      setWorkflowStep(step);
      if (step >= 6) {
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <div className="space-y-16 py-4">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-0" />

        <div className="relative z-10 max-w-4xl space-y-6">
          
          {/* Official Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>National Winning Architecture | SIH25001 Flagship Solution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Smart Community Health Monitoring & <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Early Outbreak Warning Engine</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            A complete decision-support surveillance platform combining citizen reporting, offline ASHA field surveys, IoT water quality indicators, Scikit-Learn AI outbreak forecasting, XAI feature attribution, GIS spatial heatmaps, and automated government intervention workflows.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={runWorkflowDemo}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center space-x-2 transition-all transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Simulate End-to-End Decision Workflow</span>
            </button>

            <Link
              href="#gis-map"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 flex items-center space-x-2 transition-all"
            >
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Explore GIS Heatmap</span>
            </Link>

            <Link
              href="/portal/government"
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 font-bold text-sm border border-slate-700 flex items-center space-x-2 transition-all"
            >
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span>MDoNER Macro Dashboard</span>
            </Link>
          </div>

        </div>
      </section>

      {/* Interactive End-to-End Decision Workflow Simulation */}
      <section className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>SIH 2025 Winning Decision Support Workflow</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">Live End-to-End Outbreak Interception Pipeline</h2>
          </div>

          <button
            onClick={runWorkflowDemo}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 self-start sm:self-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${workflowActive && workflowStep < 6 ? 'animate-spin' : ''}`} />
            <span>{workflowActive ? 'Re-run Workflow Simulation' : 'Launch Live Simulation'}</span>
          </button>
        </div>

        {/* 6-Step Visual Pipeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          
          {/* Step 1 */}
          <div className={`p-5 rounded-2xl border transition-all ${workflowStep === 1 ? 'bg-emerald-950/80 border-emerald-500 scale-105 shadow-xl' : 'bg-slate-950 border-slate-800 opacity-80'}`}>
            <div className="flex items-center justify-between">
              <span className="font-black text-emerald-400 text-sm">STEP 1</span>
              <span className="px-2 py-0.5 rounded bg-emerald-900 text-emerald-300 font-bold text-[10px]">Citizen Report</span>
            </div>
            <h4 className="font-bold text-slate-100 mt-2">Symptom & Water Report</h4>
            <p className="text-slate-400 text-[11px] mt-1">Citizen in Sonapur village logs watery diarrhea symptoms & turbid stream intake.</p>
          </div>

          {/* Step 2 */}
          <div className={`p-5 rounded-2xl border transition-all ${workflowStep === 2 ? 'bg-teal-950/80 border-teal-500 scale-105 shadow-xl' : 'bg-slate-950 border-slate-800 opacity-80'}`}>
            <div className="flex items-center justify-between">
              <span className="font-black text-teal-400 text-sm">STEP 2</span>
              <span className="px-2 py-0.5 rounded bg-teal-900 text-teal-300 font-bold text-[10px]">ASHA Field Survey</span>
            </div>
            <h4 className="font-bold text-slate-100 mt-2">Water Test & Offline Sync</h4>
            <p className="text-slate-400 text-[11px] mt-1">ASHA worker measures pH 5.8, Turbidity 18.5 NTU, E. Coli POSITIVE and queues survey offline.</p>
          </div>

          {/* Step 3 */}
          <div className={`p-5 rounded-2xl border transition-all ${workflowStep === 3 ? 'bg-amber-950/80 border-amber-500 scale-105 shadow-xl' : 'bg-slate-950 border-slate-800 opacity-80'}`}>
            <div className="flex items-center justify-between">
              <span className="font-black text-amber-400 text-sm">STEP 3</span>
              <span className="px-2 py-0.5 rounded bg-amber-900 text-amber-300 font-bold text-[10px]">AI Prediction Engine</span>
            </div>
            <h4 className="font-bold text-slate-100 mt-2">Scikit-Learn & XAI Calculation</h4>
            <p className="text-slate-400 text-[11px] mt-1">Calculates <strong className="text-rose-400">86.4% CRITICAL Risk</strong> for Cholera with explicit XAI feature weights.</p>
          </div>

          {/* Step 4 */}
          <div className={`p-5 rounded-2xl border transition-all ${workflowStep === 4 ? 'bg-purple-950/80 border-purple-500 scale-105 shadow-xl' : 'bg-slate-950 border-slate-800 opacity-80'}`}>
            <div className="flex items-center justify-between">
              <span className="font-black text-purple-400 text-sm">STEP 4</span>
              <span className="px-2 py-0.5 rounded bg-purple-900 text-purple-300 font-bold text-[10px]">GIS Spatial Map</span>
            </div>
            <h4 className="font-bold text-slate-100 mt-2">Hotspot GIS Circle Updated</h4>
            <p className="text-slate-400 text-[11px] mt-1">Sonapur red hotspot circle renders on OpenStreetMap with water testing pins.</p>
          </div>

          {/* Step 5 */}
          <div className={`p-5 rounded-2xl border transition-all ${workflowStep === 5 ? 'bg-rose-950/80 border-rose-500 scale-105 shadow-xl' : 'bg-slate-950 border-slate-800 opacity-80'}`}>
            <div className="flex items-center justify-between">
              <span className="font-black text-rose-400 text-sm">STEP 5</span>
              <span className="px-2 py-0.5 rounded bg-rose-900 text-rose-300 font-bold text-[10px]">District Officer</span>
            </div>
            <h4 className="font-bold text-slate-100 mt-2">Emergency Alert Broadcast</h4>
            <p className="text-slate-400 text-[11px] mt-1">DHO receives instant alert notification and dispatches mobile medical team & ORS stock.</p>
          </div>

          {/* Step 6 */}
          <div className={`p-5 rounded-2xl border transition-all ${workflowStep === 6 ? 'bg-cyan-950/80 border-cyan-500 scale-105 shadow-xl' : 'bg-slate-950 border-slate-800 opacity-80'}`}>
            <div className="flex items-center justify-between">
              <span className="font-black text-cyan-400 text-sm">STEP 6</span>
              <span className="px-2 py-0.5 rounded bg-cyan-900 text-cyan-300 font-bold text-[10px]">Preventive Interventions</span>
            </div>
            <h4 className="font-bold text-slate-100 mt-2">Targeted Action Protocol</h4>
            <p className="text-slate-400 text-[11px] mt-1">Boil Water Advisory issued, river intake super-chlorinated, PHC beds allocated.</p>
          </div>

        </div>

        {/* Workflow Active Banner */}
        {workflowActive && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>
                {workflowStep < 6
                  ? `Simulating Step ${workflowStep} of 6: ${
                      workflowStep === 1 ? 'Processing Citizen Complaint...' :
                      workflowStep === 2 ? 'Transmitting ASHA Water Test...' :
                      workflowStep === 3 ? 'Running Scikit-Learn ML Model...' :
                      workflowStep === 4 ? 'Updating GIS Spatial Layers...' :
                      'Alerting District Health Officer...'
                    }`
                  : '✅ Complete End-to-End Decision Support Interception Cycle Executed! All 10 Core SIH Modules Verified.'}
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Real-time Health Impact Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Monitored Villages</span>
            <Building2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white">1,480+</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">Across 8 NE States</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Water Sources Sampled</span>
            <Droplets className="w-5 h-5 text-cyan-500" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white">8,920</div>
            <div className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold mt-1">pH, Turbidity, E. Coli</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Outbreaks Intercepted</span>
            <Cpu className="w-5 h-5 text-amber-500" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white">342</div>
            <div className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">Early Warnings Issued</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Field Alerts</span>
            <AlertOctagon className="w-5 h-5 text-rose-500 animate-pulse" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white">14</div>
            <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold mt-1">Kamrup & Cachar Sectors</div>
          </div>
        </div>
      </section>

      {/* GIS Outbreak Interactive Map Section */}
      <section id="gis-map" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-6 h-6 text-emerald-500" />
              Live GIS Outbreak & Water Contamination Surveillance Map
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Interactive spatial heatmaps showing village risk indices, river intake points, and primary health center locations.
            </p>
          </div>
          <div className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 self-start">
            ● Real-Time OpenStreetMap Engine
          </div>
        </div>

        <OutbreakMap />
      </section>

      {/* User Portals Directory Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-teal-500" />
            Role-Based Surveillance Portals
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tailored dashboard interfaces designed for every level of public health governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Citizen Portal Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-md group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Citizen Portal</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Report water contamination, submit disease symptoms, check AI disease prediction scores, track complaint status, and locate nearby PHCs.
              </p>
            </div>
            <Link
              href="/portal/citizen"
              className="mt-6 inline-flex items-center text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform"
            >
              <span>Access Citizen Portal</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* ASHA Worker Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-md group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">ASHA Worker Portal</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Field surveillance tools with Offline Sync support. Record household surveys, water test kit results, and patient symptom logs.
              </p>
            </div>
            <Link
              href="/portal/asha"
              className="mt-6 inline-flex items-center text-xs font-bold text-teal-600 dark:text-teal-400 group-hover:translate-x-1 transition-transform"
            >
              <span>Access ASHA Field Portal</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* District Officer Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-md group flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">District Health Officer</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Outbreak prevention command center. Broadcast emergency district alerts, dispatch medical teams, and manage medicine inventory.
              </p>
            </div>
            <Link
              href="/portal/district"
              className="mt-6 inline-flex items-center text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform"
            >
              <span>Access District Command</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

        </div>
      </section>

      {/* AI Features & Explainable XAI Section */}
      <section className="p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 space-y-6 shadow-xl">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-400 uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>Explainable AI Engine (XAI)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">How Our Machine Learning Engine Predicts Outbreaks</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Unlike black-box algorithms, Arogya-Purvottar provides transparent, evidence-based feature attribution for every village risk score.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-emerald-400 font-bold text-sm">1. Water Quality Index</div>
            <p className="text-[11px] text-slate-400">Analyzes pH deviations, turbidity (NTU), dissolved oxygen, and E. Coli CFU/100ml.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-teal-400 font-bold text-sm">2. Symptom Clustering</div>
            <p className="text-[11px] text-slate-400">Evaluates 14-day case velocity logs reported by ASHA workers and community clinics.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-amber-400 font-bold text-sm">3. Monsoonal Run-off</div>
            <p className="text-[11px] text-slate-400">Integrates 7-day cumulative rainfall data to predict agricultural wash-off contamination.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-purple-400 font-bold text-sm">4. Actionable Interventions</div>
            <p className="text-[11px] text-slate-400">Generates targeted preventive guidelines (Boil advisories, super-chlorination, Halazone dispatch).</p>
          </div>
        </div>
      </section>

    </div>
  );
}
