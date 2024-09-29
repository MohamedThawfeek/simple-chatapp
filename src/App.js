import React from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"


import Home from "./pages/home/Home"
import Login from "./pages/authentication/login"
import Signup from "./pages/authentication/signup"


const App = () => {
  return (
    <div className='w-screen h-screen'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App