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

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const initialUsers = [
    { name: "John Doe", email: "john@crunchbite.com", role: "Admin", status: "Active", lastActive: "2 mins ago", avatar: "JD" },
    { name: "Sarah Smith", email: "sarah@crunchbite.com", role: "Finance Manager", status: "Active", lastActive: "1 hour ago", avatar: "SS" },
    { name: "Mike Wilson", email: "mike@crunchbite.com", role: "Finance Manager", status: "Inactive", lastActive: "2 days ago", avatar: "MW" },
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">User Management</h2>
          <p className="text-slate-500">Manage administrative staff and their access levels.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all font-bold shadow-lg shadow-orange-500/20"
        >
          <UserPlus size={20} />
          Add New Member
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email or role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[11px] uppercase tracking-widest">
                <th className="px-8 py-5 font-bold">User</th>
                <th className="px-8 py-5 font-bold">Role</th>
                <th className="px-8 py-5 font-bold">Status</th>
                <th className="px-8 py-5 font-bold">Last Active</th>
                <th className="px-8 py-5 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, idx) => (
                  <UserRow key={idx} {...user} />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-slate-500">
                    No users found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">Success!</h3>
                <p className="text-slate-500">Invitation sent to the new member.</p>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </button>
                <div className="mb-8">
                  <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Add Team Member</h3>
                  <p className="text-slate-500 text-sm">Invite a new member to join the admin panel.</p>
                </div>
                <form onSubmit={handleAddMember} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Full Name</label>
                    <div className="relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input required type="text" placeholder="e.g. Alex Johnson" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input required type="email" placeholder="alex@crunchbite.com" className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 px-1">Access Level</label>
                    <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 font-medium">
                      <option>Admin</option>
                      <option>Finance Manager</option>
                      <option>Staff</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-4 bg-orange-500 text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 hover:bg-orange-600 transition-all uppercase tracking-tight">
                    Send Invitation
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function UserRow({ name, email, role, status, lastActive, avatar }: any) {
  const isFinance = role === 'Finance Manager';
  
  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
      <td className="px-8 py-5">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-bold border border-slate-200 dark:border-slate-700">
            {avatar}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">{name}</p>
            <p className="text-xs text-slate-500">{email}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-5">
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold ${isFinance ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
          {isFinance ? <Briefcase size={14} /> : <ShieldCheck size={14} />}
          {role}
        </div>
      </td>
      <td className="px-8 py-5">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`} />
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{status}</span>
        </div>
      </td>
      <td className="px-8 py-5 text-xs text-slate-500 font-medium">
        {lastActive}
      </td>
      <td className="px-8 py-5 text-right">
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <MoreVertical size={20} />
        </button>
      </td>
    </tr>
  );
}
