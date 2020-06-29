import React from 'react';
import './App.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import mapboxgl from "mapbox-gl";
import $ from "jquery";
import SidebarMenu from "./SidebarMenu";
import * as wholeFoodsLocations from './wholeFoods.geojson'

mapboxgl.accessToken = 'pk.eyJ1IjoibWptY2Nvcm1hY2siLCJhIjoiY2s5ZGZmN2U4MDM3aDNnczY5OWFwNW5ybSJ9.0gJdZQtrfbH3M2IuGjY0qg';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -77.0253,
            lat: 38.9772,
            zoom: 12,
            isoProfile: 'walking',
            isoDuration: 10
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mjmccormack/ckbxyew5k0pfd1ilcq6va24vi',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        let getIso = (map) => {
            const urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';
            let lon = this.state.isoLng;
            let lat = this.state.isoLat;
            let profile = this.state.isoProfile;
            let minutes = this.state.isoDuration;
            let query = urlBase + profile + '/' + lon + ',' + lat + '?contours_minutes=' + minutes + '&polygons=true&access_token=' + mapboxgl.accessToken;

            $.ajax({
                method: 'GET',
                url: query
            }).done(function (data) {
                map.getSource('iso').setData(data);
            });
        };

        let mapboxGeocoderControl = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: {
                color: 'orange'
            }
        });
        map.addControl(
            mapboxGeocoderControl
        );

        mapboxGeocoderControl.on('result', (data) => {
            this.setState({
                isoLng: data.result.geometry.coordinates[0],
                isoLat: data.result.geometry.coordinates[1]
            });
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        map.on('load', () => {
            map.addSource('whole-foods-locations', {
                type: 'geojson',
                data: wholeFoodsLocations
            });

            map.addLayer({
                'id': 'whole-foods-locations-points',
                'type': 'circle',
                'source': 'whole-foods-locations',
                'paint': {
                    'circle-radius': 6,
                    'circle-color': 'black'
                },
                'filter': ['==', '$type', 'Point']
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
            map.addSource('iso', {
                type: 'geojson',
                data: {
                    'type': 'FeatureCollection',
                    'features': []
                }
            });
            map.addLayer({
                'id': 'isoLayer',
                'type': 'fill',
                // Use "iso" as the data source for this layer
                'source': 'iso',
                'layout': {},
                'paint': {
                    // The fill color for the layer is set to a light purple
                    'fill-color': '#5a3fc0',
                    'fill-opacity': 0.3
                }
            }, "poi-label");

            let params = document.getElementById('params');
            params.addEventListener('change', (e) => {
                if (e.target.name === 'profile') {
                    this.setState({isoProfile: e.target.value});
                    getIso(map);
                } else if (e.target.name === 'duration') {
                    this.setState({isoDuration: e.target.value});
                    getIso(map);
                }
            });
        });

    }

    render() {
        return (
            <div>
                <SidebarMenu lat={this.state.lat} lng={this.state.lng}/>
                <div ref={el => this.mapContainer = el} className="mapContainer"/>
            </div>
        );
    }
}

export default App;
