package journal

import "time"

type Message struct {
	sender   string
	receiver string
	content  string
	medium   string
	sendAt   time.Time

	triage []Triage
}
