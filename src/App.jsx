// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AgendaForm from './AgendaForm';
import AgendaList from './AgendaList';
import ChildrenList from './ChildrenList';

function App() {
  return (
    <Router>
      <div style={{
          backgroundColor: "#f5f5f5",  // Cambia el color de fondo aquí
          minHeight: "100vh",
          paddingTop: "20px"
        }}>
        <header style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "20px"
          }}>
          <nav style={{
              display: "flex",
              gap: "30px",  // Espacio entre los links
              padding: "10px 20px",
              backgroundColor: "#ffffff",  // Fondo del menú
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}>
            <Link to="/" style={{
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333"
              }}>Agendas</Link>
            <Link to="/crear" style={{
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333"
              }}>Crear Agenda</Link>
            <Link to="/niños" style={{
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333"
              }}>Niños</Link>
          </nav>
        </header>
        <div style={{ padding: "0 20px" }}>
          <Routes>
            <Route path="/" element={<AgendaList />} />
            <Route path="/crear" element={<AgendaForm />} />
            <Route path="/niños" element={<ChildrenList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
