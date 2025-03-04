// src/pages/AgendasPage.jsx
import React, { useState } from 'react';
import AgendaList from '../components/AgendaList';
import AgendaView from '../components/AgendaView';
import AgendaForm from '../components/AgendaForm';

const AgendasPage = () => {
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const handleSelectAgenda = (agenda) => {
    setSelectedAgenda(agenda);
    setShowForm(false);
  };

  const handleNewAgenda = () => {
    setSelectedAgenda(null);
    setShowForm(true);
  };

  const handleSave = () => {
    // Cuando se guarde, puedes refrescar la lista o cerrar el form
    setShowForm(false);
  };

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      {/* Lado Izquierdo: Lista de agendas */}
      <div style={{ flex: 1 }}>
        <h2>Agendas del Mes</h2>
        <label>Año: </label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <label>Mes: </label>
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <button onClick={handleNewAgenda}>Nueva Agenda</button>
        <AgendaList
          year={year}
          month={month}
          onSelectAgenda={handleSelectAgenda}
        />
      </div>

      {/* Lado Derecho: Vista o Form */}
      <div style={{ flex: 1 }}>
        {showForm ? (
          <AgendaForm agendaToEdit={selectedAgenda} onSave={handleSave} />
        ) : (
          <AgendaView agenda={selectedAgenda} />
        )}
      </div>
    </div>
  );
};

export default AgendasPage;
