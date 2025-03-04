// src/components/AgendaList.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { List, ListItem, ListItemText } from '@mui/material';

const AgendaList = ({ year, month, onSelectAgenda }) => {
  const [agendas, setAgendas] = useState([]);

  useEffect(() => {
    if (!year || !month) return;
    const q = query(
      collection(db, 'agendas'),
      where('year', '==', Number(year)),
      where('month', '==', Number(month)),
      orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = [];
      snapshot.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      setAgendas(items);
    });
    return () => unsubscribe();
  }, [year, month]);

  return (
    <List>
      {agendas.map((agenda) => (
        <ListItem
          button
          key={agenda.id}
          onClick={() => onSelectAgenda(agenda)}
        >
          <ListItemText
            primary={`Agenda del ${agenda.year}-${agenda.month}`}
            secondary={agenda.anuncios?.slice(0, 50) + '...'}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default AgendaList;
