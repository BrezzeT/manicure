import React from 'react';
import { Box, Typography, Button, Container, Paper, Card, CardContent, Divider, useTheme, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import SpaIcon from '@mui/icons-material/Spa';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import InstagramIcon from '@mui/icons-material/Instagram';
import PlaceIcon from '@mui/icons-material/Place';
import Gallery from './Gallery';
import { useNavigate } from 'react-router-dom';

const priceData = [
  {
    size: 'S (1-2)',
    nar: [
      { label: 'Без дизайну', price: 450 },
      { label: 'З дизайном', price: 500 },
    ],
    kor: [
      { label: 'Без дизайну', price: 350 },
      { label: 'З дизайном', price: 400 },
    ],
  },
  {
    size: 'M (3-4)',
    nar: [
      { label: 'Без дизайну', price: 550 },
      { label: 'З дизайном', price: 600 },
    ],
    kor: [
      { label: 'Без дизайну', price: 450 },
      { label: 'З дизайном', price: 500 },
    ],
  },
  {
    size: 'L (5-6)',
    nar: [
      { label: 'Без дизайну', price: 650 },
      { label: 'З дизайном', price: 700 },
    ],
    kor: [
      { label: 'Без дизайну', price: 550 },
      { label: 'З дизайном', price: 650 },
    ],
  },
  {
    size: 'XL (7+)',
    nar: [
      { label: 'Без дизайну', price: 700 },
      { label: 'З дизайном', price: 800 },
    ],
    kor: [
      { label: 'Без дизайну', price: 600 },
      { label: 'З дизайном', price: 700 },
    ],
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f5f7fa 0%, #e0c3fc 100%)', pb: 8 }}>
      {/* Hero Section */}
      <Box sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 8 }, textAlign: 'center', color: '#6c47ff', position: 'relative' }}>
        <SpaIcon sx={{ fontSize: 70, mb: 2, color: '#b8c0ff', filter: 'drop-shadow(0 2px 8px #b8c0ff)' }} />
        <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: 2, mb: 2, fontSize: { xs: '2.2rem', md: '3.5rem' } }}>
          У Альооки
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#6c47ff', textShadow: '0 2px 8px #b8c0ff' }}>
          Манікюр
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 2, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIphoneIcon sx={{ color: '#6c47ff' }} />
            <Typography variant="h6" sx={{ color: '#6c47ff', fontWeight: 700 }}>
              9999999999999
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PhoneIphoneIcon sx={{ color: '#6c47ff' }} />
            <Typography variant="h6" sx={{ color: '#6c47ff', fontWeight: 700 }}>
              9999999999999
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/booking')}
          sx={{
            background: 'linear-gradient(90deg, #FF6B6B 0%, #FF8E53 100%)',
            color: '#fff',
            fontWeight: 900,
            borderRadius: '30px',
            px: 5,
            py: 1.5,
            fontSize: '1.2rem',
            boxShadow: '0 8px 32px rgba(255, 107, 107, 0.25)',
            letterSpacing: 1,
            textTransform: 'uppercase',
            transition: 'box-shadow 0.2s, filter 0.2s',
            '&:hover': {
              background: 'linear-gradient(90deg, #FF8E53 0%, #FF6B6B 100%)',
              color: '#fff',
              filter: 'brightness(1.08) drop-shadow(0 0 12px #FF8E53)',
              boxShadow: '0 8px 40px 0 rgba(255, 107, 107, 0.35)',
            },
            mt: 2
          }}
        >
          ЗАПИС ONLINE
        </Button>
      </Box>

      {/* Price Section */}
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 800, mb: 3, color: '#6c47ff' }}>
          Прайс
        </Typography>
        <Grid container spacing={isMobile ? 2 : 4} justifyContent="center">
          {priceData.map((row) => (
            <Box sx={{ width: { xs: '100%', sm: '50%', md: '25%' }, p: 1 }} key={row.size}>
              <Card sx={{ borderRadius: 4, boxShadow: '0 2px 16px rgba(176,120,255,0.10)', mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#b8c0ff', fontWeight: 700, mb: 1, textAlign: 'center' }}>{row.size}</Typography>
                  <Divider sx={{ mb: 1 }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#6c47ff', mb: 1, textAlign: 'center' }}>Нарощення</Typography>
                  {row.nar.map((item) => (
                    <Typography key={item.label} variant="body2" sx={{ mb: 0.5, textAlign: 'center' }}>
                      {item.label} — <b>{item.price} грн</b>
                    </Typography>
                  ))}
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#6c47ff', mt: 2, mb: 1, textAlign: 'center' }}>Корекція</Typography>
                  {row.kor.map((item) => (
                    <Typography key={item.label} variant="body2" sx={{ mb: 0.5, textAlign: 'center' }}>
                      {item.label} — <b>{item.price} грн</b>
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Box>
          ))}
        </Grid>
      </Container>

      {/* About Section */}
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 6, background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px rgba(176, 120, 255, 0.10)' }}>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 800, mb: 3, color: '#6c47ff' }}>
            Про нас
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
            <SpaIcon sx={{ fontSize: 90, color: '#b8c0ff', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#6c47ff', textAlign: 'center' }}>
              Сучасний сервіс, якість і затишок
            </Typography>
            <Typography variant="body1" sx={{ color: '#333', fontSize: '1.1rem', textAlign: 'center', maxWidth: 500 }}>
              Професійний манікюр, індивідуальний підхід, приємна атмосфера та турбота про кожного клієнта. Ми працюємо тільки з якісними матеріалами та дотримуємось усіх стандартів гігієни. Запрошуємо вас у світ краси та гармонії!
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Gallery Section */}
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 6, background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px rgba(176, 120, 255, 0.10)' }}>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 800, mb: 3, color: '#6c47ff' }}>
            Галерея робіт
          </Typography>
          <Gallery />
        </Paper>
      </Container>

      {/* Contacts Section */}
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 6, background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px rgba(176, 120, 255, 0.10)' }}>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 800, mb: 3, color: '#6c47ff' }}>
            Контакти
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', gap: { xs: 2, md: 6 }, textAlign: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <PlaceIcon sx={{ color: '#6c47ff' }} />
              <Typography variant="body1" sx={{ color: '#333' }}>м.Прилуки</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
              <PhoneIphoneIcon sx={{ color: '#6c47ff' }} />
              <Typography variant="body1" sx={{ color: '#333' }}>9999999999999</Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, textAlign: 'center' }}>
            <InstagramIcon sx={{ color: '#6c47ff' }} />
            <Typography variant="body1" component="a" href="https://instagram.com/your_instagram" target="_blank" rel="noopener noreferrer" sx={{ color: '#6c47ff', textDecoration: 'none', '&:hover': { color: '#b8c0ff' } }}>
              @your_instagram
            </Typography>
          </Box>
        </Paper>
      </Container>

      {/* Bottom booking button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, mb: 6 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/booking')}
          sx={{
            background: 'linear-gradient(90deg, #FF6B6B 0%, #FF8E53 100%)',
            color: '#fff',
            fontWeight: 900,
            borderRadius: '30px',
            px: 5,
            py: 1.5,
            fontSize: '1.2rem',
            boxShadow: '0 8px 32px rgba(255, 107, 107, 0.25)',
            letterSpacing: 1,
            textTransform: 'uppercase',
            transition: 'box-shadow 0.2s, filter 0.2s',
            '&:hover': {
              background: 'linear-gradient(90deg, #FF8E53 0%, #FF6B6B 100%)',
              color: '#fff',
              filter: 'brightness(1.08) drop-shadow(0 0 12px #FF8E53)',
              boxShadow: '0 8px 40px 0 rgba(255, 107, 107, 0.35)',
            },
          }}
        >
          ЗАПИС ONLINE
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage; 