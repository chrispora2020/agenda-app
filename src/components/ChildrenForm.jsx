// src/components/ChildrenForm.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';

const ChildrenForm = ({ childToEdit, onSave }) => {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');

  useEffect(() => {
    if (childToEdit) {
      setName(childToEdit.name || '');
      setBirthdate(childToEdit.birthdate || '');
    } else {
      setName('');
      setBirthdate('');
    }
  }, [childToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (childToEdit && childToEdit.id) {
        // Actualizar
        await updateDoc(doc(db, 'children', childToEdit.id), {
          name,
          birthdate
        });
      } else {
        // Crear
        await addDoc(collection(db, 'children'), {
          name,
          birthdate,
          createdAt: new Date()
        });
      }
      onSave && onSave();
    } catch (error) {
      console.error("Error guardando niño: ", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: '0 auto' }}>
      <CardContent>
        <Typography variant="h6">{childToEdit ? 'Editar Niño' : 'Agregar Niño'}</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Fecha de Nacimiento"
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
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

export default ChildrenForm;
