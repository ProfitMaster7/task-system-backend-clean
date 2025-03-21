const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: 'https://curaesencial.netlify.app' }));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

app.post('/send-sms', async (req, res) => {
  const { to, message } = req.body;
  console.log('Solicitud recibida:', { to, message });

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    console.log('SMS enviado con éxito a:', to);
    res.status(200).send('SMS enviado');
  } catch (error) {
    console.error('Error al enviar SMS:', error);
    res.status(500).send('Error al enviar SMS');
  }
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));