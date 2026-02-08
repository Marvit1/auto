import { ref } from 'vue'

// Shared module-level state so every call to useTheme() references the same theme
const _theme = ref<'light' | 'dark'>('light')

export function useTheme() {
  const theme = _theme

  const apply = (t: 'light' | 'dark') => {
    if (process.client) {
      document.documentElement.setAttribute('data-theme', t)
      try { localStorage.setItem('theme', t) } catch (e) { /* ignore */ }
    }
    theme.value = t
    // small debug to help during development
    if (process.client && (window as any).console && (window as any).console.debug) {
      console.debug('[useTheme] applied theme', t)
    }
  }

  const loadTheme = () => {
    if (!process.client) return
    try {
      const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (saved) {
        apply(saved)
        return
      }
    } catch (e) {
      // ignore
    }

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    apply(prefersDark ? 'dark' : 'light')
  }

  const setTheme = (t: 'light' | 'dark') => apply(t)
  const toggle = () => apply(theme.value === 'light' ? 'dark' : 'light')

  return { theme, loadTheme, setTheme, toggle }
}
