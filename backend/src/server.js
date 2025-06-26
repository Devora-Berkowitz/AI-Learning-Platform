import app from './app.js';
import open from 'open';

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Server running on port ${PORT}`);
  if (process.env.NODE_ENV !== 'production') {
    await open(`http://localhost:${PORT}/api-docs`);
  }
});
