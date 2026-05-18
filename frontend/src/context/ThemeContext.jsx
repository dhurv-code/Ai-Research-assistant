import { createContext, useEffect, useMemo, useState } from 'react'

export const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    return window.localStorage.getItem('theme-mode') || 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', mode === 'dark')
    window.localStorage.setItem('theme-mode', mode)
  }, [mode])

  const value = useMemo(
    () => ({
      mode,
      toggleTheme: () => setMode((current) => (current === 'light' ? 'dark' : 'light')),
      setMode,
    }),
    [mode],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
