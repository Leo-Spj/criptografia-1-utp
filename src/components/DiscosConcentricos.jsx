import { useState, useEffect } from 'react';
import { standardizeSpacing, validateCharCount } from '../utils/formatUtils';
import { generarMatrices } from '../utils/discosUtils';

const DiscosConcentricos = () => {
  const [cadena, setCadena] = useState('A Ñ H U N B G M Y P W T D O V X K F C L Z S Q R E J I 1 2 3 4 5 6 7 8 9');
  const [codigo, setCodigo] = useState('2 1 1');
  const [direcciones, setDirecciones] = useState('DID');
  const [cantidad, setCantidad] = useState(6);
  const [matrices, setMatrices] = useState([]);
  
  // Estandarizar formato cuando cambia el input
  useEffect(() => {
    const formattedText = standardizeSpacing(cadena);
    if (formattedText !== cadena) {
      setCadena(formattedText);
    }
  }, [cadena]);

  useEffect(() => {
    const formattedCode = standardizeSpacing(codigo);
    if (formattedCode !== codigo) {
      setCodigo(formattedCode);
    }
  }, [codigo]);

  // Función para manejar cambio en el textarea de cadena
  const handleCadenaChange = (e) => {
    setCadena(e.target.value);
  };

  // Función para manejar cambio en el input de código
  const handleCodigoChange = (e) => {
    setCodigo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que hay exactamente 36 caracteres (sin contar espacios)
    if (!validateCharCount(cadena, 36)) {
      alert('La cadena debe tener exactamente 36 caracteres');
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
          <label htmlFor="cadena">Caracteres (36 caracteres separados por espacios):</label>
          <textarea
            id="cadena"
            value={cadena}
            onChange={handleCadenaChange}
            required
            placeholder="K 6 O 7 F L Q P U S X 2 1 9 H B 5 R I 3 Y 0 E 8 N V Z D 4 M T W A G J C"
            rows="3"
          />
          <small className="helper-text">
            Puedes pegar caracteres juntos o separados, se formatearán automáticamente
          </small>
        </div>
        
        <div className="form-group">
          <label htmlFor="codigo">Códigos (saltos separados por espacios):</label>
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
            onChange={(e) => setDirecciones(e.target.value)}
            required
            placeholder="IDIIDI"
          />
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
      
      <style jsx>{`
        .matriz-container {
          margin-bottom: 20px;
        }
        .matriz {
          border-collapse: collapse;
          margin: 10px 0;
        }
        .matriz td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: center;
          width: 40px;
          height: 40px;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .helper-text {
          display: block;
          color: #666;
          font-size: 0.85rem;
          margin-top: 4px;
        }
        button {
          padding: 8px 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default DiscosConcentricos;
