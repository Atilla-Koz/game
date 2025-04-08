import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Game from './pages/Game'
import TruthOrDare from './pages/TruthOrDare'
import './assets/styles/main.css'
import Navbar from './components/Navbar'

// Font Awesome ikonlarını yükle
library.add(fas, far)

function App() {
  return (
    <Router>
      <div className="main-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/game" element={<Game />} />
            <Route path="/truth-or-dare" element={<TruthOrDare />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
