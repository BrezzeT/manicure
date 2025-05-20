import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { sendBookingConfirmation } from '../services/emailService';

const BookingForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date) {
      alert('Пожалуйста, выберите дату и время для записи.');
      return;
    }

    try {
      await addDoc(collection(db, 'bookings'), {
        name,
        phone,
        email,
        date: date.toISOString(),
        comment,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      // Очистка формы после успешной отправки
      setName('');
      setPhone('');
      setEmail('');
      setDate(null);
      setComment('');
      alert('Запись успешно создана!');

      // Отправка email уведомления
      await sendBookingConfirmation({
        to_email: email,
        to_name: name,
        date: date.toLocaleString() || 'Не указано',
        status: 'Ожидает подтверждения',
        phone: phone,
        comment: comment,
      });

    } catch (error) {
      console.error('Error adding booking:', error);
      alert('Произошла ошибка при создании записи');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Запись на маникюр
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Выберите дату и время"
              value={date}
              onChange={(newValue: Date | null) => setDate(newValue)}
              sx={{ mt: 2, mb: 2, width: '100%' }}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Комментарий"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Записаться
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default BookingForm; 