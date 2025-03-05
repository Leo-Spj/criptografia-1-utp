import { useState } from 'react';

const AbecedarioExcel = () => {
  const [cadena, setCadena] = useState('');
  const [invertir, setInvertir] = useState(false);
  const [resultado, setResultado] = useState([]);

  const procesarCadena = () => {
    // Quitar espacios
    let procesada = cadena.replace(/\s+/g, '');
    
    // Invertir si es necesario
    if (invertir) {
      procesada = procesada.split('').reverse().join('');
    }
    
    // Devolver un array de caracteres
    return procesada.split('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const caracteres = procesarCadena();
      setResultado(caracteres);
    } catch (error) {
      setResultado([`Error: ${error.message}`]);
    }
  };

  return (
    <div className="component-container">
      <h2>Visualizador de Cadena de Texto</h2>
      <p>Convierte una cadena de texto a una tabla horizontal de caracteres.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cadena">Introduce una cadena de texto:</label>
          <textarea
            id="cadena"
            value={cadena}
            onChange={(e) => setCadena(e.target.value)}
            required
            rows="3"
          ></textarea>
        </div>
        
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={invertir}
              onChange={(e) => setInvertir(e.target.checked)}
            />
            Invertir cadena
          </label>
        </div>
        
        <button type="submit">Mostrar en Tabla</button>
      </form>
      
      {resultado.length > 0 && (
        <div className="result-container">
          <h3>Resultado:</h3>
          <div className="tabla-caracteres">
            <table>
              <tbody>
                <tr>
                  {resultado.map((caracter, index) => (
                    <td key={index}>{caracter}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbecedarioExcel;
