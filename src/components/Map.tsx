import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import {
  Map,
  Marker,
  InfoWindow,
  APIProvider,
} from '@vis.gl/react-google-maps';
import { SocketContext } from '../context/socket';
import { CurrentLocation } from '../entities/current-location.entity';

export default function Map2() {
  const {
    locations,
    setLocationSelected,
    infoWindowData,
    setInfoWindowData,
    showInfoWindow,
    setShowInfoWindow,
  } = useContext(SocketContext);
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation>({
    lat: Number(import.meta.env.VITE_DEFAULT_LATITUDE),
    lng: Number(import.meta.env.VITE_DEFAULT_LONGITUDE),
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCurrentLocation({
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
  }, []);

  return (
    <Box sx={{ height: '100vh', width: '500px' }}>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: '100vw', height: '100vh' }}
          defaultCenter={{ lat: currentLocation.lat, lng: currentLocation.lng }}
          defaultZoom={18}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {showInfoWindow && (
            <InfoWindow
              position={{
                lat: infoWindowData?.lat || 0,
                lng: infoWindowData?.lng || 0,
              }}
              onCloseClick={() => {
                setShowInfoWindow(false);
                setLocationSelected('');
                setInfoWindowData(null);
              }}
            >
              <Typography variant="h6" gutterBottom>
                {infoWindowData?.name}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {infoWindowData?.description}
              </Typography>
            </InfoWindow>
          )}

          {locations.map(({ id, name, description, latitude, longitude }) => (
            <Marker
              key={id}
              position={{ lat: Number(latitude), lng: Number(longitude) }}
              onClick={() => {
                setInfoWindowData({
                  lat: Number(latitude),
                  lng: Number(longitude),
                  name,
                  description,
                });

                setLocationSelected(id);

                setShowInfoWindow(true);
              }}
            />
          ))}
        </Map>
      </APIProvider>
    </Box>
  );
}
