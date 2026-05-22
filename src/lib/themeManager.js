/**
 * ThemeManager.js
 * Manages UI/UX themes for Ultron.
 */

export const THEMES = [
  {
    id: 'vivy-original',
    name: 'Vivy Original',
    category: 'Default',
    tags: ['dark', 'neon', 'purple'],
    colors: {
      'bg-primary': '#08070d',
      'bg-secondary': '#110f1b',
      'bg-surface': '#181528',
      'bg-surface-hover': '#221e38',
      'bg-elevated': '#2b2647',
      'accent': '#a855f7',
      'accent-soft': '#c084fc',
      'accent-glow': 'rgba(168, 85, 247, 0.25)',
      'accent-faint': 'rgba(168, 85, 247, 0.05)',
      'accent-2': '#ec4899',
      'accent-2-soft': '#f472b6',
      'text-primary': '#f3f4f6',
      'text-secondary': '#9ca3af',
      'text-muted': '#6b7280',
      'border': '#2c2847',
      'border-subtle': '#3b365d',
      'glass-bg': 'rgba(17, 15, 27, 0.75)',
      'glass-border': 'rgba(168, 85, 247, 0.15)'
    }
  },
  {
    id: 'ultron-gore',
    name: 'Ultron Gore',
    category: 'Ultron',
    tags: ['ultron', 'dark', 'gore', 'red'],
    colors: {
      'bg-primary': '#050000',
      'bg-secondary': '#120505',
      'bg-surface': '#1f0b0b',
      'bg-surface-hover': '#2e1111',
      'bg-elevated': '#3d1717',
      'accent': '#dc2626',
      'accent-soft': '#ef4444',
      'accent-glow': 'rgba(220, 38, 38, 0.25)',
      'accent-faint': 'rgba(220, 38, 38, 0.05)',
      'accent-2': '#7f1d1d',
      'accent-2-soft': '#991b1b',
      'text-primary': '#fca5a5',
      'text-secondary': '#f87171',
      'text-muted': '#7f1d1d',
      'border': '#2d0b0b',
      'border-subtle': '#421212',
      'glass-bg': 'rgba(18, 5, 5, 0.8)',
      'glass-border': 'rgba(220, 38, 38, 0.2)'
    }
  },
  {
    id: 'ultron-metal',
    name: 'Ultron Metal',
    category: 'Ultron',
    tags: ['ultron', 'dark', 'metal', 'gray'],
    colors: {
      'bg-primary': '#0f1115',
      'bg-secondary': '#181c24',
      'bg-surface': '#222832',
      'bg-surface-hover': '#2d3543',
      'bg-elevated': '#3a4455',
      'accent': '#94a3b8',
      'accent-soft': '#cbd5e1',
      'accent-glow': 'rgba(148, 163, 184, 0.25)',
      'accent-faint': 'rgba(148, 163, 184, 0.05)',
      'accent-2': '#475569',
      'accent-2-soft': '#64748b',
      'text-primary': '#f1f5f9',
      'text-secondary': '#cbd5e1',
      'text-muted': '#64748b',
      'border': '#282e3a',
      'border-subtle': '#3b4556',
      'glass-bg': 'rgba(24, 28, 36, 0.8)',
      'glass-border': 'rgba(148, 163, 184, 0.2)'
    }
  },
  {
    id: 'ultron-tech',
    name: 'Ultron Tech',
    category: 'Ultron',
    tags: ['ultron', 'dark', 'tech', 'green'],
    colors: {
      'bg-primary': '#020403',
      'bg-secondary': '#080d0a',
      'bg-surface': '#111a14',
      'bg-surface-hover': '#19271e',
      'bg-elevated': '#223528',
      'accent': '#22c55e',
      'accent-soft': '#4ade80',
      'accent-glow': 'rgba(34, 197, 94, 0.25)',
      'accent-faint': 'rgba(34, 197, 94, 0.05)',
      'accent-2': '#06b6d4',
      'accent-2-soft': '#22d3ee',
      'text-primary': '#f0fdf4',
      'text-secondary': '#bbf7d0',
      'text-muted': '#166534',
      'border': '#16271e',
      'border-subtle': '#223b2c',
      'glass-bg': 'rgba(8, 13, 10, 0.8)',
      'glass-border': 'rgba(34, 197, 94, 0.2)'
    }
  },
  {
    id: 'ultron-void',
    name: 'Ultron Void',
    category: 'Ultron',
    tags: ['ultron', 'dark', 'void', 'red'],
    colors: {
      'bg-primary': '#040406',
      'bg-secondary': '#0d0d11',
      'bg-surface': '#17171e',
      'bg-surface-hover': '#23232e',
      'bg-elevated': '#2f2f3e',
      'accent': '#ef4444',
      'accent-soft': '#f87171',
      'accent-glow': 'rgba(239, 68, 68, 0.25)',
      'accent-faint': 'rgba(239, 68, 68, 0.05)',
      'accent-2': '#3b82f6',
      'accent-2-soft': '#60a5fa',
      'text-primary': '#f8fafc',
      'text-secondary': '#cbd5e1',
      'text-muted': '#64748b',
      'border': '#1d1d27',
      'border-subtle': '#2b2b3a',
      'glass-bg': 'rgba(13, 13, 17, 0.8)',
      'glass-border': 'rgba(239, 68, 68, 0.2)'
    }
  },
  {
    id: 'ultron-cyber-red',
    name: 'Ultron Cyber Red',
    category: 'Ultron',
    tags: ['ultron', 'dark', 'cyber', 'red'],
    colors: {
      'bg-primary': '#090a0f',
      'bg-secondary': '#13141f',
      'bg-surface': '#1c1e2f',
      'bg-surface-hover': '#272a42',
      'bg-elevated': '#333756',
      'accent': '#f43f5e',
      'accent-soft': '#fb7185',
      'accent-glow': 'rgba(244, 63, 94, 0.25)',
      'accent-faint': 'rgba(244, 63, 94, 0.05)',
      'accent-2': '#06b6d4',
      'accent-2-soft': '#22d3ee',
      'text-primary': '#fff1f2',
      'text-secondary': '#ffe4e6',
      'text-muted': '#9f1239',
      'border': '#202336',
      'border-subtle': '#2f334f',
      'glass-bg': 'rgba(19, 20, 31, 0.8)',
      'glass-border': 'rgba(244, 63, 94, 0.2)'
    }
  },
  {
    id: 'fluorite-core',
    name: 'Fluorite Core',
    category: 'Technical',
    tags: ['dark', 'cyber', 'blue'],
    colors: {
      'bg-primary': '#060b13',
      'bg-secondary': '#0c1524',
      'bg-surface': '#142238',
      'bg-surface-hover': '#1c304f',
      'bg-elevated': '#253e66',
      'accent': '#06b6d4',
      'accent-soft': '#22d3ee',
      'accent-glow': 'rgba(6, 182, 212, 0.25)',
      'accent-faint': 'rgba(6, 182, 212, 0.05)',
      'accent-2': '#3b82f6',
      'accent-2-soft': '#60a5fa',
      'text-primary': '#f1f5f9',
      'text-secondary': '#cbd5e1',
      'text-muted': '#64748b',
      'border': '#1b2e4c',
      'border-subtle': '#26416a',
      'glass-bg': 'rgba(12, 21, 36, 0.75)',
      'glass-border': 'rgba(6, 182, 212, 0.15)'
    }
  },
  {
    id: 'diva-stage',
    name: 'Diva Stage',
    category: 'Emotional',
    tags: ['dark', 'magenta', 'performance'],
    colors: {
      'bg-primary': '#0f050c',
      'bg-secondary': '#1c0d18',
      'bg-surface': '#2b1426',
      'bg-surface-hover': '#3b1c34',
      'bg-elevated': '#4b2442',
      'accent': '#d946ef',
      'accent-soft': '#f0abfc',
      'accent-glow': 'rgba(217, 70, 239, 0.25)',
      'accent-faint': 'rgba(217, 70, 239, 0.05)',
      'accent-2': '#f43f5e',
      'accent-2-soft': '#fb7185',
      'text-primary': '#fdf4ff',
      'text-secondary': '#f5d0fe',
      'text-muted': '#a21caf',
      'border': '#3a1b33',
      'border-subtle': '#512547',
      'glass-bg': 'rgba(28, 13, 24, 0.75)',
      'glass-border': 'rgba(217, 70, 239, 0.15)'
    }
  },
  {
    id: 'singularity-archive',
    name: 'Singularity Archive',
    category: 'Archive',
    tags: ['dark', 'navy', 'serious'],
    colors: {
      'bg-primary': '#030712',
      'bg-secondary': '#0f172a',
      'bg-surface': '#1e293b',
      'bg-surface-hover': '#334155',
      'bg-elevated': '#475569',
      'accent': '#2563eb',
      'accent-soft': '#60a5fa',
      'accent-glow': 'rgba(37, 99, 235, 0.25)',
      'accent-faint': 'rgba(37, 99, 235, 0.05)',
      'accent-2': '#0d9488',
      'accent-2-soft': '#2dd4bf',
      'text-primary': '#f9fafb',
      'text-secondary': '#e5e7eb',
      'text-muted': '#9ca3af',
      'border': '#1e293b',
      'border-subtle': '#334155',
      'glass-bg': 'rgba(15, 23, 42, 0.75)',
      'glass-border': 'rgba(37, 99, 235, 0.15)'
    }
  },
  {
    id: 'aurora-borealis',
    name: 'Aurora Borealis',
    category: 'Natural',
    tags: ['dark', 'aurora', 'green'],
    colors: {
      'bg-primary': '#020a07',
      'bg-secondary': '#051a13',
      'bg-surface': '#0a2a1f',
      'bg-surface-hover': '#0e3b2c',
      'bg-elevated': '#134d3a',
      'accent': '#10b981',
      'accent-soft': '#34d399',
      'accent-glow': 'rgba(16, 185, 129, 0.25)',
      'accent-faint': 'rgba(16, 185, 129, 0.05)',
      'accent-2': '#06b6d4',
      'accent-2-soft': '#22d3ee',
      'text-primary': '#ecfdf5',
      'text-secondary': '#a7f3d0',
      'text-muted': '#047857',
      'border': '#0c3225',
      'border-subtle': '#124734',
      'glass-bg': 'rgba(5, 26, 19, 0.75)',
      'glass-border': 'rgba(16, 185, 129, 0.15)'
    }
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    category: 'Natural',
    tags: ['dark', 'fire', 'orange'],
    colors: {
      'bg-primary': '#0c0402',
      'bg-secondary': '#1a0a05',
      'bg-surface': '#2b1109',
      'bg-surface-hover': '#3c170d',
      'bg-elevated': '#4d1e11',
      'accent': '#f97316',
      'accent-soft': '#fb923c',
      'accent-glow': 'rgba(249, 115, 22, 0.25)',
      'accent-faint': 'rgba(249, 115, 22, 0.05)',
      'accent-2': '#ef4444',
      'accent-2-soft': '#f87171',
      'text-primary': '#fff7ed',
      'text-secondary': '#ffedd5',
      'text-muted': '#c2410c',
      'border': '#3a170c',
      'border-subtle': '#512011',
      'glass-bg': 'rgba(26, 10, 5, 0.75)',
      'glass-border': 'rgba(249, 115, 22, 0.15)'
    }
  },
  {
    id: 'deep-forest',
    name: 'Deep Forest',
    category: 'Natural',
    tags: ['dark', 'forest', 'green'],
    colors: {
      'bg-primary': '#030704',
      'bg-secondary': '#0b170e',
      'bg-surface': '#14291a',
      'bg-surface-hover': '#1c3b25',
      'bg-elevated': '#244d31',
      'accent': '#22c55e',
      'accent-soft': '#4ade80',
      'accent-glow': 'rgba(34, 197, 94, 0.25)',
      'accent-faint': 'rgba(34, 197, 94, 0.05)',
      'accent-2': '#84cc16',
      'accent-2-soft': '#a3e635',
      'text-primary': '#f0fdf4',
      'text-secondary': '#dcfce7',
      'text-muted': '#15803d',
      'border': '#183321',
      'border-subtle': '#234930',
      'glass-bg': 'rgba(11, 23, 14, 0.75)',
      'glass-border': 'rgba(34, 197, 94, 0.15)'
    }
  },
  {
    id: 'ocean-depths',
    name: 'Ocean Depths',
    category: 'Natural',
    tags: ['dark', 'ocean', 'blue'],
    colors: {
      'bg-primary': '#01080e',
      'bg-secondary': '#031726',
      'bg-surface': '#06263e',
      'bg-surface-hover': '#093658',
      'bg-elevated': '#0d4773',
      'accent': '#0284c7',
      'accent-soft': '#38bdf8',
      'accent-glow': 'rgba(2, 132, 199, 0.25)',
      'accent-faint': 'rgba(2, 132, 199, 0.05)',
      'accent-2': '#0e7490',
      'accent-2-soft': '#06b6d4',
      'text-primary': '#f0f9ff',
      'text-secondary': '#e0f2fe',
      'text-muted': '#0369a1',
      'border': '#073150',
      'border-subtle': '#0b4672',
      'glass-bg': 'rgba(3, 23, 38, 0.75)',
      'glass-border': 'rgba(2, 132, 199, 0.15)'
    }
  },
  {
    id: 'sunlight',
    name: 'Sunlight',
    category: 'Light',
    tags: ['light', 'solar', 'blue'],
    colors: {
      'bg-primary': '#f8fafc',
      'bg-secondary': '#ffffff',
      'bg-surface': '#f1f5f9',
      'bg-surface-hover': '#e2e8f0',
      'bg-elevated': '#cbd5e1',
      'accent': '#2563eb',
      'accent-soft': '#3b82f6',
      'accent-glow': 'rgba(37, 99, 235, 0.15)',
      'accent-faint': 'rgba(37, 99, 235, 0.04)',
      'accent-2': '#4f46e5',
      'accent-2-soft': '#6366f1',
      'text-primary': '#0f172a',
      'text-secondary': '#475569',
      'text-muted': '#94a3b8',
      'border': '#e2e8f0',
      'border-subtle': '#f1f5f9',
      'glass-bg': 'rgba(255, 255, 255, 0.85)',
      'glass-border': 'rgba(37, 99, 235, 0.1)'
    }
  },
  {
    id: 'interstellar',
    name: 'Interstellar',
    category: 'Cosmic',
    tags: ['dark', 'space', 'purple'],
    colors: {
      'bg-primary': '#05020c',
      'bg-secondary': '#0b0518',
      'bg-surface': '#140a2c',
      'bg-surface-hover': '#1e0f42',
      'bg-elevated': '#281458',
      'accent': '#8b5cf6',
      'accent-soft': '#a78bfa',
      'accent-glow': 'rgba(139, 92, 246, 0.25)',
      'accent-faint': 'rgba(139, 92, 246, 0.05)',
      'accent-2': '#ec4899',
      'accent-2-soft': '#f472b6',
      'text-primary': '#faf5ff',
      'text-secondary': '#f3e8ff',
      'text-muted': '#7c3aed',
      'border': '#1d0e40',
      'border-subtle': '#2c1660',
      'glass-bg': 'rgba(11, 5, 24, 0.75)',
      'glass-border': 'rgba(139, 92, 246, 0.15)'
    }
  }
];

