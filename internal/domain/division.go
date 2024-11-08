package domain

import "github.com/google/uuid"

type Division struct {
	id        uuid.UUID
	name      string
	shortName string
}

func (d *Division) ID() string {
	return d.id.String()
}

func (d *Division) Name() string {
	return d.name
}

func (d *Division) ShortName() string {
	return d.shortName
}
