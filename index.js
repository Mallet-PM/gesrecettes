import app from './app.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`le serveur tourne sur http://localhost:${PORT}`);
});
