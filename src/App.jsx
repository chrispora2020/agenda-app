// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AgendasPage from './pages/AgendasPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agendas/:year?/:month?" element={<AgendasPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
