import React from 'react';
import { Box, Typography, Button, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import SpaIcon from '@mui/icons-material/Spa';
import { useNavigate } from 'react-router-dom';
import Gallery from './Gallery';

const gradientBg = 'linear-gradient(120deg, #e0aaff 0%, #b8c0ff 100%)';

const PriceTable = styled(TableContainer)(({ theme }) => ({
  background: 'rgba(255,255,255,0.95)',
  borderRadius: 24,
  boxShadow: '0 4px 24px rgba(176, 120, 255, 0.10)',
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(6),
}));

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: gradientBg, pb: 8 }}>
      {/* Hero Section */}
      <Box sx={{ pt: 6, pb: 4, textAlign: 'center', color: '#fff', position: 'relative' }}>
        <SpaIcon sx={{ fontSize: 60, mb: 2, color: '#fff', filter: 'drop-shadow(0 2px 8px #b8c0ff)' }} />
        <Typography variant="h2" sx={{ fontWeight: 900, letterSpacing: 2, mb: 2, fontSize: { xs: '2.2rem', md: '3.5rem' } }}>
          MAGIC STUDIO
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#fff', textShadow: '0 2px 8px #b8c0ff' }}>
          Манікюр
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 2, flexWrap: 'wrap' }}>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
            num.9999999999999
          </Typography>
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
            num.9999999999999
          </Typography>
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
            position: 'absolute',
            right: { xs: 16, md: 40 },
            top: { xs: 16, md: 40 },
            zIndex: 2,
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

      {/* Price Section */}
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Paper sx={{ p: 4, borderRadius: 6, background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px rgba(176, 120, 255, 0.10)' }}>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 800, mb: 3, color: '#6c47ff' }}>
            Прайс
          </Typography>
          <PriceTable sx={{ boxShadow: 'none', background: 'transparent', m: 0 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#6c47ff', border: 0 }}></TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#6c47ff', border: 0 }}>Нарощення</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#6c47ff', border: 0 }}>Корекція</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* S */}
                <TableRow>
                  <TableCell rowSpan={2} sx={{ fontWeight: 700, color: '#b8c0ff', border: 0, fontSize: '1.1rem' }}>S (довжина 1-2)</TableCell>
                  <TableCell align="center" sx={{ border: 0 }}>Без дизайну — 450</TableCell>
                  <TableCell align="center" sx={{ border: 0 }}>350</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ border: 0 }}>З дизайном — 500</TableCell>
                  <TableCell align="center" sx={{ border: 0 }}>400</TableCell>
                </TableRow>
                {/* M */}
                <TableRow>
                  <TableCell rowSpan={2} sx={{ fontWeight: 700, color: '#b8c0ff', border: 0, fontSize: '1.1rem' }}>M (довжина 3-4)</TableCell>
                  <TableCell align="center" sx={{ border: 0 }}>Без дизайну — 550</TableCell>
                  <TableCell align="center" sx={{ border: 0 }}>450</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ border: 0 }}>З дизайном — 600</TableCell>
                  <TableCell align="center" sx={{ border: 0 }}>500</TableCell>
                </TableRow>
                {/* L */}
                <TableRow>
                  <TableCell rowSpan={2} sx={{ fontWeight: 700, color: '#b8c0ff', border: 0, fontSize: '1.1rem' }}>L (довжина 5-6)</TableCell>
                  <TableCell align="center" sx={{ border: 0 }}>Без дизайну — 650</TableCell>
                  <TableCell align="center" sx={{ border: 0 }}>550</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ border: 0 }}>З дизайном — 700</TableCell>
                  <TableCell align="center" sx={{ border: 0 }}>650</TableCell>
                </TableRow>
                {/* XL */}
                <TableRow>
                  <TableCell rowSpan={2} sx={{ fontWeight: 700, color: '#b8c0ff', border: 0, fontSize: '1.1rem' }}>XL (довжина 7+)</TableCell>
                  <TableCell align="center" sx={{ border: 0 }}>Без дизайну — 700</TableCell>
                  <TableCell align="center" sx={{ border: 0 }}>600</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center" sx={{ border: 0 }}>З дизайном — 800</TableCell>
                  <TableCell align="center" sx={{ border: 0 }}>700</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </PriceTable>
        </Paper>
      </Container>

      {/* About Section */}
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Paper sx={{ p: 4, borderRadius: 6, background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px rgba(176, 120, 255, 0.10)' }}>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 800, mb: 3, color: '#6c47ff' }}>
            Про нас
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: '#6c47ff' }}>
            Сучасний сервіс, якість і затишок
          </Typography>
          <Typography variant="body1" sx={{ color: '#333', fontSize: '1.1rem' }}>
            Професійний манікюр, індивідуальний підхід, приємна атмосфера та турбота про кожного клієнта. Ми працюємо тільки з якісними матеріалами та дотримуємось усіх стандартів гігієни. Запрошуємо вас у світ краси та гармонії!
          </Typography>
        </Paper>
      </Container>

      {/* Gallery Section */}
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Paper sx={{ p: 4, borderRadius: 6, background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px rgba(176, 120, 255, 0.10)' }}>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 800, mb: 3, color: '#6c47ff' }}>
            Галерея робіт
          </Typography>
          <Gallery />
        </Paper>
      </Container>

      {/* Contacts Section */}
      <Container maxWidth="md" sx={{ my: 6 }}>
        <Paper sx={{ p: 4, borderRadius: 6, background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px rgba(176, 120, 255, 0.10)' }}>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 800, mb: 3, color: '#6c47ff' }}>
            Контакти
          </Typography>
          <Typography variant="h6" sx={{ color: '#6c47ff', mb: 1 }}>Адреса</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>Прилуки</Typography>
          <Typography variant="h6" sx={{ color: '#6c47ff', mb: 1 }}>Телефон</Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>9999999999999</Typography>
          <Typography variant="h6" sx={{ color: '#6c47ff', mb: 1 }}>Instagram</Typography>
          <Typography variant="body1" component="a" href="https://instagram.com/your_instagram" target="_blank" rel="noopener noreferrer" sx={{ color: '#6c47ff', textDecoration: 'none', '&:hover': { color: '#b8c0ff' } }}>
            @9999999999999
          </Typography>
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