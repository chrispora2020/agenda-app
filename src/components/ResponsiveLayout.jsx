// src/components/ResponsiveLayout.jsx
import React, { useState } from 'react';
import { AppBar, Box, Drawer, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function ResponsiveLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Agenda Dominical
      </Typography>
      <List>
        <ListItem button>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Inicio" />
          </Link>
        </ListItem>
        <ListItem button>
          <Link to="/agendas" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemText primary="Agendas" />
          </Link>
        </ListItem>
        {/* Otros enlaces */}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Barra superior */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="abrir menú"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}  // Solo en móviles
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Agenda Dominical
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Menú lateral: permanente en pantallas sm y mayores, Drawer temporal en móviles */}
      <Box
        component="nav"
        sx={{ width: { sm: 250 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Mejora el rendimiento en móviles
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px', // Espacio para el AppBar
          width: { sm: `calc(100% - 250px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveLayout;
