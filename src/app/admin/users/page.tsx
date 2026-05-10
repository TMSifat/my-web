'use client';

import React, { useState } from 'react';
import { 
  Users as UsersIcon, 
  Search, 
  UserPlus, 
  MoreVertical,
  ShieldCheck,
  Briefcase,
  X,
  Mail,
  User as UserIcon,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const initialUsers = [
    { name: "Tanvir Sifat", email: "tanvirsifat51@gmail.com", role: "Root Admin", status: "Active", lastActive: "Online", avatar: "TS" },
    { name: "Sarah Smith", email: "sarah@crunchbite.com", role: "Finance Manager", status: "Active", lastActive: "1 hour ago", avatar: "SS" },
    { name: "Mike Wilson", email: "mike@crunchbite.com", role: "Staff", status: "Inactive", lastActive: "2 days ago", avatar: "MW" },
    { name: "Jane Cooper", email: "jane@crunchbite.com", role: "Admin", status: "Active", lastActive: "Online", avatar: "JC" },
  ];

  const filteredUsers = initialUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-4xl font-black text-[#E1E0CC] uppercase tracking-tighter">User Management</h2>
          <p className="text-primary/40 text-sm font-bold uppercase tracking-widest mt-2">Manage administrative staff and access levels.</p>
        </motion.div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-primary text-black rounded-2xl hover:scale-105 shadow-xl shadow-primary/20 transition-all font-black text-[10px] uppercase tracking-widest active:scale-95"
        >
          <UserPlus size={18} />
          Add New Member
        </button>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#101010] rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden"
      >
        <div className="p-8 border-b border-white/5 flex items-center gap-6 bg-white/[0.02]">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-black/40 border border-white/5 rounded-2xl text-[#E1E0CC] focus:outline-none focus:border-primary/50 transition-all text-sm placeholder:text-primary/10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.03] text-primary/40 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="px-8 py-6">Member Identity</th>
                <th className="px-8 py-6">Access Role</th>
                <th className="px-8 py-6">Connectivity</th>
                <th className="px-8 py-6">Last Active</th>
                <th className="px-8 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <UserRow key={idx} {...user} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <p className="text-primary/20 font-black uppercase tracking-widest italic text-sm">No results found matching "{searchTerm}"</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Member Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#101010] w-full max-w-lg rounded-[3rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[100px] -mr-24 -mt-24" />
              
              {isSuccess ? (
                <div className="py-12 flex flex-col items-center text-center animate-in zoom-in duration-500 relative z-10">
                  <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-3xl flex items-center justify-center mb-8 border border-green-500/20 shadow-inner">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-[#E1E0CC] mb-3 uppercase tracking-tighter">Authorized!</h3>
                  <p className="text-primary/40 font-bold uppercase tracking-widest text-xs">Security invitation dispatched successfully.</p>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-8 right-8 text-primary/20 hover:text-primary transition-all p-2 hover:bg-white/5 rounded-xl"
                  >
                    <X size={24} />
                  </button>
                  <div className="mb-10 relative z-10">
                    <h3 className="text-3xl font-black text-[#E1E0CC] uppercase tracking-tighter mb-3">Add Team Member</h3>
                    <p className="text-primary/40 font-bold uppercase tracking-widest text-[10px]">Invite a new professional to join CrunchBite Studio.</p>
                  </div>
                  <form onSubmit={handleAddMember} className="space-y-8 relative z-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Full Legal Name</label>
                      <div className="relative">
                        <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                        <input required type="text" placeholder="e.g. Alex Johnson" className="w-full pl-14 pr-6 py-5 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:border-primary/50 transition-all text-[#E1E0CC] placeholder:text-primary/10" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Authorized Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
                        <input required type="email" placeholder="alex@crunchbite.com" className="w-full pl-14 pr-6 py-5 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:border-primary/50 transition-all text-[#E1E0CC] placeholder:text-primary/10" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-primary/40 ml-4">Access Level Classification</label>
                      <select className="w-full px-6 py-5 bg-black/40 border border-white/5 rounded-2xl focus:outline-none focus:border-primary/50 transition-all text-[#E1E0CC] font-bold appearance-none cursor-pointer">
                        <option>Admin</option>
                        <option>Finance Manager</option>
                        <option>Kitchen Supervisor</option>
                        <option>Staff Member</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full py-6 bg-primary text-black font-black rounded-[2rem] shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-sm active:scale-[0.98]">
                      Dispatch Invitation
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function UserRow({ name, email, role, status, lastActive, avatar }: any) {
  const isRoot = role.includes('Root');
  
  return (
    <tr className="hover:bg-white/[0.03] transition-all group">
      <td className="px-8 py-6">
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black shadow-inner">
            {avatar}
          </div>
          <div>
            <p className="text-sm font-black text-[#E1E0CC] tracking-tight">{name}</p>
            <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${isRoot ? 'bg-primary/10 text-primary border-primary/20' : 'bg-white/5 text-primary/40 border-white/5'}`}>
          {isRoot ? <ShieldCheck size={14} /> : <Briefcase size={14} />}
          {role}
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-primary/10'}`} />
          <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'Active' ? 'text-green-500' : 'text-primary/20'}`}>{status}</span>
        </div>
      </td>
      <td className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-primary/40">
        {lastActive}
      </td>
      <td className="px-8 py-6 text-right">
        <button className="text-primary/20 hover:text-primary transition-all p-3 hover:bg-white/5 rounded-xl">
          <MoreVertical size={18} />
        </button>
      </td>
    </tr>
  );
}
