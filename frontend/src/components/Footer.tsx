'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, ShieldCheck, Heart, MapPin, Phone, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white tracking-wide">Arogya-Purvottar</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Smart Community Health Monitoring & Early Warning System for Water-Borne Diseases in Rural Northeast India. Developed for Smart India Hackathon (SIH 2025) Problem Statement SIH25001.
          </p>
          <div className="flex items-center space-x-2 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Ministry of Development of North Eastern Region (MDoNER)</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-3 text-xs">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Surveillance Portals</h4>
          <ul className="space-y-2">
            <li><Link href="/portal/citizen" className="hover:text-emerald-400 transition-colors">Citizen Symptom & Water Report</Link></li>
            <li><Link href="/portal/asha" className="hover:text-emerald-400 transition-colors">ASHA Field Survey & Offline Sync</Link></li>
            <li><Link href="/portal/phc" className="hover:text-emerald-400 transition-colors">PHC Medical Inventory & Beds</Link></li>
            <li><Link href="/portal/district" className="hover:text-emerald-400 transition-colors">District Outbreak GIS Command</Link></li>
            <li><Link href="/portal/government" className="hover:text-emerald-400 transition-colors">MDoNER Macro Analytics</Link></li>
          </ul>
        </div>

        {/* NE States Covered */}
        <div className="space-y-3 text-xs">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Northeast Coverage</h4>
          <div className="grid grid-cols-2 gap-1.5 text-slate-400">
            <span>• Assam</span>
            <span>• Meghalaya</span>
            <span>• Tripura</span>
            <span>• Manipur</span>
            <span>• Nagaland</span>
            <span>• Mizoram</span>
            <span>• Arunachal Pradesh</span>
            <span>• Sikkim</span>
          </div>
        </div>

        {/* Emergency Contacts */}
        <div className="space-y-3 text-xs">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Emergency Helplines</h4>
          <div className="space-y-2 text-slate-300">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>National Health Helpline: <strong>108 / 104</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>MDoNER HQ: Vigyan Bhawan Annexe, New Delhi</span>
            </div>
            <div className="pt-2 text-[11px] text-slate-500">
              Integrated with Jal Jeevan Mission & National Vector Borne Disease Control Programme (NVBDCP).
            </div>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <div>
          © 2025-2026 Government of India — Ministry of Development of North Eastern Region (MDoNER). SIH 2025 Official Entry SIH25001.
        </div>
        <div className="mt-2 sm:mt-0 flex items-center space-x-1">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          <span>for Rural Northeast India Healthcare.</span>
        </div>
      </div>
    </footer>
  );
}
