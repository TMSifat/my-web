'use client';

import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Lock, 
  Globe, 
  Moon,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  X,
  CheckCircle2
} from 'lucide-react';
import { useAdminStore } from '@/store/useAdminStore';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Store values
  const { adminName, adminEmail, setAdminName } = useAdminStore();
  const [localName, setLocalName] = useState(adminName);

  // Keep local name in sync with store when opening
  useEffect(() => {
    if (activeSection === 'Profile') {
      setLocalName(adminName);
    }
  }, [activeSection, adminName]);

  const handleSave = () => {
    setIsSaving(true);
    
    // Actually update the store
    if (activeSection === 'Profile') {
      setAdminName(localName);
    }

    setTimeout(() => {
      setIsSaving(false);
      setActiveSection(null);
    }, 1000);
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Settings</h2>
        <p className="text-slate-500">Configure your profile, security, and application preferences.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
        <SettingSection 
          onClick={() => setActiveSection('Profile')}
          icon={<User className="text-blue-500" />} 
          title="Profile Information" 
          description="Update your personal details and public information."
        />
        <SettingSection 
          onClick={() => setActiveSection('Notifications')}
          icon={<Bell className="text-orange-500" />} 
          title="Notifications" 
          description="Manage how you receive alerts and updates."
        />
        <SettingSection 
          onClick={() => setActiveSection('Security')}
          icon={<Lock className="text-red-500" />} 
          title="Security & Password" 
          description="Protect your account with 2FA and strong passwords."
        />
        <SettingSection 
          onClick={() => setActiveSection('Billing')}
          icon={<CreditCard className="text-green-500" />} 
          title="Billing & Payments" 
          description="Manage your subscription plans and payment methods."
        />
        <SettingSection 
          onClick={() => setActiveSection('Language')}
          icon={<Globe className="text-purple-500" />} 
          title="Language & Region" 
          description="Set your preferred language and local timezone."
        />
        <SettingSection 
          onClick={() => setActiveSection('Appearance')}
          icon={<Moon className="text-slate-400" />} 
          title="Appearance" 
          description="Switch between light and dark mode for your dashboard."
          last
        />
      </div>

      {/* System Status */}
      <div className="bg-orange-50 dark:bg-orange-950/20 rounded-3xl p-8 border border-orange-100 dark:border-orange-900/30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-lg">System Status</h4>
            <p className="text-sm text-slate-500">All systems operational. Last security scan: 2 hours ago.</p>
          </div>
        </div>
        <button className="px-6 py-2.5 bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-800 text-orange-600 font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-all shadow-sm">
          Run Diagnostic
        </button>
      </div>

      {/* Settings Modal */}
      {activeSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
            <button 
              onClick={() => setActiveSection(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="mb-8">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-2">{activeSection} Settings</h3>
              <p className="text-slate-500 text-sm">Configure your {activeSection.toLowerCase()} preferences below.</p>
            </div>

            <div className="space-y-6">
              {activeSection === 'Profile' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-3xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-2xl font-bold text-orange-500">
                      {localName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <button className="text-orange-500 font-bold text-sm hover:underline">Change Photo</button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Display Name</label>
                    <input 
                      type="text" 
                      value={localName} 
                      onChange={(e) => setLocalName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <input type="email" value={adminEmail} readOnly className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl text-slate-400 cursor-not-allowed" />
                  </div>
                </div>
              )}

              {activeSection !== 'Profile' && (
                <div className="py-12 text-center text-slate-500 italic">
                  Advanced {activeSection.toLowerCase()} controls are being updated.
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => setActiveSection(null)}
                  className="flex-1 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-tight"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-[2] py-4 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all uppercase tracking-tight flex items-center justify-center"
                >
                  {isSaving ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingSection({ icon, title, description, onClick, last = false }: any) {
  return (
    <div 
      onClick={onClick}
      className={`p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer ${!last ? 'group border-b border-slate-100 dark:border-slate-800' : ''}`}
    >
      <div className="flex items-center gap-5">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-slate-800 dark:text-slate-200">{title}</h4>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>
      <ChevronRight className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" size={20} />
    </div>
  );
}
