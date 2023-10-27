import {Request, Response} from "express";
import RecipeRepository from "../repository/recipe-repository";
import {Recipe} from "../model/recipe";

class RecipeController {
    private static instance: RecipeController;
    private recipeRepository : RecipeRepository;
    constructor() {
        this.recipeRepository = new RecipeRepository();
    }

    public static getInstance = () => {
        if (RecipeController.instance) {
            return RecipeController.instance;
        } else {
            RecipeController.instance = new RecipeController();
            return RecipeController.instance;
        }
    }

    private isRecipeGoodFormated = (recipe: Recipe) => {
        if (recipe.createdAt && recipe.name && recipe.description && recipe.ingredients && recipe.instructions && recipe.updatedAt) {
            return;
        }
        throw new Error("not recipe");
    }

    private isIdANumber = (id: number) => {
        if (isNaN(id) || id === undefined || id === null) {
            throw new Error("Id not a number")
        }
    }

    public getAllRecipes = (req: Request, res: Response) => {
        try {
            const recipes = this.recipeRepository.getAllRecipes();
            res.status(200).json({
                status: 200,
                message: "Recettes récupérées avec succès",
                data: recipes
            })
        } catch (e) {
            res.status(500).json({
                status: 500,
                message: "Une erreur est survenue lors de la récupération des données",
                data: []
            })
        }
    }

    public addRecipe = (req: Request, res: Response) => {
        try {
            const newRecipe : Recipe = req.body;
            this.isRecipeGoodFormated(newRecipe)
            const recipes = this.recipeRepository.addRecipe(newRecipe);
            res.status(201).json({
                status: 201,
                message: "Recette créée avec succès",
                data: recipes
            })
        } catch (e) {
            const error = e as Error;
            switch (error.message) {
                case "not recipe":
                    res.status(404).json({
                        status: 404,
                        message: "la recette envoyée n'est pas dans le format attendu",
                        data: []
                    })
                    break;
                default:
                    res.status(500).json({
                        status: 500,
                        message: "Une erreur est survenue lors de la récupération des données",
                        data: []
                    })
            }
        }
    }

    public getRecipeById = (req: Request, res: Response) => {
        try {
            const recipeId = parseInt(req.params["id"]);
            this.isIdANumber(recipeId);
            const recipe = this.recipeRepository.getRecipeById(recipeId);
            res.status(200).json({
                status: 200,
                message: "Recette récupérée avec succès",
                data: recipe
            })
        } catch (e) {
            const error = e as Error;
            switch (error.message) {
                case "Bad id":
                    res.status(404).json({
                        status: 404,
                        message: "L'id envoyé ne correspond à aucune recette",
                        data: []
                    })
                    break;
                case "Id not a number" :
                    res.status(404).json({
                        status: 404,
                        message: "L'id envoyé n'est pas dans le format attendu",
                        data: []
                    })
                    break;
                default:
                    res.status(500).json({
                        status: 500,
                        message: "Une erreur est survenue lors de la récupération des données",
                        data: []
                    })
            }
        }

    }

    public updateRecipeById = (req: Request, res: Response) => {
        try {
            const recipeId = parseInt(req.params["id"]);
            const newRecipe : Recipe = req.body;
            this.isIdANumber(recipeId);
            this.isRecipeGoodFormated(newRecipe)
            const recipes = this.recipeRepository.updateRecipeById(recipeId, newRecipe);
        } catch (e) {
            const error = e as Error;
            switch (error.message) {
                case "Bad id":
                    res.status(404).json({
                        status: 404,
                        message: "L'id envoyé ne correspond à aucune recette",
                        data: []
                    })
                    break;
                case "not recipe":
                    res.status(404).json({
                        status: 404,
                        message: "la recette envoyée n'est pas dans le format attendu",
                        data: []
                    })
                    break;
                case "Id not a number" :
                    res.status(404).json({
                        status: 404,
                        message: "L'id envoyé n'est pas dans le format attendu",
                        data: []
                    })
                    break;
                default:
                    res.status(500).json({
                        status: 500,
                        message: "Une erreur est survenue lors de la récupération des données",
                        data: []
                    })
            }
        }

    }

    public deleteRecipeById = (req: Request, res: Response) => {
        try {
            const recipeId = parseInt(req.params["id"]);
            this.isIdANumber(recipeId);
            const recipes = this.recipeRepository.deleteRecipeById(recipeId);
            res.status(200).json({
                status: 200,
                message: "Recette supprimée avec succès",
                data: recipes
            })
        } catch (e) {
            const error = e as Error;
            switch (error.message) {
                case "Bad id":
                    res.status(404).json({
                        status: 404,
                        message: "L'id envoyé ne correspond à aucune recette",
                        data: []
                    })
                    break;
                case "Id not a number" :
                    res.status(404).json({
                        status: 404,
                        message: "L'id envoyé n'est pas dans le format attendu",
                        data: []
                    })
                    break;
                default:
                    res.status(500).json({
                        status: 500,
                        message: "Une erreur est survenue lors de la récupération des données",
                        data: []
                    })
            }
        }

    }
}

export default RecipeController;
