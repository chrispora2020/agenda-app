// src/components/AgendaView.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Card, CardContent, Typography } from '@mui/material';

const AgendaView = ({ agenda }) => {
  const [dirigeName, setDirigeName] = useState('');
  const [oracionName, setOracionName] = useState('');
  const [mensajeName, setMensajeName] = useState('');
  const [hymns, setHymns] = useState([]);
  const [birthdays, setBirthdays] = useState([]);

  useEffect(() => {
    if (!agenda) return;

    // Cargar nombres de niños
    async function fetchChildName(childId) {
      const snap = await getDoc(doc(db, 'children', childId));
      if (snap.exists()) {
        return snap.data().name;
      }
      return '';
    }

    async function fetchMusic(musicId) {
      const snap = await getDoc(doc(db, 'music', musicId));
      if (snap.exists()) {
        const d = snap.data();
        return `${d.number} - ${d.title}`;
      }
      return '';
    }

    const loadData = async () => {
      // Dirige
      if (agenda.dirige) {
        const name = await fetchChildName(agenda.dirige);
        setDirigeName(name);
      }
      // Oración
      if (agenda.primeraOracion) {
        const name = await fetchChildName(agenda.primeraOracion);
        setOracionName(name);
      }
      // Mensaje
      if (agenda.mensaje) {
        const name = await fetchChildName(agenda.mensaje);
        setMensajeName(name);
      }
      // Cumpleaños
      const cumps = [];
      if (agenda.cumpleanios && agenda.cumpleanios.length > 0) {
        for (let cId of agenda.cumpleanios) {
          const cname = await fetchChildName(cId);
          cumps.push(cname);
        }
      }
      setBirthdays(cumps);

      // Música
      const selectedHymns = [];
      if (agenda.tiempoParaCantar && agenda.tiempoParaCantar.length > 0) {
        for (let mId of agenda.tiempoParaCantar) {
          const title = await fetchMusic(mId);
          selectedHymns.push(title);
        }
      }
      setHymns(selectedHymns);
    };

    loadData();
  }, [agenda]);

  if (!agenda) {
    return <p>Selecciona una agenda</p>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4">Agenda del {agenda.sunday}</Typography>
        <Typography variant="subtitle1">Dirige: {dirigeName}</Typography>
        <Typography variant="subtitle1">Primera Oración: {oracionName}</Typography>
        <Typography variant="subtitle1">Artículo de Fe: {agenda.articuloFe}</Typography>
        <Typography variant="subtitle1">Mensaje: {mensajeName}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Tiempo para Cantar:
        </Typography>
        <ul>
          {hymns.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Cumpleaños esta semana:
        </Typography>
        <ul>
          {birthdays.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Notas:
        </Typography>
        <p>{agenda.notas}</p>
      </CardContent>
    </Card>
  );
};

export default AgendaView;
