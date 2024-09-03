# [0, 3] = [8, 4, 2, 1]
# [4, 9] = [32, 16, 8, 4, 2, 1]
bits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


def bitToDec(bits):
    h = 0
    for i in range(0, 4):
        if bits[i] == 1:
            h += 2**(3 - i)

    m = 0
    for i in range(4, 9):
        if bits[i] == 1:
            m += 2**(8-i)

    return f'{h}:{m}' if m > 9 else f'{h}:0{m}'


def validateHours(bits, k):
    c = 0
    for n in bits:
        if n == 1:
            c += 1

    return c == k


def binary_timer(bits, k, i):
    if validateHours(bits, k):
        print(bits)
        return
    else:
        for j in range(i, len(bits)):
            bits[j] = 1
            binary_timer(bits, k, j+1)
            bits[j] = 0


binary_timer([0, 0, 0, 0], 2, 0)

# 8:09
print(bitToDec(
    [1, 0, 0, 0, 0, 1, 0, 0, 1]
))

# 8:18
print(bitToDec(
    [1, 0, 0, 0, 0, 1, 1, 1, 1]
))

# 8:27
print(bitToDec(
    [1, 0, 0, 0, 1, 1, 0, 1, 1]
))
