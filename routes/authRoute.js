import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js';

const router = Router();

// Inscription
router.post('/register', registerUser);

// Connexion
router.post('/login', loginUser);

// Déconnexion
router.post('/logout', logoutUser);

export default router;

