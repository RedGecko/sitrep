package incident

// Status is the incident status
type Status int

const (
	StatusUnknown Status = iota
	StatusOpen
	StatusClosed
)

func (s Status) String() string {
	return [...]string{"Unknown", "Open", "Closed"}[s]
}
