import { useState } from 'react';
import { reordenarGrupos } from '../utils/tramaUtils';

const Trama = () => {
  const [cadenaPrincipal, setCadenaPrincipal] = useState('ZSQRCLKFEJI');
  const [claveDada, setClaveDada] = useState('7 2 6 5 3');
  const [claveOrdenatoria, setClaveOrdenatoria] = useState('5 6 7 2 3');
  const [resultado, setResultado] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const result = reordenarGrupos(cadenaPrincipal, claveDada, claveOrdenatoria);
      setResultado(result);
    } catch (error) {
      setResultado(`Error: ${error.message}`);
    }
  };

  return (
    <div className="component-container">
      <h2>Algoritmo de Trama</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cadenaPrincipal">Cadena Principal:</label>
          <input
            id="cadenaPrincipal"
            type="text"
            value={cadenaPrincipal}
            onChange={(e) => setCadenaPrincipal(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="claveDada">Clave Dada (separada por espacios):</label>
          <input
            id="claveDada"
            type="text"
            value={claveDada}
            onChange={(e) => setClaveDada(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="claveOrdenatoria">Clave Ordenatoria (separada por espacios):</label>
          <input
            id="claveOrdenatoria"
            type="text"
            value={claveOrdenatoria}
            onChange={(e) => setClaveOrdenatoria(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Reordenar Grupos</button>
      </form>
      
      {resultado && (
        <div className="result-container">
          <h3>Resultado:</h3>
          <div className="result">{resultado}</div>
        </div>
      )}
    </div>
  );
};

export default Trama;
