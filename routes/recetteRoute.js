import { Router } from 'express';
import { createRecipe, getAllRecipes, updateRecipe, deleteRecipe } from '../controllers/recetteController.js';
import authMiddleware from '../middlewares/auth.js';

const router = Router();

// Middleware pour vérifier l'authentification
router.use(authMiddleware);

// Créer une recette
router.post('/', createRecipe);

// Lire toutes les recettes
router.get('/', getAllRecipes);

// Mettre à jour une recette
router.put('/:id', updateRecipe);

// Supprimer une recette
router.delete('/:id', deleteRecipe);

export default router;

