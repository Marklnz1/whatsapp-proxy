const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("dotenv").config();

const app = express();
const target = process.env.DOMAIN;

// Configuración del proxy
app.use(
  "/",
  createProxyMiddleware({
    target: target,
    changeOrigin: true,
    ws: true, // Habilitar redirección de WebSockets
    onError: (err, req, res) => {
      res.status(500).send("Algo salió mal con el proxy.");
    },
    secure: false, // Permitir redirección a HTTP
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
