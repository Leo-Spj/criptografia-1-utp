
/**
 * Reordena grupos de caracteres según el algoritmo de trama
 * @param {String} cadenaPrincipal - Cadena principal a reordenar
 * @param {String} claveDada - Clave dada (números separados por espacios)
 * @param {String} claveOrdenatoria - Clave ordenatoria (números separados por espacios)
 * @returns {String} - Cadena reordenada según el algoritmo
 * @throws {Error} - Error si las claves no tienen la misma longitud o caracteres
 */
export const reordenarGrupos = (cadenaPrincipal, claveDada, claveOrdenatoria) => {
  // Validar que ambas claves tengan la misma longitud y mismos elementos
  const tokensSup = claveDada.split(/\s+/);
  const tokensInf = claveOrdenatoria.split(/\s+/);
  
  if (tokensInf.length !== tokensSup.length || 
      [...tokensInf].sort().join('') !== [...tokensSup].sort().join('')) {
    throw new Error('Las claves no tienen la misma longitud o caracteres');
  }
  
  const numKeys = tokensSup.length;
  const r = cadenaPrincipal.length % numKeys;
  
  if (r !== 0) {
    cadenaPrincipal = cadenaPrincipal.slice(0, -r);
  }
  
  const groupLength = Math.floor(cadenaPrincipal.length / numKeys);
  
  // Dividir la cadena en grupos
  const grupos = [];
  for (let i = 0; i < cadenaPrincipal.length; i += groupLength) {
    grupos.push(cadenaPrincipal.slice(i, i + groupLength));
  }
  
  // Recorrer los dígitos de claveOrdenatoria y buscar su índice en claveDada para reordenar
  const resultado = [];
  
  for (const digito of tokensInf) {
    const idx = tokensSup.indexOf(digito);
    resultado.push(grupos[idx]);
  }
  
  return resultado.join(' ');
};
