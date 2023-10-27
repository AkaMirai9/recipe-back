import {Recipe} from "../model/recipe";
import {mockedRecipes} from "../model/const/mocked-recipes";

class RecipeRepository {
    private recipes : Recipe[]

    constructor() {
        this.recipes = mockedRecipes;
    }

    public getAllRecipes = () => {
        return this.recipes;
    }

    public addRecipe = (newRecipe: Recipe) => {
        this.recipes.push(newRecipe);
        return this.recipes;
    }

    public getRecipeById = (recipeId: number) => {
        const recipe = this.recipes.find((recipe) => recipe.id === recipeId)

        if (recipe) {
            return recipe
        }

        throw new Error("Bad id");
    }

    public updateRecipeById = (recipeId: number, updatedRecipe: Recipe) => {
        const index = this.recipes.findIndex((recipe) => recipe.id === recipeId);

        if (index !== -1) {
            this.recipes[index] = updatedRecipe;
            return this.recipes;
        }

        throw new Error("Bad id");
    }

    public deleteRecipeById = (recipeId: number) => {
        const updatedRecipeList =  this.recipes.filter((recipe) => recipe.id !== recipeId)

        if (updatedRecipeList.length >= this.recipes.length) {
            throw new Error("Bad id");
        }
        this.recipes = updatedRecipeList;
        return this.recipes;
    }
}

export default RecipeRepository;
