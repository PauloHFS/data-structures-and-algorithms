package golang

import (
	"strconv"
)

// implementation
// First digit:
// 1- multiply the digits i0-i8 by 10 to 2
// 2- multiply the result by 10
// 3- get the mod by 11
// 4- the mob must be equals the first digit
// Second digit:
// 1- multiply the digits i0-i9 by 11 to 2
// 2- multiply the result by 10
// 3- get the mod by 11
// 4- the mob must be equals the second digit
func validate(cpf string) bool {
	count := 0

	for i, digit := range cpf { // interate only over the 9 first digits
		if i >= 9 {
			continue
		}
		num, _ := strconv.Atoi(string(digit))
		count += ((10 - i) * num)
	}

	count *= 10
	count %= 11

	if count == 10 {
		count = 0
	}

	first_digit, _ := strconv.Atoi(string(cpf[9]))
	if count != first_digit {
		return false
	}

	count = 0

	for i, digit := range cpf { // interate only over the 10 first digits
		if i > 9 {
			continue
		}
		num, _ := strconv.Atoi(string(digit))
		count += (11 - i) * num
	}

	count *= 10
	count %= 11

	if count == 10 {
		count = 0
	}

	second_digit, _ := strconv.Atoi(string(cpf[10]))
	return count == second_digit
}
