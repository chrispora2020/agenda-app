// src/components/Layout.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import './layout.css'; // estilos extra

function Layout({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const years = [2023, 2024, 2025]; // Podrías generar dinámicamente
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar Superior */}
      <AppBar position="fixed">
        <Toolbar sx={{ backgroundColor: '#4da5a4' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Agenda Dominical
          </Typography>
          <button onClick={() => setDrawerOpen(true)}>Abrir Menú</button>
        </Toolbar>
      </AppBar>

      {/* Drawer Lateral */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation">
          <List>
            <ListItem>
              <Typography variant="h6">Filtrar por Año</Typography>
            </ListItem>
            {years.map((year) => (
              <ListItem button key={year}>
                <Link to={`/agendas/${year}`}>
                  <ListItemText primary={`Año ${year}`} />
                </Link>
              </ListItem>
            ))}
            <ListItem>
              <Typography variant="h6">Meses</Typography>
            </ListItem>
            {months.map((m) => (
              <ListItem button key={m}>
                <Link to={`/agendas/${new Date().getFullYear()}/${m}`}>
                  <ListItemText primary={`Mes ${m}`} />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Contenido Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px' }}>
        {children}
      </Box>
    </Box>
  );
}

export default Layout;
