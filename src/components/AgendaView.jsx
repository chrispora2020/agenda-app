// src/components/AgendaView.jsx
import React from 'react';
import './agendaView.css'; // Aquí metes tus estilos florales

const AgendaView = ({ agenda }) => {
  if (!agenda) return <p>Selecciona una agenda para ver detalles</p>;

  return (
    <div className="agenda-view-container">
      <div className="agenda-header">
        <h1 className="agenda-title">Programa Dominical</h1>
        <p className="agenda-date">{`Fecha: ${agenda.year}-${agenda.month}`}</p>
      </div>

      <div className="agenda-section">
        <h2>Anuncios</h2>
        <p>{agenda.anuncios}</p>
      </div>
      <div className="agenda-section">
        <h3>Dirige</h3>
        <p>{agenda.dirige}</p>
      </div>
      {/* Y así para cada campo: primeraOracion, articuloFe, mensaje, etc. */}
      {/* Aplica la misma estructura que tu plantilla: cajitas, flores, etc. */}
    </div>
  );
};

export default AgendaView;
