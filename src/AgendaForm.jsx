// src/AgendaForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Snackbar, Alert } from '@mui/material';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const AgendaForm = () => {
  const [title, setTitle] = useState('');
  const [group, setGroup] = useState('');
  const [duration, setDuration] = useState('');
  const [activities, setActivities] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'agendas'), {
        title,
        group,
        duration: Number(duration),
        activities,
        createdAt: new Date()
      });
      setSnackbarSeverity('success');
      setSnackbarMessage('¡Agenda guardada exitosamente!');
      setOpenSnackbar(true);
      // Limpiar campos
      setTitle('');
      setGroup('');
      setDuration('');
      setActivities('');
    } catch (error) {
      console.error("Error al guardar la agenda:", error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error al guardar la agenda');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <Card sx={{ maxWidth: 500, margin: '20px auto', backgroundColor: '#f0f8ff' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Crear Agenda
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Título"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Grupo (Ej: Primaria, Guardería)"
            variant="outlined"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Duración (minutos)"
            variant="outlined"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Actividades (detalles)"
            variant="outlined"
            multiline
            rows={4}
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
            Guardar Agenda
          </Button>
        </form>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default AgendaForm;
