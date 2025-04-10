import axios from 'axios';
import { Box } from '@mui/material';
import { JSX, useEffect, useState } from 'react';
import Map from './components/Map';
import Header from './components/Header';
import { socket } from './context/socket';
import SideBar from './components/SideBar';
import { SocketContext } from './context/socket';
import { EventType } from './enums/event-type.enum';
import { Location } from './entities/location.entity';
import { InfoWindowData } from './entities/info-window-data.entity';

function App(): JSX.Element {
  const [locationSelected, setLocationSelected] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [infoWindowData, setInfoWindowData] = useState<InfoWindowData | null>(
    null
  );
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  useEffect(() => {
    socket.on(EventType.ADD_LOCATION, (data) =>
      setLocations((prevLocations) => [data, ...prevLocations])
    );

    return () => {
      socket.off(EventType.ADD_LOCATION);
    };
  });

  useEffect(() => {
    socket.on(EventType.DELETE_LOCATION, (data) =>
      setLocations((prevLocations) =>
        prevLocations.filter((location) => location.id !== data.id)
      )
    );

    return () => {
      socket.off(EventType.DELETE_LOCATION);
    };
  });

  useEffect(() => {
    socket.on(EventType.UPDATE_LOCATION, (data) => {
      setLocations((prevLocations) => {
        const locationIndex = prevLocations.findIndex(
          (location) => location.id === data.id
        );

        if (locationIndex !== -1) {
          const updatedLocations = [
            ...prevLocations.slice(0, locationIndex),
            data,
            ...prevLocations.slice(locationIndex + 1),
          ];

          return updatedLocations;
        }

        return prevLocations;
      });
    });

    return () => {
      socket.off(EventType.UPDATE_LOCATION);
    };
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_LOCATIONS_API}/locations`)
      .then(({ data: { data } }) => setLocations(data))
      .catch(() => alert('error al obtener las ubicaciones'));
  }, []);

  return (
    <>
      <SocketContext.Provider
        value={{
          socket,
          locations,
          setLocations,
          locationSelected,
          setLocationSelected,
          infoWindowData,
          setInfoWindowData,
          showInfoWindow,
          setShowInfoWindow,
        }}
      >
        <Box>
          <Header />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <SideBar />
          <Map />
        </Box>
      </SocketContext.Provider>
    </>
  );
}

export default App;
