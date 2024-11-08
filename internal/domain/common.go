package domain

import "github.com/google/uuid"

func GenerateUUID() uuid.UUID {
	id, err := uuid.NewV7()
	if err != nil {
		id, _ = uuid.NewV6()
	}
	return id
}
