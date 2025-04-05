import io from 'socket.io-client';
import { createContext, SetStateAction } from 'react';
import { Location } from '../entities/location.entity';

export const socket = io(import.meta.env.VITE_WEBSOCKET_SERVER);

export const SocketContext = createContext({
  socket: socket,
  locations: [] as Location[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLocations: (_locations: SetStateAction<Location[]>) => {},
});
