// src/ChildrenList.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';

const ChildrenList = () => {
  const [children, setChildren] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchChildren = async () => {
    const querySnapshot = await getDocs(collection(db, 'children'));
    const childrenData = [];
    querySnapshot.forEach(doc => {
      childrenData.push({ id: doc.id, ...doc.data() });
    });
    setChildren(childrenData);
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Actualizar niño
        await updateDoc(doc(db, 'children', editingId), { name });
        setEditingId(null);
      } else {
        // Agregar nuevo niño
        await addDoc(collection(db, 'children'), { name });
      }
      setName('');
      fetchChildren();
    } catch (error) {
      console.error("Error en ABM de niños: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'children', id));
      fetchChildren();
    } catch (error) {
      console.error("Error al eliminar niño: ", error);
    }
  };

  const handleEdit = (child) => {
    setName(child.name);
    setEditingId(child.id);
  };

  return (
    <div style={{ maxWidth: 500, margin: '20px auto' }}>
      <Card sx={{ backgroundColor: '#fff8dc' }}>
        <CardContent>
          <Typography variant="h5">Gestión de Niños</Typography>
          <form onSubmit={handleAddOrUpdate}>
            <TextField
              fullWidth
              label="Nombre del niño"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
              required
            />
            <Button variant="contained" color="primary" type="submit">
              {editingId ? 'Actualizar' : 'Agregar'}
            </Button>
          </form>
        </CardContent>
      </Card>
      <div style={{ marginTop: '20px' }}>
        {children.map(child => (
          <Card key={child.id} sx={{ margin: '10px 0', backgroundColor: '#e6ffe6' }}>
            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography>{child.name}</Typography>
              <div>
                <Button variant="outlined" onClick={() => handleEdit(child)} size="small" sx={{ marginRight: 1 }}>
                  Editar
                </Button>
                <Button variant="outlined" onClick={() => handleDelete(child.id)} size="small" color="error">
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChildrenList;
