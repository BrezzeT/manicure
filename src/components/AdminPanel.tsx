import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { sendBookingConfirmedEmail } from '../services/emailService';

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  status: string;
  comment: string;
}

const AdminPanel = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      const bookingsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Booking));
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDelete = async (bookingId: string) => {
    try {
      await deleteDoc(doc(db, 'bookings', bookingId));
      fetchBookings();
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setOpenDialog(true);
  };

  const handleSaveEdit = async () => {
    if (selectedBooking) {
      try {
        await updateDoc(doc(db, 'bookings', selectedBooking.id), {
          ...selectedBooking
        });
        setOpenDialog(false);
        fetchBookings();
        // Отправка письма при подтверждении
        if (selectedBooking.status === 'confirmed') {
          await sendBookingConfirmedEmail({
            to_email: selectedBooking.email,
            to_name: selectedBooking.name,
            date: new Date(selectedBooking.date).toLocaleString(),
          });
        }
      } catch (error) {
        console.error('Error updating booking:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Панель администратора
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Имя</TableCell>
                <TableCell>Телефон</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Дата</TableCell>
                <TableCell>Статус</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.name}</TableCell>
                  <TableCell>{booking.phone}</TableCell>
                  <TableCell>{booking.email}</TableCell>
                  <TableCell>{new Date(booking.date).toLocaleString()}</TableCell>
                  <TableCell>{booking.status === 'pending' ? 'Ожидает' : booking.status === 'confirmed' ? 'Подтверждено' : 'Отменено'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(booking)}
                      sx={{ mr: 1 }}
                    >
                      Редактировать
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(booking.id)}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Редактировать запись</DialogTitle>
          <DialogContent>
            {selectedBooking && (
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  label="Имя"
                  value={selectedBooking.name}
                  onChange={(e) => setSelectedBooking({ ...selectedBooking, name: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Телефон"
                  value={selectedBooking.phone}
                  onChange={(e) => setSelectedBooking({ ...selectedBooking, phone: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={selectedBooking.email}
                  onChange={(e) => setSelectedBooking({ ...selectedBooking, email: e.target.value })}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Комментарий"
                  multiline
                  rows={4}
                  value={selectedBooking.comment}
                  onChange={(e) => setSelectedBooking({ ...selectedBooking, comment: e.target.value })}
                  margin="normal"
                />
                <TextField
                  select
                  fullWidth
                  label="Статус"
                  value={selectedBooking.status}
                  onChange={(e) => setSelectedBooking({ ...selectedBooking, status: e.target.value })}
                  margin="normal"
                >
                  <MenuItem value="pending">Ожидает</MenuItem>
                  <MenuItem value="confirmed">Подтверждено</MenuItem>
                  <MenuItem value="cancelled">Отменено</MenuItem>
                </TextField>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Отмена</Button>
            <Button onClick={handleSaveEdit} variant="contained" color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AdminPanel; 