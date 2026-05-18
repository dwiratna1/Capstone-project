const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`ModalIn backend is running on port ${PORT}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received. Shutting down ModalIn backend...`);
  server.close(() => {
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
