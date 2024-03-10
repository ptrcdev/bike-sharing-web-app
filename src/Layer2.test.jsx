import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Layer2 from './Layers/Layer2';

describe('Layer2 Component', () => {
  test('renders stations and handles click events correctly', () => {
    // Mock data for stations and handleMarkerClick function
    const network = { location: { city: 'Test City' } };
    const stations = [
      { id: 1, name: 'Station 1', latitude: 40.7128, longitude: -74.006, extra: { slots: 10 }, empty_slots: 5, free_bikes: 5 },
      { id: 2, name: 'Station 2', latitude: 34.0522, longitude: -118.2437, extra: { slots: 8 }, empty_slots: 3, free_bikes: 5 },
    ];

    const handleMarkerClick = jest.fn();

    // Render the Layer2 component with mock data and function
    const { getAllByTestId } = render(
      <Layer2 network={network} stations={stations} handleMarkerClick={handleMarkerClick} />
    );

    // Get markers by data-testid
    const markers = getAllByTestId('Marker');

    // Ensure the correct number of markers are rendered
    expect(markers.length).toBe(stations.length);

    // Simulate click events on each marker and verify if handleMarkerClick is called with the correct argument
    markers.forEach( async (marker, index) => {
      fireEvent.click(marker);
      await waitFor(() => expect(handleMarkerClick).toHaveBeenCalledWith(stations[index]));
    });
  });
});
