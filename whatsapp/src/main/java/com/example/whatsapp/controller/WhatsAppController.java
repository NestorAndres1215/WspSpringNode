package com.example.whatsapp.controller;

import com.example.whatsapp.dto.MensajeDTO;
import com.example.whatsapp.service.WhatsAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/whatsapp")
public class WhatsAppController {

    @Autowired
    private WhatsAppService whatsAppService;

    @PostMapping("/enviar")
    public String enviar(@RequestBody MensajeDTO mensajeDTO) {
        String numero = mensajeDTO.getNumero();
        String mensaje = "Sale su left mano.";

        whatsAppService.enviarMensaje(numero, mensaje);
        return "✅ Mensaje enviado a: " + numero;
    }
}