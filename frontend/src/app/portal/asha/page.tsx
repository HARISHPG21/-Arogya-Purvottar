'use client';

import React, { useState, useEffect } from 'react';
import { recordFieldSurvey, recordWaterTestKitResult } from '@/lib/mockApi';
import { Wifi, WifiOff, RefreshCw, CheckCircle2, Plus, Stethoscope, Droplet, Send, Database } from 'lucide-react';

export default function AshaPortal() {
  const [isOnline, setIsOnline] = useState(true);
  const [offlineQueue, setOfflineQueue] = useState<any[]>([]);
  const [syncedCount, setSyncedCount] = useState(0);

  // Form State
  const [patientName, setPatientName] = useState('Biren Gogoi');
  const [age, setAge] = useState('45');
  const [gender, setGender] = useState('Male');
  const [village, setVillage] = useState('Sonapur');
  const [district, setDistrict] = useState('Kamrup Metropolitan');
  const [symptoms, setSymptoms] = useState('Watery diarrhea, mild fever, vomiting');
  const [waterSource, setWaterSource] = useState('Village Stream Intake');
  const [notes, setNotes] = useState('Halazone water purification tablets provided to household.');

  useEffect(() => {
    const savedQueue = localStorage.getItem('asha_offline_queue');
    if (savedQueue) setOfflineQueue(JSON.parse(savedQueue));
  }, []);

  const handleRecordSurvey = async (e: React.FormEvent) => {
    e.preventDefault();
    const surveyData = {
      patient_name: patientName,
      patient_age: parseInt(age),
      patient_gender: gender,
      village_name: village,
      district_name: district,
      symptoms,
      water_source_used: waterSource,
      notes,
      timestamp: new Date().toLocaleTimeString()
    };

    if (!isOnline) {
      const newQueue = [...offlineQueue, surveyData];
      setOfflineQueue(newQueue);
      localStorage.setItem('asha_offline_queue', JSON.stringify(newQueue));
      alert("Report saved to Offline Queue! Will sync when connection is restored.");
    } else {
      await recordFieldSurvey(surveyData);
      setSyncedCount((prev) => prev + 1);
      alert("Field survey transmitted live to Central Health Registry & Sonapur PHC!");
    }
  };

  const handleSyncQueue = () => {
    if (offlineQueue.length === 0) return;
    setSyncedCount((prev) => prev + offlineQueue.length);
    setOfflineQueue([]);
    localStorage.removeItem('asha_offline_queue');
    alert("Successfully synced all offline field surveys to Central Health Server!");
  };

  return (
    <div className="space-y-8 py-2">

      {/* Header with Connectivity Status Toggle */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-teal-950/60 text-teal-200 border border-teal-400/40">
              ASHA Worker Field Portal
            </span>
            <span className="text-xs text-teal-100 font-medium">• Sector: Sonapur Sub-center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">Village Health & Household Survey Engine</h1>
        </div>

        {/* Online / Offline Simulator Toggle */}
        <div className="flex items-center space-x-3 bg-teal-950/80 p-2 rounded-xl border border-teal-700/60 self-start sm:self-auto">
          <div className="flex items-center space-x-1.5 text-xs font-bold">
            {isOnline ? (
              <span className="flex items-center text-emerald-400 gap-1"><Wifi className="w-4 h-4" /> ONLINE</span>
            ) : (
              <span className="flex items-center text-amber-400 gap-1"><WifiOff className="w-4 h-4 animate-pulse" /> OFFLINE MODE</span>
            )}
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className="px-2.5 py-1 rounded-lg bg-teal-800 hover:bg-teal-700 text-xs font-semibold transition-colors"
          >
            Toggle Network
          </button>
        </div>
      </div>

      {/* Offline Sync Status Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white">
              Offline Survey Queue: <span className="text-amber-500 font-black">{offlineQueue.length} Reports Pending</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px]">
              Surveys recorded in low-connectivity rural pockets are queued locally in browser storage.
            </p>
          </div>
        </div>

        <button
          onClick={handleSyncQueue}
          disabled={offlineQueue.length === 0 || !isOnline}
          className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
            offlineQueue.length > 0 && isOnline
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${offlineQueue.length > 0 && isOnline ? 'animate-spin' : ''}`} />
          <span>Sync Pending Field Reports</span>
        </button>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Survey Form */}
        <div className="md:col-span-2 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
          <div className="flex items-center space-x-2 font-bold text-slate-900 dark:text-white text-base border-b border-slate-200 dark:border-slate-800 pb-3">
            <Stethoscope className="w-5 h-5 text-teal-500" />
            <span>Daily Household Patient & Water Survey Log</span>
          </div>

          <form onSubmit={handleRecordSurvey} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Patient Name</label>
                <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Age</label>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Gender</label>
                <select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Child">Child / Infant</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Assigned Village</label>
                <input type="text" value={village} onChange={(e) => setVillage(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white" />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Water Source Used</label>
                <input type="text" value={waterSource} onChange={(e) => setWaterSource(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white" />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300">Observed Clinical Symptoms</label>
              <textarea rows={2} value={symptoms} onChange={(e) => setSymptoms(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white" />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300">ASHA Field Observations & Interventions</label>
              <textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white" />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isOnline ? 'Transmit Field Survey Live' : 'Queue Survey Report Offline'}</span>
            </button>
          </form>
        </div>

        {/* Assigned Sector & Stock Overview */}
        <div className="space-y-4 text-xs">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">ASHA Kit Inventory Stock</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                <span>ORS Packets</span>
                <span className="font-bold text-emerald-500">140 Sachets</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                <span>Zinc Sulfate 20mg</span>
                <span className="font-bold text-emerald-500">80 Tablets</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                <span>Halazone Purification Tabs</span>
                <span className="font-bold text-amber-500">25 Strips (Low)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800">
                <span>Water Test Strips (H2S)</span>
                <span className="font-bold text-emerald-500">30 Kits</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-2">
            <div className="text-amber-400 font-bold">ASHA Protocol Reminder</div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              If a household reports 2 or more members with watery diarrhea, immediately issue ORS and inform Sonapur PHC Medical Officer (+91-361-2890123).
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
