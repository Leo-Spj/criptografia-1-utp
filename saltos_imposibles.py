def encrypt_alphabet(alphabet, jumps):

    # Convertimos la cadena en una lista de caracteres
    chars = alphabet.split()
    n = len(chars)
    new_alphabet = [None] * n  # Arreglo para el resultado
    index = -1  # Empezamos en -1 para facilitar el avance cíclico

    # Para cada letra del abecedario original...
    for i, char in enumerate(chars):
        # Se determina el salto actual; se suma 1 para cumplir con la regla:
        # "salta k espacios y coloca el carácter en el siguiente"
        steps = jumps[i % len(jumps)] + 1

        # Avanzamos de forma cíclica solo por posiciones libres
        while steps > 0:
            index = (index + 1) % n
            if new_alphabet[index] is None:
                steps -= 1

        # Colocamos el carácter en la posición encontrada
        new_alphabet[index] = char

    # Se retorna el resultado como una cadena, con cada carácter separado por un espacio
    return " ".join(new_alphabet)


# --- Ejemplo de uso ---
alphabet = input("Ingrese el abecedario (caracteres separados por espacios): ")
jumps_str = input("Ingrese los saltos separados por espacios: ")
jumps = list(map(int, jumps_str.split()))

resultado = encrypt_alphabet(alphabet, jumps)
print("Resultado encriptado:")
print(resultado)
