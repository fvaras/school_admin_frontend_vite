import './App.css'
import { ThemeProvider } from './components/theme-provider'
import MainRoutes from './routes'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainRoutes />
    </ThemeProvider>
  )
}

export default App
