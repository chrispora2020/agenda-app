// src/pages/AgendasPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { Typography, Card, CardContent, List, ListItem, ListItemText, Button } from '@mui/material';
import AgendaForm from '../components/AgendaForm';

const AgendasPage = () => {
  const [agendas, setAgendas] = useState([]);
  const [selectedAgenda, setSelectedAgenda] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'agendas'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach(doc => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setAgendas(items);
    });
    return () => unsubscribe();
  }, []);

  const handleNewAgenda = () => {
    setSelectedAgenda(null);
    setShowForm(true);
  };

  const handleEditAgenda = (agenda) => {
    setSelectedAgenda(agenda);
    setShowForm(true);
  };

  const handleSaved = () => {
    setShowForm(false);
    setSelectedAgenda(null);
  };

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Lista de Agendas
      </Typography>
      <Button variant="contained" onClick={handleNewAgenda} sx={{ mb: 2 }}>
        Nueva Agenda
      </Button>
      {showForm ? (
        <AgendaForm agendaToEdit={selectedAgenda} onSave={handleSaved} />
      ) : (
        <Card>
          <CardContent>
            <List>
              {agendas.map(agenda => (
                <ListItem key={agenda.id} sx={{ borderBottom: '1px solid #ccc' }}>
                  <ListItemText
                    primary={`Agenda para ${agenda.sunday || ''}`}
                    secondary={agenda.anuncios || ''}
                  />
                  <Button variant="text" onClick={() => handleEditAgenda(agenda)}>
                    Editar
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgendasPage;
