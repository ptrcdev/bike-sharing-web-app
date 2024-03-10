import React, { useEffect, useState } from 'react';
import Layer1 from './Layers/Layer1';
import Layer2 from './Layers/Layer2';
import Homepage from './Homepage';
import axios from 'axios';
import { MapContainer, TileLayer } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faInfo } from '@fortawesome/free-solid-svg-icons';


function Map() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentLayer, setCurrentLayer] = useState(0);
    const [stations, setStations] = useState(null);
    const [clickedNetwork, setClickedNetwork] = useState(null);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://api.citybik.es/v2/networks');

                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                // Handle errors
                setError(error);
                setIsLoading(false);
            }
        };

        fetchData();

    }, []); // Empty dependency array so that this effect runs only once after the initial render

    // Render loading state while fetching data
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Render error message if an error occurs
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // handles click on the start button in the homepage
    const handleStart = () => {
        setCurrentLayer(1);
    }


    // fetches all the stations within a network
    async function fetchStations(network_id) {
        try {
            const response = await axios.get(`http://api.citybik.es/v2/networks/${network_id}`);

            setStations(response.data);
            setClickedNetwork(response.data)
        } catch (error) {
            setError(error);
        }
    }

    const handleMarkerClick = (id) => {
        setIsLoading(true);

        if (currentLayer === 1) { // if current layer is 1 and a marker is clicked it means we're entering layer 2
            fetchStations(id);
            setCurrentLayer(2);
            setIsLoading(false);
        } else if (currentLayer === 2) {
            setIsLoading(false)
        }
    }

    function renderLayer() {
        if (currentLayer === 1 && data.networks) { // checks if we're on layer 1 and we were able to fetch all the networks
            return <Layer1 networks={data.networks} handleMarkerClick={handleMarkerClick} dataTestId="layer1" />; // renders Layer1 markers
        } else if (currentLayer !== 1 && stations) { // layer 2 and 3 visually have the same markers. layer 3 is just the pop up
            return <Layer2 dataTestId="layer2" network={clickedNetwork.network} stations={stations.network.stations} handleMarkerClick={handleMarkerClick}  />
        }
    }

    const handleBack = () => { // function to return back a layer
        if (currentLayer !== 1) {
            setCurrentLayer(currentLayer - 1);
        }
    }

    return (

        currentLayer === 0 ? <Homepage handleStart={handleStart} /> : <div style={{ width: "100vw", display: 'flex', flexDirection: 'column', alignContent: 'center', justifyContent: 'center' }}>
            <FontAwesomeIcon style={{borderRadius: "50%", border: "1px solid navy", width: "15px", height: "15px", padding: "4px", margin: "10px"}} icon={faInfo} onClick={() => setCurrentLayer(0)}/>
            <h1 style={{ marginTop: '100px' }}>BIKE SHARING APP</h1>
            <MapContainer center={[38.724954, -9.149334]} zoom={5} style={{ height: '500px', width: '80%', left: '150px', marginTop: '50px', border: '1px solid black' }}>
                <button disabled={currentLayer === 1} style={{ position: 'absolute', top: '80px', left: '13px', zIndex: '1000', "height": "30px", width: "30px" }} onClick={handleBack}><FontAwesomeIcon icon={faArrowLeft} /></button>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {renderLayer()}
            </MapContainer>
        </div>


    );
}

export default Map;
