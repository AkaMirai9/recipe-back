import express from 'express';
import RecipeController from "../controller/recipe-controller";

const router = express.Router();
const recipeController = new RecipeController()
router.get('/', recipeController.getAllRecipes);
router.post('/', recipeController.addRecipe);
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', recipeController.updateRecipeById);
router.delete('/:id', recipeController.deleteRecipeById);

export default router;
