import React from 'react';
import "./Map.css";
import {MapContainer as MapLeaflet, TileLayer } from "react-leaflet";
import { showDataOnMap } from './util';

function Map({center, zoom, country, casesType}) {

    //console.log(center, zoom);
    //I have no idea what I'm doing!!!!! What the fuck
    return (
        <div className="map">
        {console.log(center)}
        
            <MapLeaflet
                center={center}
                zoom={zoom}
                
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                /> 
                {/** Loop through countries and draw circles */}
                {showDataOnMap(country, casesType)}
            </MapLeaflet>
        </div>
    )
}

export default Map
