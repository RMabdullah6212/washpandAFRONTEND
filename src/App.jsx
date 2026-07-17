import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Footer from './Components/Footer.jsx'
import Booking from './pages/Booking.jsx'
const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
