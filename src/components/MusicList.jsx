// src/components/MusicList.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import MusicForm from './MusicForm';

const MusicList = () => {
  const [music, setMusic] = useState([]);
  const [editingMusic, setEditingMusic] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMusic = async () => {
    const querySnapshot = await getDocs(collection(db, 'music'));
    const data = [];
    querySnapshot.forEach((docItem) => {
      data.push({ id: docItem.id, ...docItem.data() });
    });
    setMusic(data);
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'music', id));
      fetchMusic();
    } catch (error) {
      console.error("Error al eliminar himno:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingMusic(item);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingMusic(null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    fetchMusic();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
        Agregar Himno
      </Button>
      {showForm ? (
        <MusicForm musicToEdit={editingMusic} onSave={handleSave} />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h5">Lista de Himnos</Typography>
            <List>
              {music.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={`${item.number} - ${item.title}`}
                  />
                  <Button variant="text" onClick={() => handleEdit(item)}>
                    Editar
                  </Button>
                  <Button variant="text" color="error" onClick={() => handleDelete(item.id)}>
                    Eliminar
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

export default MusicList;
