// src/components/AgendaForm.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const AgendaForm = ({ agendaToEdit, onSave }) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [anuncios, setAnuncios] = useState('');
  const [dirige, setDirige] = useState('');
  // ... etc. con todos los campos

  useEffect(() => {
    if (agendaToEdit) {
      setYear(agendaToEdit.year || '');
      setMonth(agendaToEdit.month || '');
      setAnuncios(agendaToEdit.anuncios || '');
      setDirige(agendaToEdit.dirige || '');
      // ...
    }
  }, [agendaToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (agendaToEdit && agendaToEdit.id) {
        // Update
        const docRef = doc(db, 'agendas', agendaToEdit.id);
        await updateDoc(docRef, {
          year: Number(year),
          month: Number(month),
          anuncios,
          dirige,
          // ...
        });
      } else {
        // Create
        await addDoc(collection(db, 'agendas'), {
          year: Number(year),
          month: Number(month),
          anuncios,
          dirige,
          createdAt: new Date()
        });
      }
      onSave && onSave();
    } catch (error) {
      console.error('Error guardando agenda: ', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">
          {agendaToEdit ? 'Editar Agenda' : 'Crear Agenda'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Año"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="number"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Mes"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            type="number"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Anuncios"
            value={anuncios}
            onChange={(e) => setAnuncios(e.target.value)}
            multiline
            fullWidth
            margin="normal"
          />
          <TextField
            label="Dirige"
            value={dirige}
            onChange={(e) => setDirige(e.target.value)}
            fullWidth
            margin="normal"
          />
          {/* Repite para los demás campos: primeraOracion, articuloFe, mensaje, etc. */}

          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AgendaForm;
