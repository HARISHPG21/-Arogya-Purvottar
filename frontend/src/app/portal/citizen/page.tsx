'use client';

import React, { useState } from 'react';
import { submitHealthComplaint, requestAIPrediction } from '@/lib/mockApi';
import { PredictionResult } from '@/lib/types';
import { AlertCircle, CheckCircle2, Droplets, Cpu, MapPin, Phone, Send, Sparkles, Shield, Clock } from 'lucide-react';

export default function CitizenPortal() {
  const [activeTab, setActiveTab] = useState<'REPORT' | 'PREDICT' | 'STATUS' | 'PHCS'>('REPORT');

  // Report Form State
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('32');
  const [gender, setGender] = useState('Male');
  const [village, setVillage] = useState('Sonapur');
  const [district, setDistrict] = useState('Kamrup Metropolitan');
  const [symptoms, setSymptoms] = useState('Watery diarrhea, vomiting, severe dehydration');
  const [waterSource, setWaterSource] = useState('Brahmaputra Stream Intake');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // AI Predictor State
  const [predVillage, setPredVillage] = useState('Sonapur');
  const [predDistrict, setPredDistrict] = useState('Kamrup Metropolitan');
  const [ph, setPh] = useState('5.8');
  const [turbidity, setTurbidity] = useState('18.5');
  const [cfu, setCfu] = useState('240');
  const [ecoli, setEcoli] = useState(true);
  const [recentCases, setRecentCases] = useState('8');
  const [predicting, setPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  const handleSubmitComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await submitHealthComplaint({
      patient_name: patientName || 'Anonymous Citizen',
      patient_age: parseInt(age),
      patient_gender: gender,
      village_name: village,
      district_name: district,
      symptoms: symptoms,
      water_source_used: waterSource
    });
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  const handleCalculatePrediction = async () => {
    setPredicting(true);
    const res = await requestAIPrediction({
      village_name: predVillage,
      district_name: predDistrict,
      ph_level: parseFloat(ph),
      turbidity_ntu: parseFloat(turbidity),
      bacterial_cfu: parseFloat(cfu),
      e_coli_presence: ecoli,
      recent_symptom_cases_14d: parseInt(recentCases)
    });
    setPredictionResult(res);
    setPredicting(false);
  };

  return (
    <div className="space-y-8 py-2">

      {/* Citizen Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded bg-emerald-950/60 text-emerald-200 border border-emerald-400/40">
            Public Citizen Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black mt-1">Community Health & Water Contamination Desk</h1>
          <p className="text-xs text-emerald-100 mt-1">
            Report water-borne symptoms, request AI risk predictions, and locate nearest emergency healthcare facilities.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md flex items-center gap-1.5 border border-white/20">
            <Phone className="w-3.5 h-3.5 text-amber-300" />
            <span>Emergency 108</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('REPORT')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'REPORT' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Submit Complaint
        </button>
        <button
          onClick={() => setActiveTab('PREDICT')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'PREDICT' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Cpu className="w-3.5 h-3.5" />
          <span>AI Disease Predictor</span>
        </button>
        <button
          onClick={() => setActiveTab('STATUS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'STATUS' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Track Complaints
        </button>
        <button
          onClick={() => setActiveTab('PHCS')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'PHCS' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          Nearby PHCs & Beds
        </button>
      </div>

      {/* Tab 1: Submit Health & Water Complaint */}
      {activeTab === 'REPORT' && (
        <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Submit Water & Symptom Complaint</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Reports are routed instantly to assigned ASHA workers and PHC medical officers.</p>
            </div>
          </div>

          {submitSuccess && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Complaint successfully registered! Complaint ID: #CMP-{Math.floor(Math.random() * 8999 + 1000)}. Assigned to Sonapur PHC.</span>
            </div>
          )}

          <form onSubmit={handleSubmitComplaint} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Ramesh Das"
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Village</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">District</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300">Water Source Used</label>
              <input
                type="text"
                value={waterSource}
                onChange={(e) => setWaterSource(e.target.value)}
                placeholder="e.g. River Stream, Community Tube Well, Pond"
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-700 dark:text-slate-300">Observed Symptoms / Description</label>
              <textarea
                rows={3}
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSubmitting ? 'Registering Complaint...' : 'Submit Health & Water Complaint'}</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: AI Disease Prediction Tool */}
      {activeTab === 'PREDICT' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Input Form */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-bold">
              <Cpu className="w-5 h-5" />
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">AI Outbreak Risk Engine</h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              Input local water test parameters to run Scikit-Learn risk inference and generate Explainable AI (XAI) factors.
            </p>

            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold">Village</label>
                  <input type="text" value={predVillage} onChange={(e) => setPredVillage(e.target.value)} className="w-full mt-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                </div>
                <div>
                  <label className="font-semibold">District</label>
                  <input type="text" value={predDistrict} onChange={(e) => setPredDistrict(e.target.value)} className="w-full mt-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold">Water pH</label>
                  <input type="text" value={ph} onChange={(e) => setPh(e.target.value)} className="w-full mt-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                </div>
                <div>
                  <label className="font-semibold">Turbidity (NTU)</label>
                  <input type="text" value={turbidity} onChange={(e) => setTurbidity(e.target.value)} className="w-full mt-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                </div>
                <div>
                  <label className="font-semibold">Bacterial CFU</label>
                  <input type="text" value={cfu} onChange={(e) => setCfu(e.target.value)} className="w-full mt-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                <span className="font-semibold">E. Coli Bacteria Presence?</span>
                <button
                  type="button"
                  onClick={() => setEcoli(!ecoli)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs ${ecoli ? 'bg-rose-600 text-white' : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}
                >
                  {ecoli ? 'DETECTED (UNSAFE)' : 'ABSENT (SAFE)'}
                </button>
              </div>

              <div>
                <label className="font-semibold">14-Day Symptom Cases in Village</label>
                <input type="number" value={recentCases} onChange={(e) => setRecentCases(e.target.value)} className="w-full mt-1 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
              </div>

              <button
                onClick={handleCalculatePrediction}
                disabled={predicting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{predicting ? 'Executing Scikit-Learn Model...' : 'Calculate AI Risk & XAI Analysis'}</span>
              </button>
            </div>
          </div>

          {/* AI Output Card */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <Shield className="w-5 h-5 text-emerald-400" />
                AI Prediction Assessment
              </h3>
              <span className="text-[10px] text-slate-400 font-medium">Confidence: 91.2%</span>
            </div>

            {predictionResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Predicted Suspected Disease</div>
                    <div className="text-xl font-black text-rose-400">{predictionResult.predicted_disease}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">Outbreak Probability</div>
                    <div className="text-2xl font-black text-amber-400">{predictionResult.outbreak_probability}%</div>
                  </div>
                </div>

                <div>
                  <div className="font-bold text-slate-300 mb-2">Explainable AI (XAI) Risk Factor Attribution:</div>
                  <div className="space-y-2">
                    {predictionResult.explainable_factors.map((f, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="font-bold text-slate-200">{f.factor}</div>
                          <div className="text-[10px] text-slate-400">{f.description}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-rose-950 text-rose-300 font-bold text-[10px]">{f.contribution}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="font-bold text-emerald-400 mb-2">Recommended Preventive Interventions:</div>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-300">
                    {predictionResult.preventive_recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-500 space-y-2">
                <Cpu className="w-10 h-10 text-slate-700 animate-pulse" />
                <p>Click "Calculate AI Risk" to trigger real-time ML risk analysis.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 3: Complaint Tracking */}
      {activeTab === 'STATUS' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 text-xs">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Community Complaint Tracking</h3>
          
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900 dark:text-white">#CMP-4921 - Sonapur River Intake Contamination</span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[10px]">INVESTIGATING</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 mt-1">Reported Symptoms: Watery Diarrhea, Vomiting | Water Source: Brahmaputra Stream</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Assigned to: Anita Devi (ASHA) & Sonapur PHC Team</div>
              </div>
              <span className="text-[10px] text-slate-400">2 Hours Ago</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-900 dark:text-white">#CMP-3810 - Chandrapur Tube Well #3 High Turbidity</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">RESOLVED</span>
                </div>
                <div className="text-slate-500 dark:text-slate-400 mt-1">Super-chlorination tablets deployed to tube well pump site.</div>
              </div>
              <span className="text-[10px] text-slate-400">1 Day Ago</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Nearby Health Centers */}
      {activeTab === 'PHCS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Sonapur Primary Health Centre (PHC)</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">12 Beds Available</span>
            </div>
            <div className="text-slate-500 dark:text-slate-400 space-y-1">
              <p><strong>Location:</strong> Sonapur Main Road, Kamrup Metro (Assam)</p>
              <p><strong>Isolation Ward Beds:</strong> 8 Beds</p>
              <p><strong>Medical Officer In-Charge:</strong> Dr. Prabal Das</p>
              <p><strong>Helpline:</strong> +91-361-2890123</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Gauhati Medical College & Hospital (GMCH)</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">120 Beds Available</span>
            </div>
            <div className="text-slate-500 dark:text-slate-400 space-y-1">
              <p><strong>Location:</strong> Narakasur Hilltop, Bhangagarh, Guwahati</p>
              <p><strong>Isolation Ward Beds:</strong> 45 Beds</p>
              <p><strong>Medical Officer In-Charge:</strong> Dr. A. C. Kataki</p>
              <p><strong>Helpline:</strong> +91-361-2529457</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
