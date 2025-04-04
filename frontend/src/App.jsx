import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Elements/Navbar'
import Wrapper from './Providers/Wrapper';

const App = () => {
  return (
    <div>
      <Wrapper>

     
      <Router>

        <Navbar />
        <Routes>

          <Route path='/' element={<Home />} />

        </Routes>

        </Router>
        
      </Wrapper>

    </div>
  )
}

export default App