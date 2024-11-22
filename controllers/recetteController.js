import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Créer une recette
export const createRecipe = async (req, res) => {
    const { titre, description, ingredients, etapes, image } = req.body;
    const userId = req.session.userId;
  
    try {
      // Vérifiez si l'utilisateur est authentifié
      if (!userId) {
        return res.status(401).json({ error: 'Utilisateur non authentifié' });
      }
  
      // Créer la recette
      const recipe = await prisma.recettes.create({
        data: {
          titre,
          description,
          ingredients, // JSON accepté
          etapes, // JSON accepté
          image,
          Id_User: userId,
        },
      });
  
      res.status(201).json(recipe);
    } catch (error) {
      console.error('Erreur lors de la création de la recette:', error);
      res.status(400).json({ error: 'Erreur lors de la création de la recette' });
    }
  };
  

// Lire toutes les recettes de l'utilisateur
export const getAllRecipes = async (req, res) => {
    const userId = req.session.userId;
  
    try {
      if (!userId) {
        return res.status(401).json({ error: 'Utilisateur non authentifié' });
      }
  
      const recipes = await prisma.recettes.findMany({
        where: { Id_User: userId },
      });
  
      res.status(200).json(recipes);
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
      res.status(500).json({ error: 'Erreur lors de la récupération des recettes' });
    }
  };
  

// Mettre à jour une recette
export const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { titre, description, ingredients, etapes, image } = req.body;
  
    try {
      const recipe = await prisma.recettes.update({
        where: { Id_Recettes: parseInt(id) },
        data: {
          titre,
          description,
          ingredients, // JSON accepté
          etapes, // JSON accepté
          image,
        },
      });
  
      res.status(200).json(recipe);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la recette:', error);
      res.status(400).json({ error: 'Erreur lors de la mise à jour de la recette' });
    }
  };
  

// Supprimer une recette
export const deleteRecipe = async (req, res) => {
    const { id } = req.params;
  
    try {
      await prisma.recettes.delete({
        where: { Id_Recettes: parseInt(id) },
      });
  
      res.status(204).send(); // Pas de contenu à retourner
    } catch (error) {
      console.error('Erreur lors de la suppression de la recette:', error);
      res.status(400).json({ error: 'Erreur lors de la suppression de la recette' });
    }
  };
  

