import { Provider } from 'react-redux'
import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from "@/components/ui/toaster"
import MainRoutes from './routes'
import { store } from './store/store'

function App() {

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <MainRoutes />
        <Toaster />
      </ThemeProvider>
    </Provider>
  )
}

export default App
