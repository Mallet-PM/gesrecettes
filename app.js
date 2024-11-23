import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';
import recetteRoutes from './routes/recetteRoute.js';

dotenv.config();

const app = express();

// Middleware global pour les requêtes CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Remplacez '*' par un domaine spécifique pour plus de sécurité
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Session
app.use(
    session({
      secret: process.env.SESSION_SECRET || "default_secret", 
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    })
  );

// Routes
app.use('/auth', authRoutes);
app.use('/recette', recetteRoutes);

 // Routes pour le rendu des pages
 app.get("/", (req, res) => {
    res.render("front.ejs"); });




export default app;
