const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const client = new Client();
const app = express();
app.use(express.json());

client.on('qr', qr => {
    console.log('Escanea este QR con tu WhatsApp');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('✅ WhatsApp conectado correctamente.');
});

client.initialize();

app.post('/send', async (req, res) => {
    const { numero, mensaje } = req.body;
    const chatId = numero + '@c.us';

    try {
        await client.sendMessage(chatId, mensaje);
        res.json({ status: 'ok', enviado: true });
    } catch (err) {
        res.status(500).json({ status: 'error', error: err.message });
    }
});

app.listen(3000, () => {
    console.log('📡 Servidor escuchando en http://localhost:3000');
});
