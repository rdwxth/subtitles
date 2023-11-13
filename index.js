const { spawn } = require('child_process');

const child = spawn('node', ['--experimental-modules', 'index.mjs'], {
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code);
});
