// src/components/ChildrenList.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Card, CardContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import ChildrenForm from './ChildrenForm';

const ChildrenList = () => {
  const [children, setChildren] = useState([]);
  const [editingChild, setEditingChild] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchChildren = async () => {
    const querySnapshot = await getDocs(collection(db, 'children'));
    const data = [];
    querySnapshot.forEach((docItem) => {
      data.push({ id: docItem.id, ...docItem.data() });
    });
    setChildren(data);
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'children', id));
      fetchChildren();
    } catch (error) {
      console.error("Error al eliminar niño:", error);
    }
  };

  const handleEdit = (child) => {
    setEditingChild(child);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingChild(null);
    setShowForm(true);
  };

  const handleSave = () => {
    setShowForm(false);
    fetchChildren();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleAdd} sx={{ mb: 2 }}>
        Agregar Niño
      </Button>
      {showForm ? (
        <ChildrenForm childToEdit={editingChild} onSave={handleSave} />
      ) : (
        <Card>
          <CardContent>
            <Typography variant="h5">Lista de Niños</Typography>
            <List>
              {children.map((child) => (
                <ListItem key={child.id}>
                  <ListItemText
                    primary={child.name}
                    secondary={`Nació el: ${child.birthdate}`}
                  />
                  <Button variant="text" onClick={() => handleEdit(child)}>
                    Editar
                  </Button>
                  <Button variant="text" color="error" onClick={() => handleDelete(child.id)}>
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

export default ChildrenList;
