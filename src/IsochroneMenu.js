import React from 'react';
import './IsochroneMenu.css'
import mapboxgl from "mapbox-gl";
import $ from "jquery";

function IsochroneMenu() {
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
    });

    return (
        <div className='isochrone-menu'>
            <form id='params'>
                <h4>Chose a travel mode:</h4>
                <div>
                    <label>
                        <input name='profile' type='radio' value='walking'/>
                        <div>Walking</div>
                    </label>
                    <label>
                        <input name='profile' type='radio' value='cycling' checked/>
                        <div>Cycling</div>
                    </label>
                    <label>
                        <input name='profile' type='radio' value='driving'/>
                        <div>Driving</div>
                    </label>
                </div>
                <h4>Chose a maximum duration:</h4>
                <div>
                    <label>
                        <input name='duration' type='radio' value='10' checked/>
                        <div>10 min</div>
                    </label>
                    <label>
                        <input name='duration' type='radio' value='20'/>
                        <div>20 min</div>
                    </label>
                    <label>
                        <input name='duration' type='radio' value='30'/>
                        <div>30 min</div>
                    </label>
                </div>
            </form>
        </div>
    );
}

export default IsochroneMenu;
