// src/EditAgendaDialog.jsx
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Snackbar, Alert } from '@mui/material';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';


const EditAgendaDialog = ({ open, agenda, onClose }) => {
  const [title, setTitle] = useState(agenda.title);
  const [group, setGroup] = useState(agenda.group);
  const [duration, setDuration] = useState(agenda.duration);
  const [activities, setActivities] = useState(agenda.activities);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    setTitle(agenda.title);
    setGroup(agenda.group);
    setDuration(agenda.duration);
    setActivities(agenda.activities);
  }, [agenda]);

  const handleSave = async () => {
    try {
      const agendaRef = doc(db, 'agendas', agenda.id);
      await updateDoc(agendaRef, {
        title,
        group,
        duration: Number(duration),
        activities
      });
      setSnackbarSeverity('success');
      setSnackbarMessage('Agenda actualizada exitosamente');
      setOpenSnackbar(true);
      onClose(); // Cierra el diálogo tras el guardado exitoso
    } catch (error) {
      console.error("Error al actualizar agenda:", error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error al actualizar agenda');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Agenda</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="dense"
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Grupo"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Duración (minutos)"
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Actividades"
          multiline
          rows={3}
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Guardar</Button>
      </DialogActions>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default EditAgendaDialog;
