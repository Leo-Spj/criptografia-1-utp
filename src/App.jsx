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
    <Router basename="/criptografia-1-utp">
      <div className="app-container">
        <header>
          <h1>Algoritmos Criptográficos</h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a
              href="https://github.com/Leo-Spj/criptografia-1-utp"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                padding: '12px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                textDecoration: 'none',
                transition: 'background-color 0.3s',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#2980b9')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#3498db')}
            >
              GitHub
            </a>
          </div>
          <nav>
            <ul className="nav-list">
              <li><Link to="/abecedario-excel">Abecedario a Excel</Link></li>
              <li><Link to="/cifrado-cesar">Cifrado César</Link></li>
              <li><Link to="/saltos-sucesivos">Saltos Sucesivos</Link></li>
              <li><Link to="/transposicion">Transposición</Link></li>
              <li><Link to="/trama">Trama</Link></li>
              <li><Link to="/discos-concentricos">Discos Concéntricos</Link></li>
              <li><Link to="/dibase">Dibase</Link></li>
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
