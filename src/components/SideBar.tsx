import { useContext } from 'react';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import {
  Box,
  List,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { SocketContext } from '../context/socket';

export default function SideBar() {
  const { locations, locationSelected } = useContext(SocketContext);

  return (
    <Box
      sx={{
        height: '100vh',
        width: '300px',
        padding: '10px',
        overflowY: 'auto',
      }}
    >
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {locations.map(({ id, name, description }) => {
          return (
            <ListItem alignItems="flex-start" key={id}>
              <ListItemIcon>
                <LocationPinIcon />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    component="span"
                    variant="h6"
                    sx={{
                      color: locationSelected === id ? 'red' : 'text.primary',
                      display: 'block',
                    }}
                  >
                    {name}
                  </Typography>
                }
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: locationSelected === id ? 'red' : 'text.primary',
                      display: 'inline',
                    }}
                  >
                    {description}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
