require('dotenv').config();

https: module.exports = {
  apps: [
    {
      script: '../backend/dist/main.js',
      watch: '.',
      env: {
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_NAME: process.env.DB_NAME,
      },
    },
    {
      script: './pm2/worker.js',
      instances: 'max',
      exec_mode: 'cluster',
    },
  ],
};
