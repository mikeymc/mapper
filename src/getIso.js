import mapboxgl from 'mapbox-gl'

function getIso() {
    const urlBase = 'https://api.mapbox.com/isochrone/v1/mapbox/';
    const lon = -77.034;
    const lat = 38.899;
    const profile = 'cycling';
    const minutes = 10;
    let query = urlBase + profile + '/' + lon + ',' + lat + '?contours_minutes=' + minutes + '&polygons=true&access_token=' + mapboxgl.accessToken;

    $.ajax({
        method: 'GET',
        url: query
    }).done(function (data) {
        console.log(data);
    })
};

export default getIso;