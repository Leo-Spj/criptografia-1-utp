import { useState } from 'react';
import { reordenar } from '../utils/transposicionUtils';
import { formatNumericKeys, joinCharacters } from '../utils/formatUtils';

const Transposicion = () => {
  const [cadenaPrincipal, setCadenaPrincipal] = useState('AÑHUNBGMYPWTDOVXKFCLZSQREJI');
  const [claveSuperior, setClaveSuperior] = useState('8 7 6 4 3 2');
  const [claveInferior, setClaveInferior] = useState('8 2 3 6 4 7');
  const [resultado, setResultado] = useState('');

  const handleClaveSuperiorChange = (e) => {
    setClaveSuperior(formatNumericKeys(e.target.value));
  };

  const handleClaveInferiorChange = (e) => {
    setClaveInferior(formatNumericKeys(e.target.value));
  };

  const handleCadenaPrincipalChange = (e) => {
    setCadenaPrincipal(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const cadenaNormalizada = joinCharacters(cadenaPrincipal);
      const resultado = reordenar(cadenaNormalizada, claveSuperior, claveInferior);
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
            onChange={handleCadenaPrincipalChange}
            required
          />
          <small>Los espacios en la cadena principal serán ignorados automáticamente</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="claveSuperior">Clave Superior (se formateará automáticamente):</label>
          <input
            id="claveSuperior"
            type="text"
            value={claveSuperior}
            onChange={handleClaveSuperiorChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="claveInferior">Clave Inferior (se formateará automáticamente):</label>
          <input
            id="claveInferior"
            type="text"
            value={claveInferior}
            onChange={handleClaveInferiorChange}
            required
          />
        </div>
        
        <button type="submit">Reordenar</button>
      </form>
      
      {resultado && (
        <div className="result-container">
          <h3>Resultado:</h3>
          <div className="result">{resultado}</div>
          <div className="tabla-caracteres">
            <table>
              <tbody>
                <tr>
                  {resultado.split('').map((caracter, index) => (
                    <td key={index}>{caracter}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <style jsx>{`
            .tabla-caracteres {
              overflow-x: auto;
              margin-top: 15px;
            }
            .tabla-caracteres table {
              border-collapse: collapse;
              width: 100%;
            }
            .tabla-caracteres td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: center;
              min-width: 30px;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default Transposicion;
