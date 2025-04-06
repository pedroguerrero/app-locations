import AdbIcon from '@mui/icons-material/Adb';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';

export default function Header() {
  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                display: { xs: 'none', md: 'flex' },
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Locations App
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
