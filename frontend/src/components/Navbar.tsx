'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/lib/theme';
import { translations, Language } from '@/lib/i18n';
import { Sun, Moon, Activity, Globe, Shield, User, LogOut, ChevronDown, Bell, MapPin } from 'lucide-react';
import { UserRole } from '@/lib/types';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [lang, setLang] = useState<Language>('en');
  const [activeRole, setActiveRole] = useState<UserRole | null>(null);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const t = translations[lang];

  const handleRoleSelect = (role: UserRole, targetPath: string) => {
    setActiveRole(role);
    setIsRoleDropdownOpen(false);
    // Store user session in localStorage
    const demoUser = {
      id: 101,
      full_name: role === 'CITIZEN' ? 'Ramesh Das' : role === 'ASHA_WORKER' ? 'Anita Devi (ASHA)' : role === 'PHC_STAFF' ? 'Dr. Prabal Das' : role === 'DISTRICT_OFFICER' ? 'Dr. Hemanta Gogoi (DHO)' : 'Shri J. K. Sharma (MDoNER Sec)',
      email: `${role.toLowerCase()}@arogya.gov.in`,
      role: role,
      state: 'Assam',
      district: 'Kamrup Metropolitan'
    };
    localStorage.setItem('arogya_user', JSON.stringify(demoUser));
    router.push(targetPath);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Official Government Top Banner */}
      <div className="w-full bg-gradient-to-r from-orange-600 via-white to-emerald-600 dark:from-orange-700 dark:via-slate-900 dark:to-emerald-700 text-[11px] font-semibold text-slate-800 dark:text-slate-200 px-4 py-1 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>{t.mdonerHeader}</span>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-orange-500" /> Coverage: All 8 North Eastern States</span>
          <span>Emergency Hotline: 108 / 104</span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
                {t.appTitle}
              </span>
              <span className="text-[10px] uppercase font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                SIH 2025
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              MDoNER Water-Borne Disease Early Warning System
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center space-x-4 text-sm font-medium text-slate-700 dark:text-slate-200">
          <Link href="/" className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${pathname === '/' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
            Home
          </Link>
          <Link href="/water-quality" className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 ${pathname === '/water-quality' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
            💧 Water
          </Link>
          <Link href="/simulation" className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${pathname === '/simulation' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
            ⚠ Simulation
          </Link>
          <Link href="/analytics" className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${pathname === '/analytics' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
            📊 Analytics
          </Link>
          <Link href="/ai-assistant" className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${pathname === '/ai-assistant' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
            🤖 AI Assistant
          </Link>
          <Link href="/notifications" className={`relative hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${pathname === '/notifications' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
            🔔 Alerts
          </Link>
          <Link href="/reports" className={`hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${pathname === '/reports' ? 'text-emerald-600 dark:text-emerald-400 font-bold' : ''}`}>
            📋 Reports
          </Link>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          {/* Language Switcher */}
          <div className="relative flex items-center bg-slate-100 dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
            <Globe className="w-3.5 h-3.5 ml-1 text-slate-500 dark:text-slate-400" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Language)}
              className="bg-transparent text-slate-700 dark:text-slate-200 pl-1 pr-2 py-0.5 outline-none cursor-pointer text-xs"
            >
              <option value="en" className="bg-white dark:bg-slate-900">English</option>
              <option value="as" className="bg-white dark:bg-slate-900">অসমীয়া</option>
              <option value="bn" className="bg-white dark:bg-slate-900">বাংলা</option>
              <option value="mni" className="bg-white dark:bg-slate-900">মৈতৈ</option>
              <option value="nag" className="bg-white dark:bg-slate-900">Nagamese</option>
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Light Theme"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>

          {/* Quick Demo Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-md shadow-emerald-600/20 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{activeRole ? activeRole : 'Demo Role Switch'}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Select User Role Portal
                </div>
                <button
                  onClick={() => handleRoleSelect('CITIZEN', '/portal/citizen')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-emerald-50 dark:hover:bg-emerald-950/50 flex items-center justify-between text-slate-700 dark:text-slate-200"
                >
                  <span className="font-semibold">{t.citizenPortalName}</span>
                  <span className="text-[10px] text-slate-400">Public</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('ASHA_WORKER', '/portal/asha')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-emerald-50 dark:hover:bg-emerald-950/50 flex items-center justify-between text-slate-700 dark:text-slate-200"
                >
                  <span className="font-semibold">{t.ashaPortalName}</span>
                  <span className="text-[10px] text-emerald-500">Offline Sync</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('PHC_STAFF', '/portal/phc')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-emerald-50 dark:hover:bg-emerald-950/50 flex items-center justify-between text-slate-700 dark:text-slate-200"
                >
                  <span className="font-semibold">{t.phcPortalName}</span>
                  <span className="text-[10px] text-teal-500">Medical</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('DISTRICT_OFFICER', '/portal/district')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-emerald-50 dark:hover:bg-emerald-950/50 flex items-center justify-between text-slate-700 dark:text-slate-200"
                >
                  <span className="font-semibold">{t.districtPortalName}</span>
                  <span className="text-[10px] text-amber-500">GIS Command</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('GOVT_ADMIN', '/portal/government')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-emerald-50 dark:hover:bg-emerald-950/50 flex items-center justify-between text-slate-700 dark:text-slate-200"
                >
                  <span className="font-semibold">{t.govtPortalName}</span>
                  <span className="text-[10px] text-purple-500">Executive</span>
                </button>
                <button
                  onClick={() => handleRoleSelect('SYS_ADMIN', '/portal/admin')}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-emerald-50 dark:hover:bg-emerald-950/50 flex items-center justify-between text-slate-700 dark:text-slate-200 border-t border-slate-100 dark:border-slate-800"
                >
                  <span className="font-semibold">{t.adminPortalName}</span>
                  <span className="text-[10px] text-rose-500">System</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
