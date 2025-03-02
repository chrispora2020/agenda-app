// src/AgendaForm.js
import React, { useState } from 'react';
import { db } from './firebase';

const AgendaForm = () => {
  // Estados para cada campo
  const [title, setTitle] = useState('');
  const [group, setGroup] = useState('');
  const [duration, setDuration] = useState('');
  const [activities, setActivities] = useState('');

  // Función para guardar la agenda en Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection('agendas').add({
        title,
        group,
        duration: Number(duration),
        activities,
        createdAt: new Date()
      });
      alert("¡Agenda guardada!");
      // Limpiar campos
      setTitle('');
      setGroup('');
      setDuration('');
      setActivities('');
    } catch (error) {
      console.error("Error al guardar la agenda: ", error);
      alert("Error al guardar la agenda");
    }
  }

  return (
    <div>
      <h2>Crear Agenda</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Grupo (Ej: Primaria, Guardería):</label>
          <input
            type="text"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Duración (minutos):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Actividades (detalles):</label>
          <textarea
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Guardar Agenda</button>
      </form>
    </div>
  );
};

export default AgendaForm;
