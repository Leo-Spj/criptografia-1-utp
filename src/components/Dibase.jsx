import { useState } from 'react';
import { procesarDibase } from '../utils/dibaseUtils';

const Dibase = () => {
  const [cadena36, setCadena36] = useState('AÑHUNBGMYPWTDOVXKFCLZSQREJI123456789');
  const [clave, setClave] = useState('586731');
  const [texto, setTexto] = useState('amapola');
  const [resultado, setResultado] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const resultadoProcesado = procesarDibase(cadena36, clave, texto);
      setResultado(resultadoProcesado);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const renderMatriz = (matriz, clave) => {
    return (
      <table className="matriz-dibase">
        <thead>
          <tr>
            <th></th>
            {clave.split('').map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matriz.map((fila, i) => (
            <tr key={i}>
              <th>{clave[i]}</th>
              {fila.map((celda, j) => (
                <td key={j}>{celda}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="component-container">
      <h2>Algoritmo Dibase</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cadena36">
            Cadena de 36 caracteres (para matriz 6x6):
          </label>
          <input
            id="cadena36"
            type="text"
            value={cadena36}
            onChange={(e) => setCadena36(e.target.value)}
            required
          />
          <small>Debe tener exactamente 36 caracteres</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="clave">
            Clave (6 caracteres para ambos ejes):
          </label>
          <input
            id="clave"
            type="text"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
          <small>Debe tener exactamente 6 caracteres</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="texto">
            Texto a encriptar:
          </label>
          <input
            id="texto"
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Procesar</button>
      </form>
      
      {resultado && (
        <div className="result-container">
          <h3>Matriz generada:</h3>
          {renderMatriz(resultado.matriz, resultado.clave)}
          
          <h3>Texto original: {texto}</h3>
          <div>
            <p><strong>Texto encriptado (coordenadas separadas):</strong></p>
            <p>X: {resultado.resultadoEncriptado.coordsX}</p>
            <p>Y: {resultado.resultadoEncriptado.coordsY}</p>
            
            <p><strong>Secuencia unificada:</strong> {resultado.resultadoEncriptado.secuenciaUnificada}</p>
            <p><strong>Pares para buscar:</strong> {resultado.resultadoEncriptado.paresNuevos}</p>
            
            <h4>Proceso de desencriptación con nueva secuencia:</h4>
            <p><strong>Coordenadas - Valor en matriz:</strong></p>
            <ul>
              {resultado.paresDesencriptados.map((item, index) => (
                <li key={index}>{item.par} - {item.valor}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dibase;