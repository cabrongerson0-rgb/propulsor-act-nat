const { spawn } = require('child_process');

const port = process.env.PORT || 3000;

console.log('🚀 Starting Nequi Credito Site...');
console.log(`📍 Port: ${port}`);

const serve = spawn('npx', ['serve', 'cloned-site', '-l', port, '-s'], {
  stdio: 'inherit',
  shell: true
});

serve.on('error', (error) => {
  console.error('❌ Error starting server:', error);
  process.exit(1);
});

serve.on('close', (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  serve.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  serve.kill('SIGINT');
});
