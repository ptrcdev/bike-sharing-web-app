import React from 'react';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import Map from './Map';
import axios from 'axios'; // Import axios for mocking
import { wait } from '@testing-library/user-event/dist/utils';

// Mock axios to prevent actual network requests during testing
jest.mock('axios');
// jest.mock('../__mocks__/leafletMock');

describe('Map Component', () => {
  test('renders loading state initially and welcome page', async () => {
    // Mock response data for the axios get request
    const mockData = {
      networks: [
        // Mock network data as needed for testing
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
      ]
    };

    // Mock axios.get to return a promise that resolves with the mock data
    axios.get.mockResolvedValue({ data: mockData });

    const { getByText } = render(<Map />);

    // Check if "Loading..." text is present initially
    expect(getByText('Loading...')).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => expect(getByText('Welcome!')).toBeInTheDocument());
  });

  // Add more tests for other functionalities of the Map component

  test('renders Layer1 when button on homepage is clicked', async () => {

    const mockData = {
      networks: [
        // Mock network data as needed for testing
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
      ]
    };

    // Mock axios.get to return a promise that resolves with the mock data
    axios.get.mockResolvedValue({ data: mockData });
    const { getByText } = render(<Map />);

    // Check if "Loading..." text is present initially
    expect(getByText('Loading...')).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => expect(getByText('Welcome!')).toBeInTheDocument());

    // Simulate clicking on the start button in Homepage
    fireEvent.click(getByText('Start looking!'));

    await waitFor(() => expect(getByText('BIKE SHARING APP')).toBeInTheDocument());
  });

});

