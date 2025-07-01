import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('PORT is not defined. Railway requires process.env.PORT');
}

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server running on port ${PORT}`);

  if (process.env.NODE_ENV !== 'production') {
    try {
      const open = await import('open');
      await open.default(`http://localhost:${PORT}/api-docs`);
    } catch (err) {
      console.warn('open() skipped – not available in this environment');
    }
  }
});
