package mapping

import (
	"github.com/everystreet/go-geojson/v3"
	"github.com/google/uuid"
)

type Layer struct {
	id       uuid.UUID
	name     string
	features []geojson.Feature[geojson.Geometry]
}

func (l *Layer) ID() string {
	return l.id.String()
}

func (l *Layer) Name() string {
	return l.name
}

func (l *Layer) Features() []geojson.Feature[geojson.Geometry] {
	return l.features
}

func (l *Layer) AddFeature(f []geojson.Feature[geojson.Geometry]) {
	l.features = append(l.features, f...)
}

func (l *Layer) Rename(name string) {
	l.name = name
}
