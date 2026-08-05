'use client';

import React, { useState } from 'react';
import { Building2, Stethoscope, Pill, Bed, Plus, ShieldCheck, AlertCircle } from 'lucide-react';

export default function PhcPortal() {
  const [bedsAvailable, setBedsAvailable] = useState(12);
  const [isolationBeds, setIsolationBeds] = useState(8);

  const [patients, setPatients] = useState([
    { name: "Biren Gogoi", age: 45, village: "Sonapur", diagnosis: "Cholera (Severe)", bed: "Isolation Ward #3", status: "ADMITTED" },
    { name: "Mamoni Das", age: 28, village: "Chandrapur", diagnosis: "Acute Diarrhoeal Disease", bed: "General Ward #7", status: "STABLE" },
    { name: "Rahul Ali", age: 8, village: "Sonapur", diagnosis: "Typhoid Fever", bed: "Pediatric Ward #2", status: "RECOVERING" }
  ]);

  const [newPatient, setNewPatient] = useState('');
  const [newVillage, setNewVillage] = useState('Sonapur');
  const [newDiagnosis, setNewDiagnosis] = useState('Cholera');

  const handleAdmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient) return;
    setPatients([
      { name: newPatient, age: 34, village: newVillage, diagnosis: newDiagnosis, bed: `Ward #${patients.length + 1}`, status: "ADMITTED" },
      ...patients
    ]);
    setBedsAvailable((prev) => Math.max(0, prev - 1));
    setNewPatient('');
  };

  return (
    <div className="space-y-8 py-2">

      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-teal-950/60 text-teal-200 border border-teal-400/40">
            Primary Health Center Desk
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">Sonapur PHC Clinical Operations</h1>
          <p className="text-xs text-teal-100 mt-1">Medical Officer: Dr. Prabal Das | Sector: Kamrup Metropolitan</p>
        </div>

        <div className="flex items-center space-x-3 bg-teal-950/80 p-3 rounded-xl border border-teal-700/60 text-xs">
          <div>
            <div className="text-[10px] text-slate-300 font-bold uppercase">Bed Availability</div>
            <div className="text-xl font-black text-emerald-400">{bedsAvailable} / 40 Beds Free</div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">

        {/* Patient Admission */}
        <div className="md:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-teal-500" />
              Rapid Patient Clinical Admission & Diagnosis Log
            </h3>

            <form onSubmit={handleAdmit} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Patient Full Name"
                value={newPatient}
                onChange={(e) => setNewPatient(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Village"
                value={newVillage}
                onChange={(e) => setNewVillage(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
              />
              <select
                value={newDiagnosis}
                onChange={(e) => setNewDiagnosis(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
              >
                <option value="Cholera">Cholera</option>
                <option value="Typhoid Fever">Typhoid Fever</option>
                <option value="Bacillary Dysentery">Bacillary Dysentery</option>
                <option value="Acute Diarrhoeal Disease">Acute Diarrhoeal Disease</option>
                <option value="Hepatitis A">Hepatitis A</option>
              </select>
              <button
                type="submit"
                className="sm:col-span-3 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Admit Patient & Update PHC Bed Registry</span>
              </button>
            </form>

            <div className="space-y-2 pt-2">
              <div className="font-bold text-slate-700 dark:text-slate-300">Currently Admitted Water-Borne Cases:</div>
              {patients.map((p, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{p.name} ({p.age} yrs) - {p.village}</div>
                    <div className="text-teal-600 dark:text-teal-400 font-semibold">{p.diagnosis} | Bed: {p.bed}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 font-bold text-[10px]">{p.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medicine Inventory */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Pill className="w-5 h-5 text-emerald-500" />
            PHC Medicine Stock Registry
          </h3>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold">ORS (Oral Rehydration)</div>
                <div className="text-[10px] text-slate-400">Oral Sachets</div>
              </div>
              <span className="font-bold text-emerald-500">1,850 Units</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold">Zinc Sulfate 20mg</div>
                <div className="text-[10px] text-slate-400">Pediatric Tablets</div>
              </div>
              <span className="font-bold text-emerald-500">940 Tabs</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold">Halazone Water Tabs</div>
                <div className="text-[10px] text-slate-400">Purification Strips</div>
              </div>
              <span className="font-bold text-amber-500">120 Strips (Low)</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold">Shanchol Oral Vaccine</div>
                <div className="text-[10px] text-slate-400">Cholera Vaccine Doses</div>
              </div>
              <span className="font-bold text-rose-500">85 Doses (CRITICAL)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