class ThemeManager {
  static currentThemeId = 'vivy-original';
  static autoMode = false;

  /**
   * Initializes the theme system.
   * Loads from localStorage or auto day/night.
   */
  static init() {
    let savedTheme = localStorage.getItem('ultron-theme');
    
    // Check if auto mode was saved
    const savedAuto = localStorage.getItem('ultron-theme-auto') === 'true';
    ThemeManager.autoMode = savedAuto || (!savedTheme);

    if (ThemeManager.autoMode) {
      const autoId = ThemeManager.getAutoThemeId();
      ThemeManager.setTheme(autoId, false);
    } else {
      ThemeManager.setTheme(savedTheme || 'vivy-original', false);
    }

    // Listener for auto mode time checks (every minute)
    setInterval(() => {
      if (ThemeManager.autoMode) {
        const correctId = ThemeManager.getAutoThemeId();
        if (correctId !== ThemeManager.currentThemeId) {
          ThemeManager.setTheme(correctId, false);
        }
      }
    }, 60000);

    // Cross-tab synchronization
    window.addEventListener('storage', (e) => {
      if (e.key === 'ultron-theme') {
        const isAuto = localStorage.getItem('ultron-theme-auto') === 'true';
        ThemeManager.autoMode = isAuto;
        ThemeManager.setTheme(e.newValue, false);
      }
    });
  }

