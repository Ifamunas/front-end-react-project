import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import Footer from './components/Footer'
import Index from './route/Index'

function App() {
  return (
    <div className="App">
      <Index />
      <ToastContainer />
      <Footer />
    </div>
  )
}
export default App
