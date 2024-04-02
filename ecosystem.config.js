module.exports = {
  apps: [
    {
      name: 'tikitaball-api',
      script: './dist/main.js',
      time: true,
      max_memory_restart: '600M',
    },
  ],
};
