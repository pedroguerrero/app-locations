import { useContext } from 'react';
import { SocketContext } from '../context/socket';

export default function SideBar() {
  const { locations } = useContext(SocketContext);

  return (
    <div>
      <h1>Ubicaciones</h1>
      <p>Lista de ubicaciones en tiempo real</p>

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
  );
}
