module.exports = {
  apps: [
    {
      name: 'NestJS',
      script: 'npm',
      args: 'run start:prod',
      cwd: './',
    },
    {
      name: 'React',
      script: 'serve',
      args: '-s build -l 3000',
      cwd: './frontend',
    },
  ],
};
