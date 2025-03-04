import { useState } from 'react';
import { ordenarCadena, ordenarCadenaConDirecciones } from '../utils/saltosUtils';
import { formatNumericKeys, standardizeSpacing, joinCharacters } from '../utils/formatUtils';

const SaltosSucesivos = () => {
  const [cadena, setCadena] = useState('T X V W P O D');
  const [saltos, setSaltos] = useState('4 6 8');
  const [direcciones, setDirecciones] = useState('IDI');
  const [usarDirecciones, setUsarDirecciones] = useState(false);
  const [tipoSalto, setTipoSalto] = useState('saltos'); // 'saltos' o 'espacios'
  const [resultado, setResultado] = useState('');

  const handleCadenaChange = (e) => {
    setCadena(standardizeSpacing(e.target.value));
  };

  const handleSaltosChange = (e) => {
    setSaltos(formatNumericKeys(e.target.value));
  };

  const handleDireccionesChange = (e) => {
    setDirecciones(joinCharacters(e.target.value).toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // Ajustar los saltos si el tipo es "espacios"
      const saltosAjustados = tipoSalto === 'espacios'
        ? saltos.split(' ').map(s => parseInt(s) + 1).join(' ')
        : saltos;
        
      if (usarDirecciones) {
        const result = ordenarCadenaConDirecciones(cadena, saltosAjustados, direcciones);
        setResultado(result);
      } else {
        const result = ordenarCadena(cadena, saltosAjustados);
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
          <label htmlFor="cadena">Cadena:</label>
          <input
            id="cadena"
            type="text"
            value={cadena}
            onChange={handleCadenaChange}
            required
          />
          <small>Puede escribir con o sin espacios. Los elementos se formatearán automáticamente.</small>
        </div>
        
        <div className="form-group">
          <div className="saltos-header">
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="tipoSalto"
                  value="saltos"
                  checked={tipoSalto === 'saltos'}
                  onChange={(e) => setTipoSalto(e.target.value)}
                />
                Saltos
              </label>
              <label>
                <input
                  type="radio"
                  name="tipoSalto"
                  value="espacios"
                  checked={tipoSalto === 'espacios'}
                  onChange={(e) => setTipoSalto(e.target.value)}
                />
                Espacios
              </label>
            </div>
          </div>
          <input
            id="saltos"
            type="text"
            value={saltos}
            onChange={handleSaltosChange}
            required
          />

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
              onChange={handleDireccionesChange}
              required={usarDirecciones}
            />
            <small>Los espacios en las direcciones serán ignorados</small>
          </div>
        )}
        
        <button type="submit">Ordenar Cadena</button>
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

export default SaltosSucesivos;
