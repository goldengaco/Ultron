import React, { Suspense, useDeferredValue, useMemo, useState, useEffect, useCallback } from 'react';
import { Menu } from 'lucide-react';
import { TOOLS } from './tools/registry';
import { searchTools } from './lib/search';
import { commands } from './lib/tauri';
import useAppStore from './stores/appStore';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import CommandPalette from './components/layout/CommandPalette';
import Dashboard from './components/home/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  const [activeToolId, setActiveToolId] = useState(() => TOOLS[0]?.id ?? 'home');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const setFavorites = useAppStore((s) => s.setFavorites);
  const setRecentTools = useAppStore((s) => s.setRecentTools);

  useEffect(() => {
    commands.getFavorites().then(setFavorites).catch(() => {});
    commands.getRecentTools(10).then(setRecentTools).catch(() => {});
  }, []);

  const filteredTools = useMemo(
    () => searchTools(TOOLS, deferredSearchQuery),
    [deferredSearchQuery]
  );

  const activeTool = useMemo(
    () => TOOLS.find((t) => t.id === activeToolId),
    [activeToolId]
  );

  const handleSelectTool = useCallback((toolId) => {
    setActiveToolId(toolId);
    setPaletteOpen(false);
    setSearchQuery('');
    commands.logHistory(toolId).catch(() => {});
    commands.getRecentTools(10).then(setRecentTools).catch(() => {});
  }, [setRecentTools]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((p) => !p);
      }
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        setSearchQuery('');
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setIsSidebarOpen((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const ActiveComponent = activeTool?.component;

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      <div style={{
        width: isSidebarOpen ? '280px' : '0px',
        overflow: 'hidden',
        borderRight: isSidebarOpen ? '1px solid var(--color-border-default)' : 'none',
        transition: 'width 0.25s ease',
        flexShrink: 0,
        background: 'var(--color-bg-secondary)',
      }}>
        <div style={{ width: '280px', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Sidebar
            tools={TOOLS}
            filteredTools={filteredTools}
            activeToolId={activeToolId}
            onSelectTool={handleSelectTool}
          />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Topbar
          activeTool={activeTool}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen((p) => !p)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredTools={filteredTools}
          onSelectTool={handleSelectTool}
          onPaletteOpen={() => setPaletteOpen(true)}
        />

        <main style={{ flex: 1, overflowY: 'auto', padding: '32px 40px', background: 'var(--color-bg-primary)' }}>
          <ErrorBoundary key={activeToolId}>
            <Suspense fallback={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px', color: 'var(--color-text-muted)' }}>
                <div style={{ width: '24px', height: '24px', border: '2px solid var(--color-accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <span style={{ fontSize: '0.9rem' }}>Cargando herramienta...</span>
              </div>
            }>
              {activeToolId === 'home' ? (
                <Dashboard onSelectTool={handleSelectTool} />
              ) : ActiveComponent ? (
                <div className="animate-fadeIn" style={{ maxWidth: '900px', margin: '0 auto' }}>
                  <ActiveComponent />
                </div>
              ) : (
                <Dashboard onSelectTool={handleSelectTool} />
              )}
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      {paletteOpen && (
        <CommandPalette
          tools={TOOLS}
          onSelect={handleSelectTool}
          onClose={() => setPaletteOpen(false)}
        />
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
