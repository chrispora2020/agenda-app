// src/App.js
import React from 'react';
import AgendaForm from './AgendaForm';
import AgendaList from './AgendaList';

function App() {
  return (
    <div className="App">
      <h1>Agenda de la Primaria</h1>
      <AgendaForm />
      <AgendaList />
    </div>
  );
}

export default App;
