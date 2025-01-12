import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Main from './Main'
import Admin from './pages/Admin'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Routes>
    </Router>
  )
}

export default App
