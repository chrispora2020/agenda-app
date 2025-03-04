// src/AgendaView.jsx
import React from 'react';
import './Agenda.css';

const AgendaView = ({
  fecha = "7 de Enero",
  anuncios = "",
  dirige = "",
  primeraOracion = "",
  articuloFe = "",
  mensaje = "",
  cumpleanios = "",
  notas = "",
  tiempoParaCantar = "",
  claseValientes = "",
  claseHLJ = "",
  claseGuarderia = "",
  listaHimnos = [],
  presidencia = []
}) => {
  return (
    <div className="agenda-container">
      <h2 className="agenda-title">Programa Dominical</h2>
      <h3 className="agenda-date">{fecha}</h3>

      <div className="agenda-section anuncios">
        <h4>Anuncios</h4>
        <p>{anuncios}</p>
      </div>

      <div className="agenda-row">
        <div className="agenda-section medium-box">
          <h4>Dirige</h4>
          <p>{dirige}</p>
        </div>
        <div className="agenda-section medium-box">
          <h4>Primera Oración</h4>
          <p>{primeraOracion}</p>
        </div>
      </div>

      <div className="agenda-row">
        <div className="agenda-section small-box">
          <h4>Artículo de Fe</h4>
          <p>{articuloFe}</p>
        </div>
        <div className="agenda-section small-box">
          <h4>Mensaje</h4>
          <p>{mensaje}</p>
        </div>
      </div>

      <div className="agenda-row">
        <div className="agenda-section small-box">
          <h4>Cumpleaños</h4>
          <p>{cumpleanios}</p>
        </div>
        <div className="agenda-section small-box">
          <h4>Notas</h4>
          <p>{notas}</p>
        </div>
      </div>

      <div className="agenda-section">
        <h4>Tiempo para Cantar</h4>
        <p>{tiempoParaCantar}</p>
      </div>

      <div className="agenda-row">
        <div className="agenda-section small-box">
          <h4>Clase Valientes</h4>
          <p>{claseValientes}</p>
        </div>
        <div className="agenda-section small-box">
          <h4>Clase HLJ</h4>
          <p>{claseHLJ}</p>
        </div>
        <div className="agenda-section small-box">
          <h4>Guardería</h4>
          <p>{claseGuarderia}</p>
        </div>
      </div>

      <div className="agenda-section">
        <h4>Lista de Himnos</h4>
        <ul>
          {listaHimnos.map((himno, index) => (
            <li key={index}>{himno}</li>
          ))}
        </ul>
      </div>

      <div className="agenda-section">
        <h4>Presidencia de la Primaria</h4>
        <ul>
          {presidencia.map((persona, index) => (
            <li key={index}>{persona}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AgendaView;
