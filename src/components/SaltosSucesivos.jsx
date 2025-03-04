import { useState } from 'react';
import { ordenarCadena, ordenarCadenaConDirecciones } from '../utils/saltosUtils';

const SaltosSucesivos = () => {
  const [cadena, setCadena] = useState('T X V W P O D');
  const [saltos, setSaltos] = useState('4 6 8');
  const [direcciones, setDirecciones] = useState('IDI');
  const [usarDirecciones, setUsarDirecciones] = useState(false);
  const [resultado, setResultado] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (usarDirecciones) {
        const result = ordenarCadenaConDirecciones(cadena, saltos, direcciones);
        setResultado(result);
      } else {
        const result = ordenarCadena(cadena, saltos);
        setResultado(result);
      }
    } catch (error) {
      setResultado(`Error: ${error.message}`);
    }
  };

  return (
    <div className="component-container">
      <h2>Algoritmo de Saltos Sucesivos</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cadena">Cadena (elementos separados por espacios):</label>
          <input
            id="cadena"
            type="text"
            value={cadena}
            onChange={(e) => setCadena(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="saltos">Saltos (separados por espacios):</label>
          <input
            id="saltos"
            type="text"
            value={saltos}
            onChange={(e) => setSaltos(e.target.value)}
            required
          />
          <small>Si se desea por ESPACIOS sumar 1 a cada salto ejemplo "4 6 8" - [5 7 9]</small>
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={usarDirecciones}
              onChange={(e) => setUsarDirecciones(e.target.checked)}
            />
            Usar direcciones
          </label>
        </div>
        
        {usarDirecciones && (
          <div className="form-group">
            <label htmlFor="direcciones">Direcciones (I=izquierda, D=derecha):</label>
            <input
              id="direcciones"
              type="text"
              value={direcciones}
              onChange={(e) => setDirecciones(e.target.value)}
              required={usarDirecciones}
            />
          </div>
        )}
        
        <button type="submit">Ordenar Cadena</button>
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

export default SaltosSucesivos;
