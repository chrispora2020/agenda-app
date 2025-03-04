// src/components/Layout.jsx
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Box
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

// Icono personalizado (☰) en lugar de "@mui/icons-material/Menu"
const MenuIcon = () => (
  <span style={{ fontSize: "1.8rem", display: "inline-block", lineHeight: "1" }}>
    ☰
  </span>
);

const drawerWidth = 300;

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Funciones que Sidebar usará para navegar
  const handleSelectSunday = (sunday) => {
    navigate(`/agendas?date=${sunday.toISOString()}`);
    setMobileOpen(false);
  };
  const handleAltaNinos = () => {
    navigate("/children");
    setMobileOpen(false);
  };
  const handleAltaMusica = () => {
    navigate("/music");
    setMobileOpen(false);
  };

  // Contenido del Drawer (Sidebar)
  const drawerContent = (
    <Sidebar
      onSelectSunday={handleSelectSunday}
      onAltaNinos={handleAltaNinos}
      onAltaMusica={handleAltaMusica}
    />
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* Barra superior */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {/* Botón de menú en pantallas pequeñas */}
          <IconButton
            color="inherit"
            aria-label="abrir menú"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: "block", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Agenda Dominical
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer para móviles */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Drawer permanente en pantallas grandes */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth
            }
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Contenido principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: "64px", // espacio para el AppBar
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        {/* Contenedor centrado para que los formularios no queden pegados */}
        <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;
