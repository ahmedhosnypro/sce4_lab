import './styles/App.css'
import { useState, useEffect } from 'react'
import EmployeeGrid from './components/EmployeeGrid'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    document.documentElement.className = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const cycleTheme = () => {
    setTheme(current => current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system')
  }

  const themeIcon = theme === 'light' ? '☀' : theme === 'dark' ? '☾' : '◐'

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Employee Management System</h1>
        <button className="theme-toggle" onClick={cycleTheme}>
          <span>{theme}</span>
          <span>{themeIcon}</span>
        </button>
      </header>
      <main>
        <EmployeeGrid />
      </main>
    </div>
  )
}

export default App
