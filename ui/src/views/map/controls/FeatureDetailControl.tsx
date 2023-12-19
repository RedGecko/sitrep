import { Feature } from 'geojson';
import 'maplibre-gl/dist/maplibre-gl.css';
import { memo, ReactChild, ReactChildren } from 'react';

interface FeatureDetailControlPanelProps {
    feature: Feature | undefined;
    children: ReactChild | ReactChildren;
}

function FeatureDetailControlPanel(props: FeatureDetailControlPanelProps) {

    const { feature, children } = props;

    if (feature === undefined) {
        return null;
    }

    return (
        <div className="maplibregl-ctrl maplibregl-ctrl-top-right control-panel">
            {children}
        </div>
    );
}

export default memo(FeatureDetailControlPanel);