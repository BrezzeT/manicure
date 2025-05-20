import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SpaIcon from '@mui/icons-material/Spa';
import BookingForm from './components/BookingForm';
import Reviews from './components/Reviews';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';

const navLinks = [
  { label: 'Запис', path: '/' },
  { label: 'Відгуки', path: '/reviews' },
  { label: 'Вхід для адміна', path: '/login' },
];

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const DrawerMenu = (
    <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
      <Box sx={{ width: 220, pt: 2 }} role="presentation" onClick={handleDrawerToggle}>
        <List>
          {navLinks.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <Router>
      <CssBaseline />
      <AppBar position="static" elevation={0} sx={{
        background: 'linear-gradient(90deg, #e0aaff 0%, #b8c0ff 100%)',
        boxShadow: '0 4px 24px rgba(176, 120, 255, 0.10)',
        borderBottomLeftRadius: '24px',
        borderBottomRightRadius: '24px',
        paddingY: { xs: 1, md: 2 },
        transition: 'background 0.3s',
      }}>
        <Toolbar>
          <SpaIcon sx={{ fontSize: 36, color: '#fff', mr: 2, filter: 'drop-shadow(0 2px 8px #b8c0ff)' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1, color: '#fff', textShadow: '0 2px 8px #b8c0ff', textAlign: isMobile ? 'left' : 'left' }}>
            Манікюрний салон
          </Typography>
          {isMobile ? (
            <>
              <IconButton color="inherit" edge="end" onClick={handleDrawerToggle}>
                <MenuIcon sx={{ fontSize: 32 }} />
              </IconButton>
              {DrawerMenu}
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navLinks.map((item) => (
                <Button key={item.path} color="inherit" component={Link} to={item.path} sx={{
                  background: 'rgba(255,255,255,0.12)',
                  color: '#fff',
                  fontWeight: 600,
                  borderRadius: '20px',
                  px: 3,
                  mx: 1,
                  boxShadow: 'none',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.22)',
                    color: '#e0aaff',
                    boxShadow: '0 2px 8px #b8c0ff',
                  },
                }}>
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route path="/" element={<BookingForm />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<PrivateRoute />}>
             <Route index element={<AdminPanel />} />
          </Route>
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
