import React, { useState, useEffect } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(MuiAppBar)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  transition: 'all 0.3s ease-in-out',
  '&.scrolled': {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    '& .MuiTypography-root': {
      color: '#333',
    },
    '& .MuiButton-root': {
      color: '#333',
      '&:hover': {
        background: 'rgba(0, 0, 0, 0.04)',
      },
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  fontWeight: 500,
  fontSize: '1rem',
  textTransform: 'none',
  padding: '8px 16px',
  borderRadius: '8px',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

const AppBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const navItems = [
    { label: 'Головна', path: '/' },
    { label: 'Запис', path: '/booking' },
    { label: 'Галерея', path: '/gallery' },
    { label: 'Контакти', path: '/contacts' }
  ];

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.label}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                background: 'rgba(255, 107, 107, 0.1)',
                '& .MuiListItemText-primary': {
                  color: '#FF6B6B',
                },
              },
              '&:hover': {
                background: 'rgba(255, 107, 107, 0.05)',
              }
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: location.pathname === item.path ? 600 : 400,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar position="fixed" className={scrolled ? 'scrolled' : ''}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: scrolled ? '#333' : '#fff',
                fontSize: { xs: '1.2rem', md: '1.5rem' },
              }}
            >
              Манікюрний салон Альона
            </Typography>

            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: scrolled ? '#333' : '#fff' }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <NavButton
                  key="Головна"
                  onClick={() => navigate('/')}
                  sx={{
                    color: scrolled ? '#333' : '#fff',
                    fontWeight: location.pathname === '/' ? 600 : 400,
                    background: location.pathname === '/'
                      ? scrolled
                        ? 'rgba(255, 107, 107, 0.1)'
                        : 'rgba(255, 255, 255, 0.1)'
                      : 'transparent',
                    display: 'inline-flex',
                  }}
                >
                  Головна
                </NavButton>
                {navItems.filter(item => item.path !== '/').map((item) => (
                  <NavButton
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    sx={{
                      color: scrolled ? '#333' : '#fff',
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      background: location.pathname === item.path
                        ? scrolled
                          ? 'rgba(255, 107, 107, 0.1)'
                          : 'rgba(255, 255, 255, 0.1)'
                        : 'transparent',
                      display: 'inline-flex',
                    }}
                  >
                    {item.label}
                  </NavButton>
                ))}
              </Box>
            )}
          </Toolbar>
        </Container>
      </StyledAppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default AppBar; 