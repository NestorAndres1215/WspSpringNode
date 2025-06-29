# 📦 NodeSpringWsp

**NodeSpringWsp** es un microproyecto que integra **Spring Boot (Java)** con **Node.js**, permitiendo el envío de mensajes de WhatsApp desde una API REST construida en Java, utilizando la biblioteca `whatsapp-web.js` en Node.js como puente.

---

## 📋 Descripción

Este proyecto demuestra cómo conectar un backend en **Spring Boot** con un bot de WhatsApp construido en **Node.js**, permitiendo que desde un formulario (o cualquier cliente HTTP), se pueda enviar un número de teléfono al backend Java, y este delegue a Node.js la tarea de enviar un mensaje de WhatsApp al número ingresado.


---

## 🔗 Flujo de trabajo

1. El usuario envía un número de celular desde un frontend o cliente a `Spring Boot`.
2. Spring Boot hace un `POST` a `Node.js` enviando el número y el mensaje.
3. Node.js, usando `whatsapp-web.js`, envía el mensaje de WhatsApp al número usando la sesión del usuario.

---

## 📦 Dependencias Utilizadas

### 🟢 En Node.js (`whatsapp-bot-node`)

| Paquete              | ¿Para qué sirve?                              |
|----------------------|-----------------------------------------------|
| `express`            | Servidor web para exponer el endpoint `/send` |
| `whatsapp-web.js`    | Biblioteca para conectarse a WhatsApp Web     |
| `qrcode-terminal`    | Muestra el código QR en consola para login    |

### 🔵 En Spring Boot (`spring-backend`)

| Dependencia Maven                 | ¿Para qué sirve?                             |
|----------------------------------|----------------------------------------------|
| `spring-boot-starter-web`        | Crear APIs REST en Java                      |
| `spring-boot-devtools` (opcional)| Recarga automática durante el desarrollo     |
| `lombok` (opcional)              | Reducir código repetitivo (`@Getter`, etc.)  |

---

## ⚠️ Recomendaciones de Seguridad

- ⚠️ **`whatsapp-web.js` NO es oficial**, úsalo solo para fines personales o de prueba.
- ⚠️ WhatsApp puede bloquear el número si detecta automatizaciones excesivas.
- ✅ Usa `LocalAuth` para no escanear el QR cada vez.
- ✅ Nunca envíes mensajes masivos.
- ✅ Protege el endpoint de Node.js con un token si lo expones a internet.

---

## 📌 Ejemplo de llamada

Desde Postman o cURL:

```http
POST http://localhost:8080/api/whatsapp/enviar
Content-Type: application/json

{
  "numero": "51999999999"
}
