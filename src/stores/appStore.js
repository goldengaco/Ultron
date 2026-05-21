import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  activeToolId: 'home',
  isSidebarOpen: true,
  searchQuery: '',
  favorites: [],
  recentTools: [],
  theme: 'dark',

  setActiveToolId: (id) => set({ activeToolId: id }),
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFavorites: (favorites) => set({ favorites }),
  setRecentTools: (tools) => set({ recentTools: tools }),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
}));

export default useAppStore;
