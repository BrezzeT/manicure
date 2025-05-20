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
  MenuItem,
  Card,
  CardContent,
  useMediaQuery
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
  const isMobile = useMediaQuery('(max-width:600px)');

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
        if (selectedBooking.status === 'confirmed') {
          await sendBookingConfirmedEmail({
            to_email: selectedBooking.email,
            to_name: selectedBooking.name,
            date: new Date(selectedBooking.date).toLocaleString('uk-UA'),
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
          Панель адміністратора
        </Typography>

        {isMobile ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {bookings.map((booking) => (
              <Card key={booking.id} sx={{ width: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight={600}>
                    Ім'я: <span style={{ fontWeight: 400 }}>{booking.name}</span>
                  </Typography>
                  <Typography variant="body2">
                    Телефон: <span style={{ fontWeight: 500 }}>{booking.phone}</span>
                  </Typography>
                  <Typography variant="body2">
                    Email: <span style={{ fontWeight: 500 }}>{booking.email}</span>
                  </Typography>
                  <Typography variant="body2">
                    Дата: <span style={{ fontWeight: 500 }}>{new Date(booking.date).toLocaleString('uk-UA')}</span>
                  </Typography>
                  <Typography variant="body2">
                    Статус: <span style={{ fontWeight: 500 }}>{booking.status === 'pending' ? 'Очікує' : booking.status === 'confirmed' ? 'Підтверджено' : 'Скасовано'}</span>
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(booking)}
                      sx={{ flex: 1 }}
                    >
                      Редагувати
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(booking.id)}
                      sx={{ flex: 1 }}
                    >
                      Видалити
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ім'я</TableCell>
                  <TableCell>Телефон</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell>Статус</TableCell>
                  <TableCell>Дії</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.name}</TableCell>
                    <TableCell>{booking.phone}</TableCell>
                    <TableCell>{booking.email}</TableCell>
                    <TableCell>{new Date(booking.date).toLocaleString('uk-UA')}</TableCell>
                    <TableCell>
                      {booking.status === 'pending' ? 'Очікує' : 
                        booking.status === 'confirmed' ? 'Підтверджено' : 'Скасовано'}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(booking)}
                        sx={{ mr: 1 }}
                      >
                        Редагувати
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(booking.id)}
                      >
                        Видалити
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Редагувати запис</DialogTitle>
          <DialogContent>
            {selectedBooking && (
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  label="Ім'я"
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
                  label="Коментар"
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
                  <MenuItem value="pending">Очікує</MenuItem>
                  <MenuItem value="confirmed">Підтверджено</MenuItem>
                  <MenuItem value="cancelled">Скасовано</MenuItem>
                </TextField>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Скасувати</Button>
            <Button onClick={handleSaveEdit} variant="contained" color="primary">
              Зберегти
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default AdminPanel; 