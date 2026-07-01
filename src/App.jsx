import { useState } from 'react'
import {  Routes, Route } from 'react-router-dom'
import './App.css'
import Admin from "../src/Layout/Adminlayout.jsx"
import Doctors from './components/Doctors.jsx'
import Staff from './components/Staff.jsx'
import Dashboard from './components/Dashboard.jsx'
import Patients from './components/Patients.jsx'
import Booking from './components/Booking.jsx'
import Services from './components/Services.jsx'
import Testimonials from './components/Testimonials.jsx'
import Blogs from './components/Blogs.jsx'
import Settings from './components/Settings.jsx'


function App() {
 

  return (
  
     <Routes>
      <Route path="/" element={<Admin />} > 
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/bookings" element={<Booking />} />
      <Route path="/services" element={<Services />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/settings" element={<Settings />} />
     </Route>
     </Routes>

      
    
  )
}

export default App