  /**
   * Sets the active theme by ID.
   * @param {string} id - Theme ID to apply
   * @param {boolean} save - Whether to save choice in localStorage
   */
  static setTheme(id, save = true) {
    let theme = THEMES.find((t) => t.id === id);
    if (!theme) {
      // Fallback
      theme = THEMES[0];
      id = theme.id;
    }

    ThemeManager.currentThemeId = id;

    if (save) {
      ThemeManager.autoMode = false;
      localStorage.setItem('ultron-theme', id);
      localStorage.setItem('ultron-theme-auto', 'false');
    }

    // Apply colors as CSS Custom Properties in :root
    const root = document.documentElement;
    root.setAttribute('data-theme', id);

    Object.entries(theme.colors).forEach(([key, val]) => {
      root.style.setProperty(`--${key}`, val);
    });

    // Dispatch custom event to notify React app
    window.dispatchEvent(
      new CustomEvent('theme-changed', {
        detail: { themeId: id, autoMode: ThemeManager.autoMode }
      })
    );
  }

  /**
   * Enables or disables automatic day/night mode.
   * @param {boolean} enable
   */
  static setAutoMode(enable) {
    ThemeManager.autoMode = enable;
    localStorage.setItem('ultron-theme-auto', enable ? 'true' : 'false');
    if (enable) {
      const autoId = ThemeManager.getAutoThemeId();
      ThemeManager.setTheme(autoId, false);
    } else {
      localStorage.setItem('ultron-theme', ThemeManager.currentThemeId);
    }
  }

