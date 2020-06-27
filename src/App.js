import React from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from 'mapbox-gl-geocoder'
import IsochroneMenu from './IsochroneMenu';

mapboxgl.accessToken = 'pk.eyJ1IjoibWptY2Nvcm1hY2siLCJhIjoiY2s5ZGZmN2U4MDM3aDNnczY5OWFwNW5ybSJ9.0gJdZQtrfbH3M2IuGjY0qg';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -77.0253,
            lat: 38.9772,
            zoom: 12
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mjmccormack/ckbxyew5k0pfd1ilcq6va24vi',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        map.on('load', function () {
            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            // feature for Mapbox DC
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [
                                    -77.03238901390978,
                                    38.913188059745586
                                ]
                            },
                            'properties': {
                                'title': 'Mapbox DC',
                                'icon': 'monument'
                            }
                        },
                        {
                            // feature for Mapbox SF
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-122.414, 37.776]
                            },
                            'properties': {
                                'title': 'Mapbox SF',
                                'icon': 'harbor'
                            }
                        }
                    ]
                }
            });
            map.addLayer({
                'id': 'points',
                'type': 'symbol',
                'source': 'points',
                'layout': { // get the icon name from the source's "icon" property
                    'icon-image': ['concat', ['get', 'icon'], '-15'], // concatenate the name to get an icon from the style's sprite sheet
                    'text-field': ['get', 'title'], // get the title name from the source's "title" property
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-offset': [0, 0.6],
                    'text-anchor': 'top'
                }
            });
        });
    }

    render() {
        return (
            <div>
                <div className='sidebarStyle'>
                    <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
                </div>
                <IsochroneMenu/>
                <div ref={el => this.mapContainer = el} className="mapContainer"/>
            </div>
        );
    }
}

export default App;
