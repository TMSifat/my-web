import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminStore {
  adminName: string;
  adminEmail: string;
  adminWhitelist: string[];
  setAdminName: (name: string) => void;
  setAdminEmail: (email: string) => void;
  addAdminToWhitelist: (email: string) => void;
  removeAdminFromWhitelist: (email: string) => void;
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      adminName: 'John Doe',
      adminEmail: 'tanvirsifat51@gmail.com',
      adminWhitelist: ['tanvirsifat51@gmail.com'],

      setAdminName: (name) => set({ adminName: name }),
      setAdminEmail: (email) => set({ adminEmail: email }),
      
      addAdminToWhitelist: (email) => set((state) => ({
        adminWhitelist: state.adminWhitelist.includes(email) 
          ? state.adminWhitelist 
          : [...state.adminWhitelist, email]
      })),

      removeAdminFromWhitelist: (email) => set((state) => ({
        adminWhitelist: state.adminWhitelist.filter(a => a !== email || a === 'tanvirsifat51@gmail.com')
      })),
    }),
    {
      name: 'admin-storage',
    }
  )
);
