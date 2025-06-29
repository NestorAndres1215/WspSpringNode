package com.example.whatsapp.service;

import org.springframework.stereotype.Service;

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@Service
public class WhatsAppService {

    public void enviarMensaje(String numeroDestino, String mensaje) {
        try {
            String payload = String.format("{\"numero\":\"%s\", \"mensaje\":\"%s\"}", numeroDestino, mensaje);

            URL url = new URL("http://localhost:3000/send");
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setDoOutput(true);
            conn.setRequestMethod("POST");
            conn.setRequestProperty("Content-Type", "application/json");

            try (OutputStream os = conn.getOutputStream()) {
                os.write(payload.getBytes());
                os.flush();
            }

            conn.getInputStream().close(); // Leer respuesta para cerrar conexión correctamente
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}