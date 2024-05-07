import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import About from '../routes/About';
import Aircooler from '../routes/Aircooler';
import Contact from '../routes/Contact';

export default function Layout() {
  return (
    <Router>
    <div className=''>
      <div className='text-center py-1 text-white bg-green-600 text-lg'>
        <p>Darmowa dostawa w 10 dni 😲</p>
      </div>
      
      <nav className="menu text-center  text-lg py-14 font-medium pb-20">
          <Link to="/" className='text-2xl text-green-600'>SummerShop</Link>
          <div className='pl-40 inline-block space-x-8'>
          <Link to="/Aircooler" className='nav-link  hover:text-gray-500'>AIRCOOLER</Link>
          <Link to="/Aircooler" className='nav-link  hover:text-gray-500'>BOTTLESPRAY</Link>
          <Link to="/Aircooler" className='nav-link  hover:text-gray-500'>WATERGUN</Link>
          <Link to="/About" className="nav-link hover:text-gray-500">O NAS</Link>
          <Link to="/Contact" className="nav-link hover:text-gray-500">KONTAKT</Link>
          </div>
      </nav>
    </div>
    <Routes>
      <Route path="/"  />
      <Route path="/About" element={<About />} />
      <Route path="/Aircooler" element={<Aircooler />} />
      <Route path="/Contact" element={<Contact />} />
    </Routes>
    </Router>
    
  );
}
