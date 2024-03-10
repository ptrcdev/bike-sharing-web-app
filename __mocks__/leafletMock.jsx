const MapContainer = ({ children }) => <div data-testid="MapContainer">{children}</div>;

const handleMarkerClick = jest.fn();

const useMap = () => ({ fitBounds: () => {} });

const TileLayer = () => <div data-testid="TileLayer" />;

const Marker = ({ children }) => <div data-testid="Marker" onClick={handleMarkerClick}>{children}</div>;

const Popup = () => <div data-testid="Popup" />;

export { MapContainer, TileLayer, Marker, Popup, useMap, handleMarkerClick };