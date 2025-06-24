import app from './app.js';
import open from 'open';

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await open(`http://localhost:${PORT}/api-docs`);
});
