import io from 'socket.io-client';
import { createContext, SetStateAction } from 'react';
import { Location } from '../entities/location.entity';
import { InfoWindowData } from '../entities/info-window-data.entity';

export const socket = io(import.meta.env.VITE_WEBSOCKET_SERVER);

export const SocketContext = createContext({
  socket: socket,
  locations: [] as Location[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLocations: (_locations: SetStateAction<Location[]>) => {},
  locationSelected: '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLocationSelected: (_locationSelected: SetStateAction<string>) => {},
  infoWindowData: {} as InfoWindowData | null,
  setInfoWindowData: (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _infoWindowData: SetStateAction<InfoWindowData | null>
  ) => {},
  showInfoWindow: false,
  setShowInfoWindow: (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _showInfoWindow: SetStateAction<boolean>
  ) => {},
});
