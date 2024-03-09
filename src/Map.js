import React, { useEffect, useState } from 'react';
import Layer1 from './Layer1';
import Layer2 from './Layer2';
import Layer3 from './Layer3';
import Layer3Markers from './Layer3Markers';
import axios from 'axios';
import { MapContainer, TileLayer } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function Map() {

    // Define state to store the fetched data
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentLayer, setCurrentLayer] = useState(1);
    const [stations, setStations] = useState(null);
    const [clickedNetwork, setClickedNetwork] = useState(null);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                // Make a GET request to the API endpoint
                const response = await axios.get('http://api.citybik.es/v2/networks');
                // Update the component state with the fetched data

                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                // Handle errors
                setError(error);
                setIsLoading(false);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();

        // Clean up function (optional)
        return () => {
            // Cancel the HTTP request if the component is unmounted before the request is completed
        };
    }, []); // Empty dependency array means this effect runs only once after the initial render

    // Render loading state while fetching data
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Render error message if an error occurs
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    async function fetchStations(network_id) {
        try {
            // Make a GET request to the API endpoint
            const response = await axios.get(`http://api.citybik.es/v2/networks/${network_id}`);
            // Update the component state with the fetched data

            setStations(response.data);
            setClickedNetwork(response.data)
        } catch (error) {
            // Handle errors
            setError(error);
        }
    }

    const handleMarkerClick = (id) => {
        setIsLoading(true);

        if (currentLayer === 1) {
            fetchStations(id);
            setCurrentLayer(2);
            setIsLoading(false);
        } else if (currentLayer === 2) {
            setCurrentLayer(3);
            setIsLoading(false);
            console.log(clickedNetwork)
        }
        
        console.log("end func");
        // not quite sure...
    }

    console.log(stations);

    function mock() {
        if (currentLayer === 1 && data.networks) {
            return <Layer1 networks={data.networks} handleMarkerClick={handleMarkerClick}/>;
        } else if( currentLayer !== 1 && stations) {
            return <Layer2 stations={stations.network.stations} handleMarkerClick={handleMarkerClick} />
        } 
    }

    const handleBack = () => {
        if (currentLayer !== 1) {
            setCurrentLayer(currentLayer-1);
        }
    }

    return (
        <div style={{width: "100vw"}}>
        <MapContainer center={[51.893604, -8.494174]} zoom={5} style={{ height: '400px', width: '100%' }}>
            <button disabled={currentLayer === 1} style={{ position: 'absolute', top: '80px', left: '13px', zIndex: '1000', "height": "30px", width: "30px"}} onClick={handleBack}><FontAwesomeIcon icon={faArrowLeft} /></button>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            { mock() }
        </MapContainer>
        {currentLayer === 3 && stations && clickedNetwork ? <Layer3 network={clickedNetwork.network} stations={stations.network.stations} /> : null}
        </div>
    );
}

export default Map;
