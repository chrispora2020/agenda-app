// src/components/MusicForm.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const MusicForm = ({ musicToEdit, onSave }) => {
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (musicToEdit) {
      setTitle(musicToEdit.title || '');
      setNumber(musicToEdit.number || '');
    } else {
      setTitle('');
      setNumber('');
    }
  }, [musicToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (musicToEdit && musicToEdit.id) {
        // Actualizar
        await updateDoc(doc(db, 'music', musicToEdit.id), {
          title,
          number: Number(number),
        });
      } else {
        // Crear
        await addDoc(collection(db, 'music'), {
          title,
          number: Number(number),
          createdAt: new Date()
        });
      }
      onSave && onSave();
    } catch (error) {
      console.error("Error guardando himno:", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: '0 auto' }}>
      <CardContent>
        <Typography variant="h6">
          {musicToEdit ? 'Editar Himno' : 'Agregar Himno'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Número"
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Guardar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MusicForm;
