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

const sendEmail = async (templateId: string, templateParams: any) => {
  try {
    const response = await emailjs.send(
      "service_l9m9d0p",
      templateId,
      {
        ...templateParams,
        reply_to: "your-email@domain.com", // Замените на ваш email
        from_name: "Манікюрний салон",
        subject: "Підтвердження запису",
        custom_headers: {
          "X-Priority": "1",
          "X-MSMail-Priority": "High",
          "Importance": "high",
          "X-Mailer": "Manicure Booking System"
        }
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

export const sendBookingConfirmation = async (params: EmailParamsBooking) => {
  return sendEmail("template_44cbgqk", {
    name: params.to_name,
    email: params.to_email,
    date: params.date,
    status: params.status,
    phone: params.phone,
    comment: params.comment || 'Нет',
  });
};

export const sendBookingConfirmedEmail = async (params: EmailParamsConfirmed) => {
  return sendEmail("template_n9yk5mr", {
    to_name: params.to_name,
    date: params.date,
    email: params.to_email,
  });
}; 