import app from './app.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = 3000;

    // Se connecter à la base de données avec Prisma
    const connectToDatabase = async () => {
        try {
            await prisma.$connect();
            console.log('Connexion à la base de données établie');
        } catch (error) {
            console.error('Erreur lors de la connexion à la base de donées:', error);
        }
    }

    connectToDatabase();

app.listen(PORT, () => {
  console.log(`le serveur tourne sur http://localhost:${PORT}`);
});


