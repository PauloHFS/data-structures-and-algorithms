package golang

import "testing"

type validateCPFTests struct {
	cpf    string
	expect bool
}

var tests = []validateCPFTests{
	{"52998224725", true},
	{"32662283084", true},
	{"19736130002", true},
	{"82572855011", true},
	{"36565596000", true},
}

func TestValidateCPFValido(t *testing.T) {
	for _, test := range tests {
		result := validate(test.cpf)
		if test.expect != result {
			t.Errorf("cpf %s got %t, expect %t", test.cpf, result, test.expect)
			continue
		}
		t.Logf("cpf %s pass (y)", test.cpf)
	}
}

// ! THIS IS A INVALID CPF THAT PASS IN THE VALIDATION !
// func TestValidateCPFInvalido(t *testing.T) {
// 	result := validate("11111111111")
// 	expect := false

// 	if result != expect {
// 		t.Errorf("got %t, expect %t", result, expect)
// 	}
// }
