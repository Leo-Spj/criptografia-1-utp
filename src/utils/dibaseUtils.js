/**
 * Crea una matriz 6x6 a partir de una cadena de 36 caracteres
 * @param {String} cadena36 - Cadena de 36 caracteres para llenar la matriz
 * @returns {Array} - Matriz 6x6
 * @throws {Error} - Error si la cadena no tiene exactamente 36 caracteres
 */
export const crearMatriz6x6 = (cadena36) => {
  // Normalizar la cadena eliminando espacios
  cadena36 = cadena36.replace(/\s+/g, '');
  
  if (cadena36.length !== 36) {
    throw new Error("La cadena debe tener exactamente 36 caracteres.");
  }
  
  const matriz = [];
  let indice = 0;
  
  for (let i = 0; i < 6; i++) {
    const fila = [];
    for (let j = 0; j < 6; j++) {
      fila.push(cadena36[indice++]);
    }
    matriz.push(fila);
  }
  return matriz;
};

/**
 * Construye un diccionario de posiciones a partir de una matriz y una clave
 * @param {Array} matriz - Matriz 6x6
 * @param {String} clave - Clave de 6 caracteres
 * @returns {Object} - Diccionario que mapea caracteres a sus coordenadas
 * @throws {Error} - Error si la clave no tiene exactamente 6 caracteres
 */
export const construirDiccionarioPosiciones = (matriz, clave) => {
  // Normalizar la clave eliminando espacios
  clave = clave.replace(/\s+/g, '');
  
  if (clave.length !== 6) {
    throw new Error("La clave debe tener exactamente 6 caracteres.");
  }
  
  const posiciones = {};
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const caracter = matriz[i][j];
      posiciones[caracter] = [clave[i], clave[j]];
    }
  }
  return posiciones;
};

/**
 * Encripta un texto utilizando un diccionario de posiciones
 * @param {String} texto - Texto a encriptar
 * @param {Object} posiciones - Diccionario de posiciones
 * @returns {Object} - Objeto con los diferentes formatos del resultado encriptado
 */
export const encriptarTexto = (texto, posiciones) => {
  // Normalizar el texto eliminando espacios
  texto = texto.replace(/\s+/g, '');
  
  const coordsX = [];
  const coordsY = [];
  
  for (let ch of texto) {
    const chMayus = ch.toUpperCase();
    if (posiciones[chMayus]) {
      const [y, x] = posiciones[chMayus];
      coordsX.push(x);
      coordsY.push(y);
    } else {
      coordsX.push('?');
      coordsY.push('?');
    }
  }
  
  // Resultado: coordenadas X e Y separadas
  const resultX = coordsX.join(' ');
  const resultY = coordsY.join(' ');
  
  // Secuencia unificada
  const cadenaUnificada = coordsX.join('') + coordsY.join('');
  
  // Pares para buscar
  const paresNuevos = [];
  for (let i = 0; i < cadenaUnificada.length; i += 2) {
    if (i + 1 < cadenaUnificada.length) {
      paresNuevos.push(cadenaUnificada.slice(i, i + 2));
    } else {
      paresNuevos.push(cadenaUnificada[i]);
    }
  }
  
  return {
    coordsX: resultX,
    coordsY: resultY,
    secuenciaUnificada: cadenaUnificada,
    paresNuevos: paresNuevos.join(' ')
  };
};

/**
 * Busca un carácter en una matriz según coordenadas
 * @param {String} x - Coordenada X
 * @param {String} y - Coordenada Y
 * @param {Array} matriz - Matriz 6x6
 * @param {String} clave - Clave de 6 caracteres
 * @returns {String} - Carácter encontrado en la posición o "?" si no se encuentra
 */
export const buscarEnMatriz = (x, y, matriz, clave) => {
  try {
    const indiceX = clave.indexOf(x);
    const indiceY = clave.indexOf(y);
    return matriz[indiceY][indiceX];
  } catch (error) {
    return "?";
  }
};

/**
 * Desencripta pares de coordenadas
 * @param {String} paresNuevos - Pares de coordenadas separados por espacios
 * @param {Array} matriz - Matriz 6x6
 * @param {String} clave - Clave de 6 caracteres
 * @returns {Array} - Array de objetos con pares y sus valores correspondientes
 */
export const desencriptarPares = (paresNuevos, matriz, clave) => {
  const resultado = [];
  const pares = paresNuevos.split(' ');
  
  for (const par of pares) {
    if (par.length === 2) {
      const x = par[0];
      const y = par[1];
      const valor = buscarEnMatriz(x, y, matriz, clave);
      resultado.push({ par: `(${x},${y})`, valor });
    }
  }
  
  return resultado;
};

/**
 * Procesa un texto usando el algoritmo Dibase
 * @param {String} cadena36 - Cadena de 36 caracteres
 * @param {String} clave - Clave de 6 caracteres
 * @param {String} texto - Texto a encriptar
 * @returns {Object} - Resultado completo del proceso
 * @throws {Error} - Error si los parámetros no son válidos
 */
export const procesarDibase = (cadena36, clave, texto) => {
  if (cadena36.length !== 36) {
    throw new Error("La cadena debe tener exactamente 36 caracteres.");
  }
  
  if (clave.length !== 6) {
    throw new Error("La clave debe tener exactamente 6 caracteres.");
  }
  
  const matriz = crearMatriz6x6(cadena36);
  const posiciones = construirDiccionarioPosiciones(matriz, clave);
  const resultadoEncriptado = encriptarTexto(texto, posiciones);
  const paresDesencriptados = desencriptarPares(resultadoEncriptado.paresNuevos, matriz, clave);
  
  return {
    matriz,
    clave,
    resultadoEncriptado,
    paresDesencriptados
  };
};
