/**
 * Reordena una cadena utilizando el algoritmo de transposición
 * @param {String} cadenaPrincipal - Cadena principal a reordenar
 * @param {String} claveSuperior - Clave superior (números separados por espacios)
 * @param {String} claveInferior - Clave inferior (números separados por espacios)
 * @returns {String} - Cadena reordenada según el algoritmo
 * @throws {Error} - Error si las claves no tienen la misma longitud o caracteres
 */
export const reordenar = (cadenaPrincipal, claveSuperior, claveInferior) => {
  // Normalizar la cadena principal eliminando espacios
  cadenaPrincipal = cadenaPrincipal.replace(/\s+/g, '');
  
  // Validar que las claves tengan la misma longitud y mismos caracteres
  const tokensInf = claveSuperior.split(/\s+/);
  const tokensSup = claveInferior.split(/\s+/);
  
  if (tokensInf.length !== tokensSup.length || 
      [...tokensInf].sort().join('') !== [...tokensSup].sort().join('')) {
    throw new Error('Las claves no tienen la misma longitud o caracteres');
  }
  
  const blockSize = tokensInf.length;
  
  // Quitar los últimos caracteres según el módulo
  const r = cadenaPrincipal.length % blockSize;
  if (r !== 0) {
    cadenaPrincipal = cadenaPrincipal.slice(0, -r);
  }
  
  const resultado = [];
  
  for (let i = 0; i < cadenaPrincipal.length; i += blockSize) {
    const bloque = cadenaPrincipal.slice(i, i + blockSize).split('');
    const nuevoBloque = [];
    
    for (const digito of tokensSup) {
      const indice = tokensInf.indexOf(digito);
      nuevoBloque.push(bloque[indice]);
    }
    
    resultado.push(nuevoBloque.join(''));
  }
  
  return resultado.join('');
};
