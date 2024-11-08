package journal

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

type Journal struct {
	id       uuid.UUID
	name     string
	status   Status
	openedAt time.Time
	closedAt time.Time

	messages []*Message
}

func NewJournal(name string) (*Journal, error) {
	id, err := uuid.NewV7()
	if err != nil {
		return nil, errors.Join(errors.New("cannot create journal, failed go generate uuid"), err)
	}

	j := &Journal{
		id:       id,
		name:     name,
		status:   StatusOpen,
		openedAt: time.Now(),
	}

	return j, nil
}

func (j *Journal) ID() string {
	return j.id.String()
}

func (j *Journal) Status() Status {
	return j.status
}

func (j *Journal) Messages() (m []Message) {
	for _, message := range j.messages {
		m = append(m, *message)
	}

	return m
}

// Status is the incident status
type Status int

const (
	StatusOpen Status = iota
	StatusClosed
)

func (s Status) String() string {
	return [...]string{"Open", "Closed"}[s]
}
