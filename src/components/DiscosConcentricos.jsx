import { useState } from 'react';
import { standardizeSpacing, joinCharacters, formatNumericKeys } from '../utils/formatUtils';
import { generarMatrices } from '../utils/discosUtils';

const DiscosConcentricos = () => {
  const [cadena, setCadena] = useState('A Ñ H U N B G M Y P W T D O V X K F C L Z S Q R E J I 1 2 3 4 5 6 7 8 9');
  const [codigo, setCodigo] = useState('2 1 1');
  const [direcciones, setDirecciones] = useState('DID');
  const [cantidad, setCantidad] = useState(6);
  const [matrices, setMatrices] = useState([]);
  
  // Función para manejar cambio en el textarea de cadena
  const handleCadenaChange = (e) => {
    setCadena(standardizeSpacing(e.target.value));
  };

  // Función para manejar cambio en el input de código
  const handleCodigoChange = (e) => {
    setCodigo(formatNumericKeys(e.target.value));
  };

  // Función para manejar cambio en el input de direcciones
  const handleDireccionesChange = (e) => {
    setDirecciones(joinCharacters(e.target.value).toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que hay exactamente 36 caracteres (sin contar espacios)
    const cadenaLimpia = joinCharacters(cadena);
    if (cadenaLimpia.length !== 36) {
      alert(`La cadena debe tener exactamente 36 caracteres. Actualmente tiene ${cadenaLimpia.length}`);
      return;
    }
    
    // Utilizar la función importada para generar matrices
    const matricesGeneradas = generarMatrices(cadena, codigo, direcciones, cantidad);
    setMatrices(matricesGeneradas);
  };

  return (
    <div className="component-container">
      <h2>Discos Concéntricos</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cadena">Caracteres (36 caracteres con o sin espacios):</label>
          <textarea
            id="cadena"
            value={cadena}
            onChange={handleCadenaChange}
            required
            placeholder="K 6 O 7 F L Q P U S X 2 1 9 H B 5 R I 3 Y 0 E 8 N V Z D 4 M T W A G J C"
            rows="3"
          />
          <small className="helper-text">
            Puedes pegar caracteres juntos o separados. Los espacios serán ajustados automáticamente.
          </small>
        </div>
        
        <div className="form-group">
          <label htmlFor="codigo">Códigos (se formatearán automáticamente):</label>
          <input
            id="codigo"
            type="text"
            value={codigo}
            onChange={handleCodigoChange}
            required
            placeholder="4 7 3 5 1 4 7 3 5"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="direcciones">Direcciones (secuencia I=izquierda, D=derecha):</label>
          <input
            id="direcciones"
            type="text"
            value={direcciones}
            onChange={handleDireccionesChange}
            required
            placeholder="IDIIDI"
          />
          <small className="helper-text">Los espacios serán eliminados automáticamente</small>
        </div>
        
        <div className="form-group">
          <label htmlFor="cantidad">Cantidad de matrices a generar:</label>
          <input
            id="cantidad"
            type="number"
            min="1"
            max="20"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Generar Matrices</button>
      </form>
      
      {matrices.length > 0 && (
        <div className="result-container">
          <h3>Matrices Generadas:</h3>
          {matrices.map((item, index) => (
            <div key={index} className="matriz-container">
              <h4>{item.titulo}</h4>
              <table className="matriz">
                <tbody>
                  {item.matriz.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
      
    </div>
  );
};

export default DiscosConcentricos;
