import sys
def repeticao(numero,qtdVezes):
	resultado = numero
	for x in range(qtdVezes):
		resultado += numero
	return resultado
if __name__ == "__main__":
	numero = int(sys.argv[1])
	qtdVezes = int(sys.argv[2])
	result = int(sys.argv[3])
	print(repeticao(numero,qtdVezes) == result)