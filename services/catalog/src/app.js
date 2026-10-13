require('dotenv').config();
const express = require('express');
const http = require('http');


const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));


const server = http.createServer(app);

async function start() {
  const PORT = process.env.PORT || 3001;
  server.listen(PORT, () => {
    console.log(`[Server] in ascolto sulla porta ${PORT}`);
  });
}

function shutdown(signal) {
  console.log(`[Server] ${signal} ricevuto, chiusura in corso`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref(); // fallback
}
process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

if (require.main === module) {
  start();
}

module.exports = { app };