  /**
   * Returns whether the automatic day/night mode is active.
   * @returns {boolean}
   */
  static isAutoActive() {
    return ThemeManager.autoMode;
  }

  /**
   * Resolves the appropriate theme ID based on local system time.
   * Day: 6 AM to 10 PM -> sunlight
   * Night: 10 PM to 6 AM -> vivy-original
   * @returns {string}
   */
  static getAutoThemeId() {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 22) {
      return 'sunlight';
    }
    return 'vivy-original';
  }

  /**
   * Cycles through themes in sequential order.
   * @param {number} direction - 1 for forward, -1 for backward
   */
  static cycleTheme(direction) {
    const currentIndex = THEMES.findIndex((t) => t.id === ThemeManager.currentThemeId);
    let nextIndex = (currentIndex + direction) % THEMES.length;
    if (nextIndex < 0) nextIndex = THEMES.length - 1;

    const nextTheme = THEMES[nextIndex];
    ThemeManager.setTheme(nextTheme.id, true);
  }

  /**
   * Returns all available themes.
   * @returns {Array}
   */
  static getAllThemes() {
    return THEMES;
  }

  /**
   * Returns the current theme object.
   * @returns {Object}
   */
  static getCurrentTheme() {
    return THEMES.find((t) => t.id === ThemeManager.currentThemeId) || THEMES[0];
  }

  /**
   * Returns the list of favorited theme IDs.
   * @returns {Array<string>}
   */
  static getFavorites() {
    try {
      const favs = localStorage.getItem('ultron-theme-favorites');
      return favs ? JSON.parse(favs) : [];
    } catch {
      return [];
    }
  }

  /**
   * Toggles a theme in favorites.
   * @param {string} id
   * @returns {boolean} Whether the theme is now favorited
   */
  static toggleFavorite(id) {
    const favorites = ThemeManager.getFavorites();
    const index = favorites.indexOf(id);
    let isFav = false;

    if (index === -1) {
      favorites.push(id);
      isFav = true;
    } else {
      favorites.splice(index, 1);
    }

    localStorage.setItem('ultron-theme-favorites', JSON.stringify(favorites));
    
    // Dispatch event to refresh UI
    window.dispatchEvent(new CustomEvent('theme-favorites-changed', { detail: { favorites } }));
    return isFav;
  }
}

export default ThemeManager;
