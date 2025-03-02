// src/ChildrenList.jsx
import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from './firebase';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert
} from '@mui/material';

const ChildrenList = () => {
  const [children, setChildren] = useState([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Estados para el Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Cargar lista de niños al montar el componente
  const fetchChildren = async () => {
    const querySnapshot = await getDocs(collection(db, 'children'));
    const childrenData = [];
    querySnapshot.forEach((docItem) => {
      childrenData.push({ id: docItem.id, ...docItem.data() });
    });
    setChildren(childrenData);
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  // Agregar o actualizar un niño
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Actualizar
        await updateDoc(doc(db, 'children', editingId), { name });
        setSnackbarSeverity('success');
        setSnackbarMessage('¡Niño actualizado con éxito!');
      } else {
        // Agregar nuevo
        await addDoc(collection(db, 'children'), { name });
        setSnackbarSeverity('success');
        setSnackbarMessage('¡Niño agregado con éxito!');
      }
      setOpenSnackbar(true);

      // Limpiar campos
      setName('');
      setEditingId(null);

      // Recargar lista
      fetchChildren();
    } catch (error) {
      console.error('Error al guardar/actualizar niño: ', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Ocurrió un error al guardar/actualizar niño');
      setOpenSnackbar(true);
    }
  };

  // Eliminar un niño
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'children', id));
      setSnackbarSeverity('success');
      setSnackbarMessage('Niño eliminado con éxito');
      setOpenSnackbar(true);

      fetchChildren();
    } catch (error) {
      console.error('Error al eliminar niño: ', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Ocurrió un error al eliminar niño');
      setOpenSnackbar(true);
    }
  };

  // Preparar edición
  const handleEdit = (child) => {
    setName(child.name);
    setEditingId(child.id);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto' }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {editingId ? 'Editar Niño' : 'Agregar Niño'}
          </Typography>
          <form onSubmit={handleAddOrUpdate}>
            <TextField
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              margin="normal"
            />
            <Button variant="contained" color="primary" type="submit">
              {editingId ? 'Actualizar' : 'Agregar'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6">Lista de Niños</Typography>
        {children.map((child) => (
          <Card key={child.id} style={{ margin: '10px 0' }}>
            <CardContent
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            >
              <Typography>{child.name}</Typography>
              <div>
                <Button
                  variant="outlined"
                  onClick={() => handleEdit(child)}
                  style={{ marginRight: '10px' }}
                >
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(child.id)}
                >
                  Eliminar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Snackbar para mostrar mensajes */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChildrenList;
