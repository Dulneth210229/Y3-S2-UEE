require('dotenv').config();
const http = require('http');
const app = require('./app');
const { initChat } = require('./sockets/chat');
const { connectDB } = require('./config/db');

const server = http.createServer(app);
initChat(server);

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
});
