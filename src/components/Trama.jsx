import { useState } from 'react';
import { reordenarGrupos } from '../utils/tramaUtils';
import { formatNumericKeys, joinCharacters } from '../utils/formatUtils';

const Trama = () => {
  const [cadenaPrincipal, setCadenaPrincipal] = useState('ZSQRCLKFEJI');
  const [claveDada, setClaveDada] = useState('7 2 6 5 3');
  const [claveOrdenatoria, setClaveOrdenatoria] = useState('5 6 7 2 3');
  const [resultado, setResultado] = useState('');

  const handleClaveDadaChange = (e) => {
    setClaveDada(formatNumericKeys(e.target.value));
  };

  const handleClaveOrdenatoriaChange = (e) => {
    setClaveOrdenatoria(formatNumericKeys(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const cadenaNormalizada = joinCharacters(cadenaPrincipal);
      const result = reordenarGrupos(cadenaNormalizada, claveDada, claveOrdenatoria);
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
          <small>Los espacios en la cadena principal serán ignorados automáticamente</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="claveDada">Clave Dada (se formateará automáticamente):</label>
          <input
            id="claveDada"
            type="text"
            value={claveDada}
            onChange={handleClaveDadaChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="claveOrdenatoria">Clave Ordenatoria (se formateará automáticamente):</label>
          <input
            id="claveOrdenatoria"
            type="text"
            value={claveOrdenatoria}
            onChange={handleClaveOrdenatoriaChange}
            required
          />
        </div>
        
        <button type="submit">Reordenar Grupos</button>
      </form>
      
      {resultado && (
        <div className="result-container">
          <h3>Resultado:</h3>
          <div className="result">{resultado}</div>
          <div className="tabla-caracteres">
            <table>
              <tbody>
                <tr>
                  {resultado.split('')
                    .filter(char => char !== ' ') // Filtrar espacios en blanco
                    .map((caracter, index) => (
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

export default Trama;
