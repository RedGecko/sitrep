package incident

import "fmt"

type Location struct {
	Name        string
	Coordinates *Coordinates
}

func (l Location) String() string {

	if l.Coordinates != nil {
		return fmt.Sprintf("%s (%f / %f)", l.Name, l.Coordinates.lat, l.Coordinates.long)
	}
	return fmt.Sprintf("%s", l.Name)
}

type Coordinates struct {
	lat  float64
	long float64
}
