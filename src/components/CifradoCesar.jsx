import { useState } from 'react';

const CifradoCesar = () => {
  const [texto, setTexto] = useState('');
  const [clave, setClave] = useState(3);
  const [modo, setModo] = useState('c');
  const [resultado, setResultado] = useState('');

  // Símbolos que pueden cifrarse
  const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const procesarCifrado = () => {
    let salida = '';
    
    // Ejecuta el proceso letra a letra
    for (const simbolo of texto.toUpperCase()) {
      if (ALFABETO.includes(simbolo)) {
        // Identifica la posición de cada símbolo
        const pos = ALFABETO.indexOf(simbolo);
        
        // Ejecuta la operación de cifrado/descifrado
        let newPos;
        if (modo === 'c') {
          newPos = (pos + Number(clave)) % 26;
        } else {
          newPos = (pos - Number(clave) + 26) % 26;
        }
        
        // Añade el nuevo símbolo a la cadena
        salida += ALFABETO[newPos];
      } else {
        // Añade el símbolo sin cifrar/descifrar si no está en el ALFABETO
        salida += simbolo;
      }
    }
    
    return salida;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const result = procesarCifrado();
      setResultado(result);
    } catch (error) {
      setResultado(`Error: ${error.message}`);
    }
  };

  return (
    <div className="component-container">
      <h2>Cifrado César</h2>
      <p>El cifrado César consiste en desplazar cada letra un determinado número de posiciones en el alfabeto.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="modo">¿Deseas cifrar o descifrar?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="modo"
                value="c"
                checked={modo === 'c'}
                onChange={(e) => setModo(e.target.value)}
              />
              Cifrar
            </label>
            <label>
              <input
                type="radio"
                name="modo"
                value="d"
                checked={modo === 'd'}
                onChange={(e) => setModo(e.target.value)}
              />
              Descifrar
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="texto">Introduce el texto:</label>
          <input
            id="texto"
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="clave">Y la clave (1-25):</label>
          <input
            id="clave"
            type="number"
            min="1"
            max="25"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">{modo === 'c' ? 'Cifrar' : 'Descifrar'}</button>
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

export default CifradoCesar;
