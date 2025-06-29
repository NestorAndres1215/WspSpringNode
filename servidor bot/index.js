const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const client = new Client();
const app = express();
app.use(express.json());

client.on('qr', qr => {
    console.log('\n==============================');
    console.log('   📱 Escanea este código QR   ');
    console.log('==============================\n');
    qrcode.generate(qr, { small: true });
    console.log('\n==============================\n');
});

client.on('ready', () => {
    console.log('\n==============================');
    console.log('   ✅ WhatsApp conectado correctamente.');
    console.log('==============================\n');
});

client.initialize();

app.post('/send', async (req, res) => {
    const { numero, mensaje } = req.body;

    // Validaciones básicas
    if (!numero || typeof numero !== 'string' || !numero.match(/^\d{10,15}$/)) {
        return res.status(400).json({ status: 'error', error: 'Número inválido. Debe ser un string numérico de 10 a 15 dígitos.' });
    }
    if (!mensaje || typeof mensaje !== 'string' || mensaje.trim().length === 0) {
        return res.status(400).json({ status: 'error', error: 'Mensaje inválido. Debe ser un string no vacío.' });
    }

    const chatId = `${numero}@c.us`;

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
