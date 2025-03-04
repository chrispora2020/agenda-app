// src/components/Sidebar.jsx
import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Button,
  Typography,
} from "@mui/material";

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Función para obtener todos los domingos de un mes (1-indexado)
function getSundays(year, month) {
  const sundays = [];
  const date = new Date(year, month - 1, 1);
  while (date.getDay() !== 0) {
    date.setDate(date.getDate() + 1);
  }
  while (date.getMonth() === month - 1) {
    sundays.push(new Date(date));
    date.setDate(date.getDate() + 7);
  }
  return sundays;
}

const Sidebar = ({
  year = new Date().getFullYear(),
  onSelectSunday = () => {},
  onAltaNinos = () => {},
  onAltaMusica = () => {}
}) => {
  const [expandedMonth, setExpandedMonth] = useState(null);

  const handleChange = (index) => {
    setExpandedMonth(prev => (prev === index ? null : index));
  };

  return (
    <Box
      sx={{
        width: 300,
        backgroundColor: "#FFA726",
        height: "100%",
        overflowY: "auto",
        p: 2,
        boxSizing: "border-box"
      }}
    >
      <Typography variant="h6" align="center" sx={{ mb: 2, color: "#fff" }}>
        Menú de Meses
      </Typography>

      {monthNames.map((name, index) => {
        const monthNumber = index + 1;
        const isExpanded = expandedMonth === index;
        const sundays = getSundays(year, monthNumber);
        return (
          <Accordion
            key={monthNumber}
            expanded={isExpanded}
            onChange={() => handleChange(index)}
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              boxShadow: "none",
              mb: 1,
            }}
          >
            <AccordionSummary expandIcon={<span style={{ fontSize: "1.5rem" }}>▼</span>}>
              <Typography>{name}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <List>
                {sundays.map((sunday, idx) => {
                  const dateString = sunday.toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  });
                  return (
                    <ListItem key={idx} disablePadding>
                      <ListItemButton onClick={() => onSelectSunday(sunday)}>
                        <ListItemText primary={`Domingo ${dateString}`} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}

      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Button
          variant="contained"
          sx={{ mb: 2, backgroundColor: "#FFF", color: "#000" }}
          onClick={onAltaNinos}
        >
          Dar de Alta Niños
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#FFF", color: "#000" }}
          onClick={onAltaMusica}
        >
          Dar de Alta Música
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
