import { useState } from 'react';

const AbecedarioExcel = () => {
  const [cadena, setCadena] = useState('');
  const [invertir, setInvertir] = useState(false);
  const [resultado, setResultado] = useState('');

  const procesarCadena = () => {
    // Quitar espacios
    let procesada = cadena.replace(/\s+/g, '');
    
    // Invertir si es necesario
    if (invertir) {
      procesada = procesada.split('').reverse().join('');
    }
    
    // Convertir a formato CSV
    return procesada.split('').join(',');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      const csvContent = procesarCadena();
      setResultado(csvContent);
      
      // Crear un enlace para descargar el archivo CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'archivo.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setResultado(`Error: ${error.message}`);
    }
  };

  return (
    <div className="component-container">
      <h2>Abecedario para Excel</h2>
      <p>Convierte una cadena de texto a formato CSV para Excel.</p>
      
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
        
        <button type="submit">Generar CSV</button>
      </form>
      
      {resultado && (
        <div className="result-container">
          <h3>Resultado (en formato CSV):</h3>
          <div className="result csv-result">{resultado}</div>
          <p>El archivo se ha descargado automáticamente</p>
        </div>
      )}
    </div>
  );
};

export default AbecedarioExcel;
