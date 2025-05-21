import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { sendBookingConfirmation } from '../services/emailService';
import { uk } from 'date-fns/locale';

const BookingFormInner = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [comment, setComment] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isSlotTaken, setIsSlotTaken] = useState(false);
  const [checkError, setCheckError] = useState('');

  const checkExistingBooking = async (selectedDate: Date): Promise<boolean> => {
    try {
      const startOfHour = new Date(selectedDate);
      startOfHour.setMinutes(0, 0, 0);
      const endOfHour = new Date(selectedDate);
      endOfHour.setMinutes(59, 59, 999);
      const q = query(
        collection(db, 'bookings'),
        where('date', '>=', startOfHour.toISOString()),
        where('date', '<=', endOfHour.toISOString())
      );
      const querySnapshot = await getDocs(q);
      const filtered = querySnapshot.docs.filter(doc => {
        const data = doc.data();
        return data.status === 'pending' || data.status === 'confirmed';
      });
      return filtered.length > 0;
    } catch (error) {
      setCheckError('Помилка при перевірці зайнятості часу. Спробуйте ще раз.');
      return false;
    }
  };

  const handleDateChange = async (newValue: Date | null) => {
    setDate(newValue);
    setCheckError('');
    setIsSlotTaken(false);
    if (newValue) {
      setIsChecking(true);
      const taken = await checkExistingBooking(newValue);
      setIsSlotTaken(taken);
      setIsChecking(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      alert('Будь ласка, оберіть дату та час для запису.');
      return;
    }
    if (isSlotTaken) {
      alert('Цей час вже зайнятий. Будь ласка, оберіть інший.');
      return;
    }
    setIsChecking(true);
    try {
      const hasExistingBooking = await checkExistingBooking(date);
      if (hasExistingBooking) {
        setIsSlotTaken(true);
        setIsChecking(false);
        alert('Цей час вже зайнятий. Будь ласка, оберіть інший.');
        return;
      }
      await addDoc(collection(db, 'bookings'), {
        name,
        phone,
        email,
        date: date.toISOString(),
        comment,
        status: 'pending',
        createdAt: new Date().toISOString()
      });
      setName('');
      setPhone('');
      setEmail('');
      setDate(null);
      setComment('');
      setIsSlotTaken(false);
      alert('Запис успішно створено!');
      await sendBookingConfirmation({
        to_email: email,
        to_name: name,
        date: date.toLocaleString() || 'Не вказано',
        status: 'Очікує підтвердження',
        phone: phone,
        comment: comment,
      });
    } catch (error) {
      console.error('Error adding booking:', error);
      alert('Сталася помилка при створенні запису');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Запис на манікюр
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Ваше ім'я"
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
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uk}>
            <DateTimePicker
              label="Оберіть дату та час"
              value={date}
              onChange={handleDateChange}
              sx={{ mt: 2, mb: 2, width: '100%' }}
              minDateTime={new Date()}
              format="dd.MM.yyyy HH:mm"
              views={['year', 'month', 'day', 'hours', 'minutes']}
              ampm={false}
              timeSteps={{ minutes: 30 }}
            />
          </LocalizationProvider>
          {isSlotTaken && (
            <Typography color="error" sx={{ mt: 1, mb: 1 }}>
              Цей час вже зайнятий. Будь ласка, оберіть інший.
            </Typography>
          )}
          {checkError && (
            <Typography color="error" sx={{ mt: 1, mb: 1 }}>{checkError}</Typography>
          )}
          <TextField
            fullWidth
            label="Коментар"
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
            disabled={isChecking || isSlotTaken}
          >
            {isChecking ? 'Перевірка доступності...' : 'Записатися'}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default BookingFormInner; 