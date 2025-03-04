import { useState } from 'react';
import { reordenar } from '../utils/transposicionUtils';

const Transposicion = () => {
  const [cadenaPrincipal, setCadenaPrincipal] = useState('AÑHUNBGMYPWTDOVXKFCLZSQREJI');
  const [claveSuperior, setClaveSuperior] = useState('8 7 6 4 3 2');
  const [claveInferior, setClaveInferior] = useState('8 2 3 6 4 7');
  const [resultado, setResultado] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const resultado = reordenar(cadenaPrincipal, claveSuperior, claveInferior);
      setResultado(resultado);
    } catch (error) {
      setResultado(`Error: ${error.message}`);
    }
  };

  return (
    <div className="component-container">
      <h2>Algoritmo de Transposición</h2>
      
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
          <label htmlFor="claveSuperior">Clave Superior (separada por espacios):</label>
          <input
            id="claveSuperior"
            type="text"
            value={claveSuperior}
            onChange={(e) => setClaveSuperior(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="claveInferior">Clave Inferior (separada por espacios):</label>
          <input
            id="claveInferior"
            type="text"
            value={claveInferior}
            onChange={(e) => setClaveInferior(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Reordenar</button>
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

export default Transposicion;
