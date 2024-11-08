package incident

import (
	"errors"
	"maps"
	"slices"
	"time"

	"github.com/f-eld-ch/sitrep/internal/domain"
	"github.com/f-eld-ch/sitrep/internal/domain/journal"
	"github.com/f-eld-ch/sitrep/internal/domain/mapping"
	"github.com/google/uuid"
)

// Incident is the incident domain object
type Incident struct {
	id       uuid.UUID
	name     string
	location Location
	status   Status

	divisions map[string]domain.Division
	journals  map[string]journal.Journal
	layers    map[string]mapping.Layer

	openedAt time.Time
	closedAt time.Time
}

func New(name string, location Location) (*Incident, error) {
	return &Incident{
		id:       domain.GenerateUUID(),
		name:     name,
		location: location,
		status:   StatusUnknown,
	}, nil
}

func (i *Incident) OpenIncident(at time.Time) {
	var zeroTime time.Time
	i.closedAt = zeroTime

	// Don't allow time in future
	if at.After(time.Now()) {
		at = time.Now()
	}

	i.status = StatusOpen
	if i.openedAt.IsZero() {
		i.openedAt = at
	}
}

func (i *Incident) Close(at time.Time) error {
	if !i.closedAt.IsZero() || i.status == StatusClosed {
		return errors.New("incident is already closed")
	}

	i.closedAt = at
	i.status = StatusClosed

	return nil
}

func (i *Incident) SetLocation(l Location) {
	i.location = l
}

func (i *Incident) Name() string {
	return i.name
}

func (i *Incident) Location() Location {
	return i.location
}

func (i *Incident) Status() Status {
	return i.status
}

func (i *Incident) OpenedAt() time.Time {
	return i.openedAt
}

func (i *Incident) ClosedAt() time.Time {
	return i.closedAt
}

func (i *Incident) Journals() []journal.Journal {
	return slices.Collect(maps.Values(i.journals))
}

func (i *Incident) Divisions() []domain.Division {
	return slices.Collect(maps.Values(i.divisions))
}

func (i *Incident) MapLayers() []mapping.Layer {
	return slices.Collect(maps.Values(i.layers))
}

func (i *Incident) AddDivision(d domain.Division) {
	i.divisions[d.ID()] = d
}

func (i *Incident) AddJournal(j journal.Journal) {
	i.journals[j.ID()] = j
}

func (i *Incident) AddLayers(l mapping.Layer) {
	i.layers[l.ID()] = l
}
