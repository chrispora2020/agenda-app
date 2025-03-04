// src/components/AgendaForm.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Autocomplete,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';
import { db } from '../firebase';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs
} from 'firebase/firestore';

function getWeekRange(dateStr) {
  // Ajusta la lógica según tus reglas de "semana pasada" o "semana actual".
  const date = new Date(dateStr);
  const dayOfWeek = date.getDay(); // 0 = Domingo
  // Digamos que consideramos la semana de Lunes a Domingo
  const monday = new Date(date);
  monday.setDate(date.getDate() - ((dayOfWeek + 6) % 7));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return [monday, sunday];
}

const AgendaForm = ({ agendaToEdit, onSave }) => {
  // Campos de la agenda
  const [sunday, setSunday] = useState('2025-01-07'); // Por defecto, o lo recibes por props
  const [dirige, setDirige] = useState(null);
  const [primeraOracion, setPrimeraOracion] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [articuloFe, setArticuloFe] = useState('');
  const [tiempoParaCantar, setTiempoParaCantar] = useState([]);
  const [notas, setNotas] = useState('');
  const [cumpleanios, setCumpleanios] = useState([]);

  // Datos de Firestore
  const [allChildren, setAllChildren] = useState([]);
  const [allMusic, setAllMusic] = useState([]);

  // Popup de éxito
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Cargar niños y música al montar
  useEffect(() => {
    const fetchData = async () => {
      const childrenSnap = await getDocs(collection(db, 'children'));
      const childrenData = [];
      childrenSnap.forEach((docItem) => {
        childrenData.push({ id: docItem.id, ...docItem.data() });
      });
      setAllChildren(childrenData);

      const musicSnap = await getDocs(collection(db, 'music'));
      const musicData = [];
      musicSnap.forEach((docItem) => {
        musicData.push({ id: docItem.id, ...docItem.data() });
      });
      setAllMusic(musicData);
    };
    fetchData();
  }, []);

  // Si agendaToEdit existe, precargar los campos
  useEffect(() => {
    if (agendaToEdit) {
      setSunday(agendaToEdit.sunday || '2025-01-07');
      setDirige(agendaToEdit.dirige || null);
      setPrimeraOracion(agendaToEdit.primeraOracion || null);
      setMensaje(agendaToEdit.mensaje || null);
      setArticuloFe(agendaToEdit.articuloFe || '');
      setTiempoParaCantar(agendaToEdit.tiempoParaCantar || []);
      setNotas(agendaToEdit.notas || '');
      setCumpleanios(agendaToEdit.cumpleanios || []);
    } else {
      // Nuevo
      setSunday('2025-01-07');
      setDirige(null);
      setPrimeraOracion(null);
      setMensaje(null);
      setArticuloFe('');
      setTiempoParaCantar([]);
      setNotas('');
      setCumpleanios([]);
    }
  }, [agendaToEdit]);

  // Calcular cumpleaños automáticamente
  useEffect(() => {
    if (!sunday) return;
    const [monday, sundayDate] = getWeekRange(sunday);
    const result = allChildren.filter((child) => {
      if (!child.birthdate) return false;
      const bd = new Date(child.birthdate);
      // Ajusta el año al actual
      const testDate = new Date(sundayDate.getFullYear(), bd.getMonth(), bd.getDate());
      return testDate >= monday && testDate <= sundayDate;
    });
    setCumpleanios(result.map(r => r.id));
  }, [sunday, allChildren]);

  // Guardar agenda
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        sunday,
        dirige,
        primeraOracion,
        mensaje,
        articuloFe,
        tiempoParaCantar,
        notas,
        cumpleanios,
        createdAt: new Date()
      };
      if (agendaToEdit && agendaToEdit.id) {
        // Update
        await updateDoc(doc(db, 'agendas', agendaToEdit.id), data);
      } else {
        // Create
        await addDoc(collection(db, 'agendas'), data);
      }
      setOpenSnackbar(true);
      // Limpieza de campos si es nuevo
      if (!agendaToEdit) {
        setSunday('2025-01-07');
        setDirige(null);
        setPrimeraOracion(null);
        setMensaje(null);
        setArticuloFe('');
        setTiempoParaCantar([]);
        setNotas('');
        setCumpleanios([]);
      }
      onSave && onSave();
    } catch (error) {
      console.error('Error al guardar agenda:', error);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  // Buscar un niño por ID
  const findChildById = (id) => allChildren.find((c) => c.id === id) || null;
  // Buscar himno por ID
  const findMusicById = (id) => allMusic.find((m) => m.id === id) || null;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {agendaToEdit ? 'Editar Agenda' : 'Nueva Agenda'}
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Fecha del domingo */}
          <TextField
            label="Fecha del Domingo"
            type="date"
            value={sunday}
            onChange={(e) => setSunday(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          {/* Dirige */}
          <Autocomplete
            options={allChildren}
            getOptionLabel={(option) => option.name || ''}
            value={findChildById(dirige)}
            onChange={(e, newValue) => setDirige(newValue ? newValue.id : null)}
            renderInput={(params) => (
              <TextField {...params} label="Dirige" margin="normal" fullWidth />
            )}
          />

          {/* Primera Oración */}
          <Autocomplete
            options={allChildren}
            getOptionLabel={(option) => option.name || ''}
            value={findChildById(primeraOracion)}
            onChange={(e, newValue) => setPrimeraOracion(newValue ? newValue.id : null)}
            renderInput={(params) => (
              <TextField {...params} label="Primera Oración" margin="normal" fullWidth />
            )}
          />

          {/* Mensaje */}
          <Autocomplete
            options={allChildren}
            getOptionLabel={(option) => option.name || ''}
            value={findChildById(mensaje)}
            onChange={(e, newValue) => setMensaje(newValue ? newValue.id : null)}
            renderInput={(params) => (
              <TextField {...params} label="Mensaje" margin="normal" fullWidth />
            )}
          />

          {/* Artículo de Fe */}
          <TextField
            label="Artículo de Fe"
            value={articuloFe}
            onChange={(e) => setArticuloFe(e.target.value)}
            fullWidth
            margin="normal"
          />

          {/* Tiempo para Cantar (selección múltiple) */}
          <Autocomplete
            multiple
            options={allMusic}
            getOptionLabel={(option) => `${option.number} - ${option.title}`}
            value={allMusic.filter((m) => tiempoParaCantar.includes(m.id))}
            onChange={(e, newValue) => {
              setTiempoParaCantar(newValue.map((item) => item.id));
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={`${option.number} - ${option.title}`}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Tiempo para Cantar" margin="normal" fullWidth />
            )}
          />

          {/* Notas */}
          <TextField
            label="Notas"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            multiline
            rows={3}
            fullWidth
            margin="normal"
          />

          {/* Cumpleaños de la semana */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Cumpleaños esta semana:
          </Typography>
          <ul>
            {cumpleanios.map((id) => {
              const child = findChildById(id);
              return child ? <li key={id}>{child.name}</li> : null;
            })}
          </ul>

          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Guardar Agenda
          </Button>
        </form>
      </CardContent>

      {/* Popup de éxito */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          ¡Agenda guardada con éxito!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default AgendaForm;
