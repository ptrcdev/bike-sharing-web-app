import React from "react";
import './Layer3.css'
function Layer3({ network, stations }) {

    console.log("LAYER3");
    console.log(network)
    return (
        <div className="stations-information">
            {
                stations.map(station => (
                    <div className="station-card">
                        <h3>{station.name}</h3>
                        <p>Empty Slots: {station.empty_slots}</p>
                        <p>{network.company}</p>
                        <p>{network.location.city}</p>
                    </div>
                ))
            }

        </div>

    )
}

export default Layer3;

// TODO: now i have to figure out where to call this component....