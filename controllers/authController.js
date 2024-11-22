import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Inscription
export const registerUser = async (req, res) => {
    const { nom, email, password } = req.body || {};

    // Vérifiez que tous les champs sont fournis
    if (!nom || !email || !password) {
        return res.status(400).json({ error: 'Nom, email et mot de passe sont requis.' });
    }

    try {
        // Vérifiez si l'utilisateur existe déjà
        const existingUser = await prisma.utilisateur.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(409).json({ error: 'L\'utilisateur existe déjà.' });
        }

        // Hachage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Création de l'utilisateur
        const user = await prisma.utilisateur.create({
            data: { nom, email, mot_de_passe: hashedPassword },
        });

        // Stockage de l'ID utilisateur dans la session
        req.session.userId = user.Id_User;
        res.status(201).json({ message: 'Utilisateur enregistré avec succès', user });
    } catch (error) {
        console.error(error); // Affichez l'erreur dans la console
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement de l\'utilisateur.' });
    }
};

// Connexion
export const loginUser = async (req, res) => {
    const { email, password } = req.body || {};

    // Vérifiez que les champs email et mot de passe sont fournis
    if (!email || !password) {
        return res.status(400).json({ error: 'Email et mot de passe sont requis.' });
    }

    try {
        const user = await prisma.utilisateur.findUnique({
            where: { email },
        });

        // Vérifiez si l'utilisateur existe et comparez le mot de passe
        if (user && (await bcrypt.compare(password, user.mot_de_passe))) {
            req.session.userId = user.Id_User;
            res.status(200).json({ message: 'Connexion réussie' });
        } else {
            res.status(401).json({ error: 'Identifiants invalides' });
        }
    } catch (error) {
        console.error(error); // Affichez l'erreur dans la console pour le débogage
        res.status(500).json({ error: 'Erreur lors de la tentative de connexion' });
    }
};

// Déconnexion
export const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err); // Affichez l'erreur dans la console pour le débogage
            return res.status(500).json({ error: 'Erreur lors de la déconnexion' });
        }
        res.status(200).json({ message: 'Déconnecté avec succès' });
    });
};

