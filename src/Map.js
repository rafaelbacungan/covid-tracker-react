import React from 'react';
import "./Map.css"
import { LeafletMap, TileLayer } from "react-leaflet";

function Map() {
    return (
        <div className="map">
            <LeafletMap>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
            </LeafletMap>
        </div>
    )
}

export default Map
