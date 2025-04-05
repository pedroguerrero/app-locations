import { useContext } from 'react';
import { SocketContext } from '../context/socket';

export default function Map() {
  const { locations } = useContext(SocketContext);

  return (
    <div>
      <h1>Mapa</h1>
      <p>Ubicaciones en el mapa</p>
      <div id="map" style={{ width: '100%', height: '500px' }}>
        <ul>
          {locations.map((location) => (
            <li
              key={location.id}
              style={{
                border: '1px solid black',
                margin: '10px 5px',
                padding: '10px',
                listStyle: 'none',
              }}
            >
              <h2>{location.name}</h2>
              <p>{location.description}</p>
              <p>
                {location.latitude}, {location.longitude}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
