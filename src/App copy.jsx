import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/navbar.jsx'
import Home from "./components/Home/Home.jsx"
import About from './components/About/About.jsx'

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/#about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
