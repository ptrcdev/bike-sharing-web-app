import React from "react";
import 'leaflet/dist/leaflet.css';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl,
    iconRetinaUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function Layer2({ network, stations, handleMarkerClick }) {
    return (
        stations.map(station => ( // renders all the stations in the correct place
            <Marker key={station.id} data={station} position={[station.latitude, station.longitude]} eventHandlers={{
                click: (e) => {
                    handleMarkerClick(e.target.options.data)
                }
            }} > 
            
                <Popup> 
                    <h3>{station.name}</h3>
                    Total Slots: {station.extra.slots} <br />
                    Empty Slots: {station.empty_slots} <br />
                    Free bikes: {station.free_bikes} <br />
                    City: {network.location.city} <br />
                </Popup>
            </Marker>))

    );
}

export default Layer2;