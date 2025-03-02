// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AgendaForm from './AgendaForm';
import AgendaList from './AgendaList';
import ChildrenList from './ChildrenList';

function App() {
  return (
    <Router>
      {/* 
        Div principal que aplica la imagen de fondo a toda la ventana. 
        Ajusta la URL a la que compartiste y, si deseas, modifica la opacidad
        del contenedor interno para ver mejor la imagen de fondo.
      */}
      <div 
        style={{ 
          backgroundImage: `url("https://files.mormonsud.org/wp-content/uploads/2016/12/Precious-in-His-Sight-pintura-por-Greg-Olsen-Jes%C3%BAs-con-ni%C3%B1os.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Encabezado con menú */}
        <header 
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px"
          }}
        >
          <nav 
            style={{
              display: "flex",
              gap: "30px",
              padding: "10px 20px",
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
            }}
          >
            <Link 
              to="/" 
              style={{
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333"
              }}
            >
              Agendas
            </Link>
            <Link 
              to="/crear" 
              style={{
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333"
              }}
            >
              Crear Agenda
            </Link>
            <Link 
              to="/niños" 
              style={{
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333"
              }}
            >
              Niños
            </Link>
          </nav>
        </header>

        {/* Contenedor principal para el contenido (lista, formularios, etc.) */}
        <main 
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start"
          }}
        >
          {/* 
            Este div tendrá un fondo blanco (o semitransparente) para que 
            el texto sea legible. Ajusta el color y la opacidad a tu gusto.
          */}
          <div 
            style={{
              maxWidth: "800px",
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.85)", 
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              padding: "20px",
              margin: "20px"
            }}
          >
            <Routes>
              <Route path="/" element={<AgendaList />} />
              <Route path="/crear" element={<AgendaForm />} />
              <Route path="/niños" element={<ChildrenList />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
