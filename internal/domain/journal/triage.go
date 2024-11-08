package journal

import (
	"time"

	"github.com/f-eld-ch/sitrep/internal/domain"
)

type Triage struct {
	Division       domain.Division
	triageAt       time.Time
	acknowledgedAt time.Time
}
