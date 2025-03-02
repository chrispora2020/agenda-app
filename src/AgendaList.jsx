// src/AgendaList.jsx
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Snackbar, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditAgendaDialog from './EditAgendaDialog';

const AgendaList = () => {
  const [agendas, setAgendas] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedAgenda, setSelectedAgenda] = useState(null); // Agenda para editar
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'agendas'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const agendasData = [];
      snapshot.forEach(doc => agendasData.push({ id: doc.id, ...doc.data() }));
      setAgendas(agendasData);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'agendas', id));
      setSnackbarSeverity('success');
      setSnackbarMessage('Agenda eliminada exitosamente');
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error al eliminar agenda:", error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Error al eliminar agenda');
      setOpenSnackbar(true);
    }
  };

  const handleEdit = (agenda) => {
    setSelectedAgenda(agenda);
    setEditDialogOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: '20px auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Agendas Guardadas
      </Typography>
      {agendas.map(agenda => (
        <Accordion key={agenda.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{agenda.title}</Typography>
            <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
              {new Date(agenda.createdAt.seconds * 1000).toLocaleDateString()}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle1"><strong>Grupo:</strong> {agenda.group}</Typography>
            <Typography variant="subtitle1"><strong>Duración:</strong> {agenda.duration} minutos</Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              <strong>Actividades:</strong> {agenda.activities}
            </Typography>
            <div style={{ marginTop: '10px' }}>
              <Button variant="contained" size="small" sx={{ marginRight: 1 }} onClick={() => handleEdit(agenda)}>
                Editar
              </Button>
              <Button variant="outlined" size="small" color="error" onClick={() => handleDelete(agenda.id)}>
                Eliminar
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {selectedAgenda && (
        <EditAgendaDialog
          open={editDialogOpen}
          agenda={selectedAgenda}
          onClose={() => setEditDialogOpen(false)}
        />
      )}
    </div>
  );
};


export default AgendaList;
