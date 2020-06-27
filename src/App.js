import React from 'react';
import './App.css';
import mapboxgl from 'mapbox-gl'
mapboxgl.accessToken = 'pk.eyJ1IjoibWptY2Nvcm1hY2siLCJhIjoiY2s5ZGZmN2U4MDM3aDNnczY5OWFwNW5ybSJ9.0gJdZQtrfbH3M2IuGjY0qg';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 5,
            lat: 34,
            zoom: 2
        };
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });
    }

    render() {
        return (
            <div>
                <div ref={el => this.mapContainer = el} className="mapContainer" />
            </div>
        );
    }
}

export default App;
