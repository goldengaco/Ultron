import React, { useState, useEffect } from 'react';
import { X, Star, Search, Palette, Sun, Moon, Info, Settings, RefreshCw } from 'lucide-react';
import ThemeManager, { THEMES } from '../../lib/themeManager';

export default function ThemePanel({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTheme, setCurrentTheme] = useState(ThemeManager.getCurrentTheme());
  const [favorites, setFavorites] = useState(ThemeManager.getFavorites());
  const [autoMode, setAutoMode] = useState(ThemeManager.isAutoActive());

  // Customizer state
  const [customAccent, setCustomAccent] = useState(currentTheme.colors['accent']);
  const [customAccent2, setCustomAccent2] = useState(currentTheme.colors['accent-2']);

  // Sync state on change
  useEffect(() => {
    const handleThemeChange = (e) => {
      const updatedTheme = ThemeManager.getCurrentTheme();
      setCurrentTheme(updatedTheme);
      setAutoMode(e.detail.autoMode);
      setCustomAccent(updatedTheme.colors['accent']);
      setCustomAccent2(updatedTheme.colors['accent-2']);
    };

    const handleFavChange = (e) => {
      setFavorites(e.detail.favorites);
    };

    window.addEventListener('theme-changed', handleThemeChange);
    window.addEventListener('theme-favorites-changed', handleFavChange);

    return () => {
      window.removeEventListener('theme-changed', handleThemeChange);
      window.removeEventListener('theme-favorites-changed', handleFavChange);
    };
  }, []);

  const handleSelectTheme = (id) => {
    ThemeManager.setTheme(id);
  };

  const handleToggleFavorite = (id, e) => {
    e.stopPropagation(); // Avoid triggering theme select
    ThemeManager.toggleFavorite(id);
  };

  const handleToggleAuto = () => {
    const nextVal = !autoMode;
    setAutoMode(nextVal);
    ThemeManager.setAutoMode(nextVal);
  };

  const handleApplyCustomColor = (key, val) => {
    if (key === 'accent') {
      setCustomAccent(val);
    } else {
      setCustomAccent2(val);
    }
    // Apply immediately to root
    document.documentElement.style.setProperty(`--${key}`, val);
  };

  // Reset custom colors back to theme defaults
  const handleResetCustomColors = () => {
    const theme = ThemeManager.getCurrentTheme();
    setCustomAccent(theme.colors['accent']);
    setCustomAccent2(theme.colors['accent-2']);
    document.documentElement.style.setProperty('--accent', theme.colors['accent']);
    document.documentElement.style.setProperty('--accent-2', theme.colors['accent-2']);
  };

  // Filter themes
  const filteredThemes = THEMES.filter((theme) => {
    // Tab filter
    if (activeTab === 'ultron' && theme.category !== 'Ultron') return false;
    if (activeTab === 'favoritos' && !favorites.includes(theme.id)) return false;

    // Search filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const nameMatch = theme.name.toLowerCase().includes(q);
      const categoryMatch = theme.category.toLowerCase().includes(q);
      const tagMatch = theme.tags.some(tag => tag.toLowerCase().includes(q));
      return nameMatch || categoryMatch || tagMatch;
    }

    return true;
  });

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* Side Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-96 bg-bg-secondary border-l border-border-default shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-border-default flex items-center justify-between bg-bg-primary">
          <div className="flex items-center gap-2">
            <Palette className="text-accent" size={20} />
            <h2 className="text-text-primary font-bold text-base">Temas y Estilos</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-surface transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Auto Mode Control */}
        <div className="p-4 bg-bg-primary/50 border-b border-border-default">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                {autoMode ? <Sun size={14} className="text-accent" /> : <Moon size={14} className="text-text-muted" />}
                Modo Día/Noche Automático
              </span>
              <span className="text-[10px] text-text-muted mt-0.5 max-w-[240px]">
                Cambia entre Sunlight (día: 6 AM-10 PM) y Vivy Original (noche).
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoMode}
                onChange={handleToggleAuto}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-bg-surface border border-border-default rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-text-muted peer-checked:after:bg-accent after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-accent/15 peer-checked:border-accent/40"></div>
            </label>
          </div>
        </div>

        {/* Search input (hidden in Customizer tab) */}
        {activeTab !== 'personalizados' && (
          <div className="p-4 border-b border-border-default">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border-default bg-bg-primary text-sm focus-within:border-accent/50 transition-colors">
              <Search size={16} className="text-text-muted" />
              <input
                type="text"
                placeholder="Buscar temas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-text-primary placeholder-text-muted/60 text-xs border-none outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-text-muted hover:text-text-primary cursor-pointer">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-border-default bg-bg-primary/30 text-xs text-center">
          {['todos', 'ultron', 'favoritos', 'personalizados'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 font-semibold capitalize border-b-2 transition-colors cursor-pointer ${
                activeTab === tab
                  ? 'border-accent text-accent bg-bg-secondary/40'
                  : 'border-transparent text-text-muted hover:text-text-secondary'
              }`}
            >
              {tab === 'todos' ? 'Todos' : tab === 'ultron' ? 'Ultron' : tab === 'favoritos' ? 'Favoritos' : 'Personalizar'}
            </button>
          ))}
        </div>

        {/* Main List / Customizer */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeTab === 'personalizados' ? (
            /* Customizer Panel */
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3.5 rounded-lg border border-border-default bg-bg-primary/40 flex flex-col gap-2">
                <h3 className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                  <Settings size={14} className="text-accent" />
                  Ajustador de Color de Acento
                </h3>
                <p className="text-[10px] text-text-muted leading-relaxed">
                  Modifica los colores clave del tema activo (<strong>{currentTheme.name}</strong>) en tiempo real. Esto te da personalización total.
                </p>
              </div>

              {/* Accent Color Picker */}
              <div className="space-y-3.5 p-3.5 rounded-lg border border-border-default bg-bg-surface/30">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-text-secondary">Color de Acento Primario</span>
                    <span className="text-[10px] text-text-muted font-mono">{customAccent}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customAccent}
                      onChange={(e) => handleApplyCustomColor('accent', e.target.value)}
                      className="w-8 h-8 rounded border border-border-default cursor-pointer bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-text-secondary">Color de Acento Secundario</span>
                    <span className="text-[10px] text-text-muted font-mono">{customAccent2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customAccent2}
                      onChange={(e) => handleApplyCustomColor('accent-2', e.target.value)}
                      className="w-8 h-8 rounded border border-border-default cursor-pointer bg-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Reset to defaults button */}
              <button
                onClick={handleResetCustomColors}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-border-default hover:border-accent-soft hover:bg-bg-surface text-xs font-semibold text-text-secondary hover:text-text-primary transition-all cursor-pointer"
              >
                <RefreshCw size={14} />
                Restablecer Colores del Tema
              </button>

              <div className="p-3.5 rounded-lg border border-accent/20 bg-accent/5 flex gap-2 items-start">
                <Info size={16} className="text-accent shrink-0 mt-0.5" />
                <p className="text-[10px] text-text-secondary leading-normal">
                  <strong>Tip:</strong> Estos ajustes se aplican directamente en tu ventana actual. Si cambias de tema o recargas, se restablecerán a los valores por defecto del tema.
                </p>
              </div>
            </div>
          ) : (
            /* Theme List */
            <>
              {filteredThemes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-text-muted">
                  <Palette size={32} className="opacity-30 mb-2" />
                  <span className="text-xs font-medium">No se encontraron temas</span>
                  <span className="text-[10px] opacity-75 mt-1">Intenta con otra búsqueda o categoría</span>
                </div>
              ) : (
                filteredThemes.map((theme) => {
                  const isActive = currentTheme.id === theme.id;
                  const isFav = favorites.includes(theme.id);

                  return (
                    <div
                      key={theme.id}
                      onClick={() => handleSelectTheme(theme.id)}
                      className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all duration-200 group relative flex flex-col gap-2.5 ${
                        isActive
                          ? 'bg-bg-surface border-accent shadow-md shadow-accent/5'
                          : 'bg-bg-primary/40 border-border-default hover:border-border-light hover:bg-bg-surface/50'
                      }`}
                    >
                      {/* Top Row: Name & Star */}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
                            {theme.name}
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            )}
                          </span>
                          <span className="text-[9px] text-text-muted mt-0.5 capitalize">
                            Categoría: {theme.category}
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleToggleFavorite(theme.id, e)}
                          className="p-1 rounded-md text-text-muted hover:text-accent-2 transition-colors cursor-pointer"
                        >
                          <Star
                            size={16}
                            fill={isFav ? 'var(--color-accent-2)' : 'none'}
                            className={isFav ? 'text-accent-2' : 'opacity-40 group-hover:opacity-100'}
                          />
                        </button>
                      </div>

                      {/* Visual Color Bar Preview */}
                      <div className="flex items-center gap-1.5 p-1.5 rounded bg-bg-primary/80 border border-border-default/60">
                        {/* Background Block */}
                        <div
                          style={{ backgroundColor: theme.colors['bg-primary'] }}
                          className="w-5 h-5 rounded border border-white/5 flex-shrink-0"
                          title="Fondo"
                        />
                        {/* Surface Block */}
                        <div
                          style={{ backgroundColor: theme.colors['bg-surface'] }}
                          className="w-5 h-5 rounded border border-white/5 flex-shrink-0"
                          title="Tarjeta"
                        />
                        {/* Text Block (uses primary color to show contrast) */}
                        <div
                          style={{ backgroundColor: theme.colors['bg-secondary'], color: theme.colors['text-primary'] }}
                          className="flex-1 h-5 rounded border border-white/5 flex items-center justify-center font-mono text-[8px] font-bold overflow-hidden"
                          title="Texto"
                        >
                          Aa
                        </div>
                        {/* Accent Block */}
                        <div
                          style={{ backgroundColor: theme.colors['accent'] }}
                          className="w-5 h-5 rounded border border-white/5 flex-shrink-0"
                          title="Acento Primario"
                        />
                        {/* Accent 2 Block */}
                        <div
                          style={{ backgroundColor: theme.colors['accent-2'] }}
                          className="w-5 h-5 rounded border border-white/5 flex-shrink-0"
                          title="Acento Secundario"
                        />
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {theme.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 rounded text-[8px] bg-bg-surface/50 border border-border-default text-text-muted font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
