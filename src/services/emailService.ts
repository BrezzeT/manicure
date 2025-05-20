import emailjs from '@emailjs/browser';

// Инициализация Email.js
emailjs.init("jd4RPKpFLrZS4ihaj"); // Замените на ваш публичный ключ

interface EmailParamsBooking {
  to_email: string;
  to_name: string;
  date: string;
  status: string;
  comment?: string;
  phone: string;
}

interface EmailParamsConfirmed {
  to_email: string;
  to_name: string;
  date: string;
}

export const sendBookingConfirmation = async (params: EmailParamsBooking) => {
  try {
    await emailjs.send(
      "service_l9m9d0p", // Ваш Service ID
      "template_44cbgqk", // Ваш Template ID для новой записи
      {
        name: params.to_name,
        email: params.to_email,
        date: params.date,
        status: params.status,
        phone: params.phone,
        comment: params.comment || 'Нет',
      }
    );
    return true;
  } catch (error) {
    console.error('Error sending booking confirmation email:', error);
    return false;
  }
};

export const sendBookingConfirmedEmail = async (params: EmailParamsConfirmed) => {
  try {
    await emailjs.send(
      "service_l9m9d0p", // Ваш Service ID
      "template_n9yk5mr", // <-- Вставлен реальный Template ID для подтверждения
      {
        to_name: params.to_name, // Соответствует {{to_name}} в шаблоне подтверждения
        date: params.date,       // Соответствует {{date}} в шаблоне подтверждения
        email: params.to_email,  // На всякий случай, если используется в шаблоне
      }
    );
    return true;
  } catch (error) {
    console.error('Error sending booking confirmed email:', error);
    return false;
  }
}; 