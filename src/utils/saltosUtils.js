/**
 * Ordena una cadena usando el algoritmo de saltos sucesivos sin direcciones
 * @param {String} cadena - Cadena con elementos separados por espacios
 * @param {String} saltos - Saltos separados por espacios
 * @returns {String} - Cadena ordenada según el algoritmo
 */
export const ordenarCadena = (cadena, saltos) => {
  // Convertir cadena y saltos a listas
  const elementos = cadena.replace(/\s+/g, '').split('');
  const saltosList = saltos.split(/\s+/).map(Number);
  const ordenados = [];
  let pointer = 0;
  let first = true;
  let saltoIdx = 0;
  
  while (elementos.length > 0) {
    const s = saltosList[saltoIdx % saltosList.length];
    
    if (first) {
      pointer = (pointer + s) % elementos.length;
      first = false;
    } else {
      pointer = (pointer + s - 1) % elementos.length;
    }
    
    ordenados.push(elementos.splice(pointer, 1)[0]);
    saltoIdx++;
  }
  
  return ordenados.join(' ');
};

/**
 * Ordena una cadena usando el algoritmo de saltos sucesivos con direcciones
 * @param {String} cadena - Cadena con elementos separados por espacios
 * @param {String} saltos - Saltos separados por espacios
 * @param {String} direcciones - Cadena con direcciones (I o D)
 * @returns {String} - Cadena ordenada según el algoritmo
 * @throws {Error} - Error si la dirección no es válida
 */
export const ordenarCadenaConDirecciones = (cadena, saltos, direcciones) => {
  // Convertir cadena y saltos a listas, y direcciones a lista de caracteres
  const elementos = cadena.replace(/\s+/g, '').split('');
  const saltosList = saltos.split(/\s+/).map(Number);
  const direccionesList = direcciones.replace(/\s+/g, '').split('');
  const ordenados = [];
  let pointer = 0;
  let first = true;
  let idx = 0;
  
  while (elementos.length > 0) {
    const s = saltosList[idx % saltosList.length];
    const d = direccionesList[idx % direccionesList.length].toUpperCase();
    
    if (first) {
      if (d === 'D') {
        pointer = (pointer + s) % elementos.length;
      } else if (d === 'I') {
        pointer = (pointer - s + elementos.length) % elementos.length;
      } else {
        throw new Error('Dirección no válida: use I o D');
      }
      first = false;
    } else {
      if (d === 'D') {
        pointer = (pointer + s - 1) % elementos.length;
      } else if (d === 'I') {
        pointer = (pointer - s + elementos.length) % elementos.length;
      } else {
        throw new Error('Dirección no válida: use I o D');
      }
    }
    
    ordenados.push(elementos.splice(pointer, 1)[0]);
    idx++;
  }
  
  return ordenados.join(' ');
};
