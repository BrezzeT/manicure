import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import BookingForm from './components/BookingForm';
import Reviews from './components/Reviews';
import AdminPanel from './components/AdminPanel';
import LoginPage from './components/LoginPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Маникюрный салон
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Запись
          </Button>
          <Button color="inherit" component={Link} to="/reviews">
            Отзывы
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Админ Вход
          </Button>
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
