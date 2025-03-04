// src/Cover.jsx
import React from 'react';
import './Agenda.css';

const Cover = () => {
  return (
    <div className="cover-container">
      <img
        src="https://files.mormonsud.org/wp-content/uploads/2016/12/Precious-in-His-Sight-pintura-por-Greg-Olsen-Jes%C3%BAs-con-ni%C3%B1os.jpg"
        alt="Portada"
        className="cover-image"
      />
      <h1 className="cover-title">Agenda Dominical</h1>
      <p className="cover-subtitle">¡Bienvenidos a la reunión de la Primaria!</p>
    </div>
  );
};

export default Cover;
