'use client';

import React, { useState, useEffect } from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Moon,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  X,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminStore } from '@/store/useAdminStore';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  
  // Store values
  const { adminName, adminEmail, setAdminName } = useAdminStore();
  const [localName, setLocalName] = useState(adminName);

  useEffect(() => {
    if (activeSection === 'Profile') {
      setLocalName(adminName);
    }
  }, [activeSection, adminName]);

  const handleSave = () => {
    setIsSaving(true);
    if (activeSection === 'Profile') {
      setAdminName(localName);
    }
    setTimeout(() => {
      setIsSaving(false);
      setActiveSection(null);
    }, 1000);
  };

  const runDiagnostic = () => {
    setIsDiagnosticRunning(true);
    setTimeout(() => setIsDiagnosticRunning(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-4xl font-black text-[#E1E0CC] uppercase tracking-tighter">Admin Settings</h2>
        <p className="text-primary/40 text-sm font-bold uppercase tracking-widest mt-2">Configure profile, security, and application preferences.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#101010] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden divide-y divide-white/5"
      >
        <SettingSection 
          onClick={() => setActiveSection('Profile')}
          icon={<User className="text-primary" size={20} />} 
          title="Profile Identity" 
          description="Update personal details and public visibility."
        />
        <SettingSection 
          onClick={() => setActiveSection('Notifications')}
          icon={<Bell className="text-primary" size={20} />} 
          title="Alert Protocols" 
          description="Manage real-time alerts and system updates."
        />
        <SettingSection 
          onClick={() => setActiveSection('Security')}
          icon={<Lock className="text-primary" size={20} />} 
          title="Encryption & Security" 
          description="Manage 2FA, keys, and authorization levels."
        />
        <SettingSection 
          onClick={() => setActiveSection('Finance')}
          icon={<CreditCard className="text-primary" size={20} />} 
          title="Fiscal Configuration" 
          description="Manage payment gateways and subscription nodes."
        />
        <SettingSection 
          onClick={() => setActiveSection('Appearance')}
          icon={<Moon className="text-primary" size={20} />} 
          title="Visual Interface" 
          description="Toggle cinematic modes and interface densities."
          last
        />
      </motion.div>

      {/* System Status */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary rounded-[2.5rem] p-10 text-black shadow-2xl shadow-primary/20 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-white/20 transition-all duration-700" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-[1.25rem] bg-black/10 flex items-center justify-center text-black shadow-inner border border-black/5">
            <ShieldCheck size={32} />
          </div>
          <div>
            <h4 className="font-black text-black text-xl uppercase tracking-tighter">Core System Status</h4>
            <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mt-1">All nodes operational. Security scan clean.</p>
          </div>
        </div>
        
        <button 
          onClick={runDiagnostic}
          disabled={isDiagnosticRunning}
          className="px-8 py-4 bg-black text-white font-black rounded-2xl hover:scale-105 transition-all shadow-xl text-[10px] uppercase tracking-widest disabled:opacity-70 flex items-center gap-3 relative z-10 active:scale-95"
        >
          {isDiagnosticRunning ? (
            <>
              <RefreshCw size={16} className="animate-spin" />
              Scanning...
            </>
          ) : (
            'Run Diagnostic'
          )}
        </button>
      </motion.div>

      {/* Settings Modal */}
      <AnimatePresence>
        {activeSection && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#101010] w-full max-w-lg rounded-[3rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[100px] -mr-24 -mt-24" />
              
              <button 
                onClick={() => setActiveSection(null)}
                className="absolute top-8 right-8 text-primary/20 hover:text-primary transition-all p-2 hover:bg-white/5 rounded-xl"
              >
                <X size={24} />
              </button>
              
              <div className="mb-10 relative z-10">
                <h3 className="text-3xl font-black text-[#E1E0CC] uppercase tracking-tighter mb-3">{activeSection} Configuration</h3>
                <p className="text-primary/40 font-bold uppercase tracking-widest text-[10px]">Modify your {activeSection.toLowerCase()} protocol settings.</p>
              </div>

              <div className="space-y-8 relative z-10">
                {activeSection === 'Profile' && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-8 mb-4">
                      <div className="w-24 h-24 rounded-[2rem] bg-primary/10 border border-primary/20 flex items-center justify-center text-3xl font-black text-primary shadow-inner">
                        {localName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <button className="text-primary text-[10px] font-black uppercase tracking-[0.2em] border-b border-primary/20 hover:border-primary transition-all">Upload Identifier</button>
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Authorized Identity Name</label>
                      <input 
                        type="text" 
                        value={localName} 
                        onChange={(e) => setLocalName(e.target.value)}
                        className="w-full px-6 py-5 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:border-primary/50 transition-all text-[#E1E0CC] font-bold" 
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Secure Communication Port (Email)</label>
                      <input type="email" value={adminEmail} readOnly className="w-full px-6 py-5 bg-black/10 border border-white/5 rounded-2xl text-primary/20 cursor-not-allowed font-bold" />
                    </div>
                  </div>
                )}

                {activeSection !== 'Profile' && (
                  <div className="py-16 text-center">
                    <RefreshCw size={48} className="mx-auto text-primary/10 mb-6" />
                    <p className="text-primary/40 font-black uppercase tracking-widest text-xs italic">
                      Advanced {activeSection.toLowerCase()} modules are encrypted.
                    </p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setActiveSection(null)}
                    className="flex-1 py-5 bg-white/5 text-primary/40 font-black rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px] active:scale-95"
                  >
                    Abort
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-[2] py-5 bg-primary text-black font-black rounded-2xl shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-[10px] active:scale-95 flex items-center justify-center gap-3"
                  >
                    {isSaving ? (
                      <RefreshCw size={16} className="animate-spin" />
                    ) : (
                      <>
                        Commit Changes
                        <CheckCircle2 size={16} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SettingSection({ icon, title, description, onClick, last = false }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-8 flex items-center justify-between hover:bg-white/[0.03] transition-all cursor-pointer group relative ${!last ? 'border-b border-white/5' : ''}`}
    >
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 rounded-2xl bg-white/[0.02] flex items-center justify-center border border-white/5 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all text-primary/40 group-hover:text-primary">
          {icon}
        </div>
        <div>
          <h4 className="font-black text-[#E1E0CC] uppercase tracking-tight group-hover:text-primary transition-colors">{title}</h4>
          <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest mt-1">{description}</p>
        </div>
      </div>
      <ChevronRight className="text-primary/10 group-hover:text-primary group-hover:translate-x-2 transition-all" size={24} />
    </div>
  );
}
