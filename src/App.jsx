import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Transposicion from './components/Transposicion';
import Trama from './components/Trama';
import SaltosSucesivos from './components/SaltosSucesivos';
import DiscosConcentricos from './components/DiscosConcentricos';
import Dibase from './components/Dibase';
import CifradoCesar from './components/CifradoCesar';
import AbecedarioExcel from './components/AbecedarioExcel';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>Algoritmos Criptográficos</h1>
          <nav>
            <ul className="nav-list">
              <li><Link to="/transposicion">Transposición</Link></li>
              <li><Link to="/trama">Trama</Link></li>
              <li><Link to="/saltos-sucesivos">Saltos Sucesivos</Link></li>
              <li><Link to="/discos-concentricos">Discos Concéntricos</Link></li>
              <li><Link to="/dibase">Dibase</Link></li>
              <li><Link to="/cifrado-cesar">Cifrado César</Link></li>
              <li><Link to="/abecedario-excel">Abecedario Excel</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/transposicion" element={<Transposicion />} />
            <Route path="/trama" element={<Trama />} />
            <Route path="/saltos-sucesivos" element={<SaltosSucesivos />} />
            <Route path="/discos-concentricos" element={<DiscosConcentricos />} />
            <Route path="/dibase" element={<Dibase />} />
            <Route path="/cifrado-cesar" element={<CifradoCesar />} />
            <Route path="/abecedario-excel" element={<AbecedarioExcel />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home-container">
      <h2>Bienvenido al Simulador de Algoritmos Criptográficos</h2>
      <p>Selecciona un algoritmo del menú superior para comenzar.</p>
    </div>
  );
}

export default App;
