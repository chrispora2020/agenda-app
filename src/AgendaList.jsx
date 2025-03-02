// src/AgendaList.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';

const AgendaList = () => {
  const [agendas, setAgendas] = useState([]);

  // Escucha en tiempo real los documentos de la colección 'agendas'
  useEffect(() => {
    const unsubscribe = db.collection('agendas')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const agendasData = [];
        snapshot.forEach(doc => agendasData.push({ ...doc.data(), id: doc.id }));
        setAgendas(agendasData);
      });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Agendas Guardadas</h2>
      {agendas.map(agenda => (
        <div key={agenda.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
          <h3>{agenda.title}</h3>
          <p><strong>Grupo:</strong> {agenda.group}</p>
          <p><strong>Duración:</strong> {agenda.duration} minutos</p>
          <p><strong>Actividades:</strong> {agenda.activities}</p>
          <p><em>Creado el: {new Date(agenda.createdAt.seconds * 1000).toLocaleString()}</em></p>
        </div>
      ))}
    </div>
  );
};

export default AgendaList;
