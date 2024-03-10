import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Layer1 from './Layers/Layer1';
import { handleMarkerClick } from '../__mocks__/leafletMock';

jest.mock('axios'); // Mock axios if it's used within Layer1

describe('Layer1 Component', () => {
    test('renders markers and handles click events correctly', () => {
        // Mock data for networks and handleMarkerClick function
        const networks = [
            {
                "company": "JCDecaux",
                "href": "/v2/networks/velib",
                "location": {
                    "latitude": 48.856612,
                    "city": "Paris",
                    "longitude": 2.352233,
                    "country": "FRA"
                },
                "name": "Vélib'",
                "id": "velib"
            },
        ];

        // Render the Layer1 component with mock data and function
        const { getAllByTestId } = render(
            <Layer1 networks={networks} handleMarkerClick={handleMarkerClick} />
        );

        // Get markers by data-testid
        const markers = getAllByTestId('Marker');

        // Ensure the correct number of markers are rendered
        expect(markers.length).toBe(networks.length);

        // Simulate click events on each marker and verify if handleMarkerClick is called with the correct argument
        markers.forEach( async (marker, index) => {
            //fireEvent.click(marker);
            console.log(fireEvent(marker, new MouseEvent('click')));    
            await waitFor(() =>expect(handleMarkerClick).toHaveBeenCalledWith(networks[index].id));
        });
    });
});
