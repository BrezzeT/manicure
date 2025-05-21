import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
  Snackbar,
  CircularProgress,
  useTheme,
  useMediaQuery,
  SelectChangeEvent
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { uk } from 'date-fns/locale';
import { addDays, format, isBefore, startOfDay } from 'date-fns';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import emailjs from '@emailjs/browser';

const services = [
  { value: 's_nar_bz', label: 'S (1-2) Нарощення без дизайну — 450 грн' },
  { value: 's_nar_dz', label: 'S (1-2) Нарощення з дизайном — 500 грн' },
  { value: 's_kor_bz', label: 'S (1-2) Корекція без дизайну — 350 грн' },
  { value: 's_kor_dz', label: 'S (1-2) Корекція з дизайном — 400 грн' },
  { value: 'm_nar_bz', label: 'M (3-4) Нарощення без дизайну — 550 грн' },
  { value: 'm_nar_dz', label: 'M (3-4) Нарощення з дизайном — 600 грн' },
  { value: 'm_kor_bz', label: 'M (3-4) Корекція без дизайну — 450 грн' },
  { value: 'm_kor_dz', label: 'M (3-4) Корекція з дизайном — 500 грн' },
  { value: 'l_nar_bz', label: 'L (5-6) Нарощення без дизайну — 650 грн' },
  { value: 'l_nar_dz', label: 'L (5-6) Нарощення з дизайном — 700 грн' },
  { value: 'l_kor_bz', label: 'L (5-6) Корекція без дизайну — 550 грн' },
  { value: 'l_kor_dz', label: 'L (5-6) Корекція з дизайном — 650 грн' },
  { value: 'xl_nar_bz', label: 'XL (7+) Нарощення без дизайну — 700 грн' },
  { value: 'xl_nar_dz', label: 'XL (7+) Нарощення з дизайном — 800 грн' },
  { value: 'xl_kor_bz', label: 'XL (7+) Корекція без дизайну — 600 грн' },
  { value: 'xl_kor_dz', label: 'XL (7+) Корекція з дизайном — 700 грн' },
];

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: Date | null;
  time: Date | null;
  notes: string;
}

const BookingForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: null,
    time: null,
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [isTimeAvailable, setIsTimeAvailable] = useState(true);

  const handleChange = (field: keyof Omit<FormData, 'date' | 'time'>) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleDateChange = (newDate: Date | null) => {
    setFormData({ ...formData, date: newDate, time: null });
    setIsTimeAvailable(true);
  };

  const handleTimeChange = (newTime: Date | null) => {
    setFormData({ ...formData, time: newTime });
  };

  const checkTimeAvailability = async () => {
    if (!formData.date || !formData.time) return;

    const selectedDateTime = new Date(formData.date);
    selectedDateTime.setHours(formData.time.getHours(), formData.time.getMinutes());

    const bookingsRef = collection(db, 'bookings');
    const q = query(
      bookingsRef,
      where('date', '==', format(selectedDateTime, 'yyyy-MM-dd')),
      where('time', '==', format(selectedDateTime, 'HH:mm'))
    );

    const querySnapshot = await getDocs(q);
    setIsTimeAvailable(querySnapshot.empty);
  };

  useEffect(() => {
    checkTimeAvailability();
  }, [formData.date, formData.time]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!isTimeAvailable) {
        throw new Error('Цей час вже зайнятий. Будь ласка, оберіть інший час.');
      }

      if (!formData.date || !formData.time) {
        throw new Error('Будь ласка, оберіть дату та час.');
      }

      const selectedDateTime = new Date(formData.date);
      selectedDateTime.setHours(formData.time.getHours(), formData.time.getMinutes());

      // Додаємо запис у Firestore
      await addDoc(collection(db, 'bookings'), {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        date: selectedDateTime.toISOString().split('T')[0], // yyyy-mm-dd
        time: selectedDateTime.toTimeString().slice(0, 5), // HH:mm
        notes: formData.notes,
        status: 'pending'
      });

      // Відправка email адміну через EmailJS
      await emailjs.send(
        'service_l9m9d0p',
        'template_44cbgqk',
        {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          date: `${selectedDateTime.toISOString().split('T')[0]} ${selectedDateTime.toTimeString().slice(0, 5)}`,
          service: formData.service,
          comment: formData.notes || '—',
        },
        'jd4RPKpFLrZS4ihaj'
      );

      setSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        date: null,
        time: null,
        notes: ''
      });
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #f8f9fb 100%)',
        py: 8
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 6 },
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontWeight: 700,
              color: '#333',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Запис на манікюр
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Box sx={{ width: '100%', gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                <TextField
                  fullWidth
                  label="Ім'я"
                  value={formData.name}
                  onChange={handleChange('name')}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: '#FF6B6B'
                      }
                    }
                  }}
                />
              </Box>

              <Box sx={{ width: '100%', gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                <TextField
                  fullWidth
                  label="Телефон"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: '#FF6B6B'
                      }
                    }
                  }}
                />
              </Box>

              <Box sx={{ width: '100%', gridColumn: 'span 12' }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: '#FF6B6B'
                      }
                    }
                  }}
                />
              </Box>

              <Box sx={{ width: '100%', gridColumn: 'span 12' }}>
                <FormControl fullWidth required>
                  <InputLabel>Послуга</InputLabel>
                  <Select
                    value={formData.service}
                    onChange={handleChange('service')}
                    label="Послуга"
                    sx={{
                      borderRadius: '12px',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#FF6B6B'
                      }
                    }}
                  >
                    {services.map((service) => (
                      <MenuItem key={service.value} value={service.value}>
                        {service.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ width: '100%', gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
                  <DatePicker
                    label="Дата"
                    value={formData.date}
                    onChange={handleDateChange}
                    minDate={startOfDay(new Date())}
                    maxDate={addDays(new Date(), 14)}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                        sx: {
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            '&:hover fieldset': {
                              borderColor: '#FF6B6B'
                            }
                          }
                        },
                      } as any
                    }}
                  />
                </LocalizationProvider>
              </Box>

              <Box sx={{ width: '100%', gridColumn: { xs: 'span 12', md: 'span 6' } }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
                  <TimePicker
                    label="Час"
                    value={formData.time}
                    onChange={handleTimeChange}
                     slotProps={{
                      textField: {
                        fullWidth: true,
                        required: true,
                         sx: {
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '12px',
                            '&:hover fieldset': {
                              borderColor: '#FF6B6B'
                            }
                          }
                        },
                      } as any
                    }}
                  />
                </LocalizationProvider>
              </Box>

              <Box sx={{ width: '100%', gridColumn: 'span 12' }}>
                <TextField
                  fullWidth
                  label="Додаткова інформація"
                  multiline
                  rows={4}
                  value={formData.notes}
                  onChange={handleChange('notes')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: '#FF6B6B'
                      }
                    }
                  }}
                />
              </Box>

              {!isTimeAvailable && (
                <Box sx={{ width: '100%', gridColumn: 'span 12' }}>
                  <Alert severity="warning" sx={{ borderRadius: '12px' }}>
                    Цей час вже зайнятий. Будь ласка, оберіть інший час.
                  </Alert>
                </Box>
              )}

              <Box sx={{ width: '100%', gridColumn: 'span 12' }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading || !isTimeAvailable}
                  sx={{
                    py: 2,
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                    boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF8E53 30%, #FF6B6B 90%)',
                    }
                  }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Записатися'}
                </Button>
              </Box>
            </Grid>
          </form>
        </Paper>
      </Container>

      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%', borderRadius: '12px' }}>
          Запис успішно створено
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%', borderRadius: '12px' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingForm; 