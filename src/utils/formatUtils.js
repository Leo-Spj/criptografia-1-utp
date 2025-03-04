/**
 * Estandariza los espacios en una cadena para que cada carácter esté separado por un solo espacio.
 * @param {string} text - El texto a estandarizar
 * @returns {string} - Texto con caracteres separados por un espacio
 */
export const standardizeSpacing = (text) => {
  // Elimina espacios múltiples y caracteres especiales
  const cleanText = text.replace(/\s+/g, ' ').trim();
  
  // Si ya está separado por espacios, simplemente devuelve el texto limpio
  if (cleanText.includes(' ')) {
    return cleanText;
  }
  
  // Si no tiene espacios, separa cada carácter con un espacio
  return cleanText.split('').join(' ');
};

/**
 * Une caracteres eliminando todos los espacios
 * @param {string} text - El texto con espacios
 * @returns {string} - Texto sin espacios
 */
export const joinCharacters = (text) => {
  return text.replace(/\s+/g, '');
};

/**
 * Verifica si una cadena tiene exactamente la cantidad especificada de caracteres (sin contar espacios)
 * @param {string} text - El texto a verificar 
 * @param {number} expectedLength - Longitud esperada
 * @returns {boolean} - True si cumple con la longitud esperada
 */
export const validateCharCount = (text, expectedLength) => {
  const cleanText = joinCharacters(text);
  return cleanText.length === expectedLength;
};
