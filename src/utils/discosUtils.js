
/**
 * Gira los discos concéntricos de una matriz según patrones especificados
 * @param {Array} matriz - Matriz cuadrada de caracteres
 * @param {Number} salto1 - Salto para el primer disco (exterior)
 * @param {Number} salto2 - Salto para el segundo disco (medio)
 * @param {Number} salto3 - Salto para el tercer disco (interior)
 * @param {String} direccion1 - Dirección de giro para el primer disco ('I' o 'D')
 * @param {String} direccion2 - Dirección de giro para el segundo disco ('I' o 'D')
 * @param {String} direccion3 - Dirección de giro para el tercer disco ('I' o 'D')
 * @returns {Array} - La matriz modificada después de girar los discos
 */
export const girarDiscos = (matriz, salto1, salto2, salto3, direccion1, direccion2, direccion3) => {
  const N = matriz.length;
  const discos = [
    { idx: 1, salto: salto1 + 1, direccion: direccion1 },
    { idx: 2, salto: salto2 + 1, direccion: direccion2 },
    { idx: 3, salto: salto3 + 1, direccion: direccion3 }
  ];
  
  for (const { idx, salto, direccion } of discos) {
    const top = idx - 1;
    const left = idx - 1;
    const bottom = N - idx;
    const right = N - idx;
    
    // Extraer los elementos del anillo en orden:
    const ring = [];
    // Fila superior (izquierda a derecha)
    for (let j = left; j <= right; j++) {
      ring.push(matriz[top][j]);
    }
    
    // Columna derecha (de arriba hacia abajo, sin repetir la esquina superior)
    for (let i = top + 1; i < bottom; i++) {
      ring.push(matriz[i][right]);
    }
    
    // Fila inferior (derecha a izquierda) si hay más de una fila en el disco
    if (bottom !== top) {
      for (let j = right; j >= left; j--) {
        ring.push(matriz[bottom][j]);
      }
    }
    
    // Columna izquierda (de abajo hacia arriba, sin repetir esquinas)
    for (let i = bottom - 1; i > top; i--) {
      ring.push(matriz[i][left]);
    }
    
    // Calcular el desplazamiento efectivo
    const largo = ring.length;
    const offset = salto % largo;
    
    // Rotar el anillo según la dirección:
    let rotated;
    if (direccion.toUpperCase() === 'I') {  // izquierda
      rotated = [...ring.slice(offset), ...ring.slice(0, offset)];
    } else if (direccion.toUpperCase() === 'D') {  // derecha
      rotated = [...ring.slice(-offset), ...ring.slice(0, -offset)];
    } else {
      rotated = [...ring];  // si la dirección no es válida, no se rota
    }
    
    // Volver a colocar los elementos rotados en la matriz:
    let k = 0;
    // Fila superior
    for (let j = left; j <= right; j++) {
      matriz[top][j] = rotated[k++];
    }
    
    // Columna derecha
    for (let i = top + 1; i < bottom; i++) {
      matriz[i][right] = rotated[k++];
    }
    
    // Fila inferior
    if (bottom !== top) {
      for (let j = right; j >= left; j--) {
        matriz[bottom][j] = rotated[k++];
      }
    }
    
    // Columna izquierda
    for (let i = bottom - 1; i > top; i--) {
      matriz[i][left] = rotated[k++];
    }
  }
  
  return matriz;
};

/**
 * Crea una matriz a partir de una cadena de caracteres
 * @param {String} cadena - Cadena de caracteres separados por espacios
 * @param {Number} tamano - Tamaño de la matriz cuadrada (ancho/alto)
 * @returns {Array} - Matriz cuadrada con los caracteres
 */
export const crearMatrizDesdeString = (cadena, tamano) => {
  const matriz = Array(tamano).fill().map(() => Array(tamano).fill(''));
  const caracteresArray = cadena.split(/\s+/);
  
  let index = 0;
  for (let i = 0; i < tamano; i++) {
    for (let j = 0; j < tamano; j++) {
      matriz[i][j] = caracteresArray[index++] || '';
    }
  }
  
  return matriz;
};

/**
 * Genera matrices resultantes después de aplicar rotaciones a discos concéntricos
 * @param {String} cadena - Cadena de caracteres inicial
 * @param {String} codigo - Código de saltos separados por espacios
 * @param {String} direcciones - Cadena con direcciones (I/D)
 * @param {Number} cantidad - Cantidad de matrices a generar
 * @returns {Array} - Lista de objetos con título y matriz
 */
export const generarMatrices = (cadena, codigo, direcciones, cantidad) => {
  // Crear matriz original
  const matriz = crearMatrizDesdeString(cadena, 6);
  
  const matricesGeneradas = [];
  
  // Matriz original
  matricesGeneradas.push({
    titulo: 'Matriz original',
    matriz: matriz.map(row => [...row])
  });
  
  // Dividir los códigos y direcciones
  const codigosArray = codigo.split(/\s+/).map(Number);
  const direccionesArray = direcciones.split('');
  
  // Generar las matrices según la cantidad especificada
  const copiaMatriz = matriz.map(row => [...row]);
  const cantidadMatrices = parseInt(cantidad, 10);
  
  for (let i = 0; i < cantidadMatrices; i++) {
    // Extraer saltos y direcciones cíclicamente para cada disco
    const salto1 = codigosArray[(i * 3) % codigosArray.length];
    const salto2 = codigosArray[(i * 3 + 1) % codigosArray.length];
    const salto3 = codigosArray[(i * 3 + 2) % codigosArray.length];
    const direccion1 = direccionesArray[(i * 3) % direccionesArray.length];
    const direccion2 = direccionesArray[(i * 3 + 1) % direccionesArray.length];
    const direccion3 = direccionesArray[(i * 3 + 2) % direccionesArray.length];
    
    // Girar los discos
    girarDiscos(copiaMatriz, salto1, salto2, salto3, direccion1, direccion2, direccion3);
    
    // Guardar la matriz resultante
    matricesGeneradas.push({
      titulo: `Matriz después de girar los discos - Código: ${salto1}${salto2}${salto3} ${direccion1}${direccion2}${direccion3}`,
      matriz: copiaMatriz.map(row => [...row])
    });
  }
  
  return matricesGeneradas;
};
