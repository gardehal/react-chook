import { Protein } from "./enums/Protein";
import { RecipeType } from "./enums/RecipeType";
import { Difficulty } from "./enums/Difficulty";
import { CookingMethod } from "./enums/CookingMethod";
import { TempratureUnit } from "./enums/TempratureUnit";
import { RecipeIngredient } from "./RecipeIngredient";
import { getNow } from "../resources/Shared";
import { getIngredientData } from "../actions/IngredientActions";
import { getUsername } from "../actions/UserActions";

export class Recipe 
{
    id: String;
    source_id: String;
    calories: number;
    protein: number;
    carbohydrates: number;
    sugar: number;
    fat: number;
    saturated_fat: number;
    title: String;
    cost: number;
    total_cost: number;
    type: RecipeType;
    // cuisine: Cuisine; // ? cuisine/oregin (mexican, european, asian)
    difficulty: Difficulty; 
    rating: number;
    portions: number;
    time_preparation: number;
    time_total: number;
    cooking_method: CookingMethod;
    cooking_method_temprature: number;
    cooking_method_temprature_unit: TempratureUnit;
    main_protein: Protein;
    recipe_ingredients:Array<RecipeIngredient>;
    sub_recipes:Array<Recipe>;
    instructions:Array<String>;
    notes:Array<String>;
    comments: String;
    regby: String;
    regtime: String;
    modby: String;
    modtime: String;

    constructor(id: String,
      // source_id: String,
      title: String,
      type: RecipeType = RecipeType.OTHER, 
      difficulty: Difficulty = Difficulty.NONE, 
      rating: number = 0,
      portions: number = 0,
      time_preparation: number,
      time_total: number,
      cooking_method: CookingMethod = CookingMethod.OTHER,
      cooking_method_temprature: number = 0,
      cooking_method_temprature_unit: TempratureUnit = TempratureUnit.NONE,
      main_protein: Protein,
      recipe_ingredients: Array<RecipeIngredient> = [],
      sub_recipes:Array<Recipe> = [], 
      instructions: Array<String> = [],
      notes: Array<String> = [],
      comments: String = ""
      ) 
    {
      this.id = id;
      this.title = title;
      this.type = type;
      this.difficulty = difficulty;
      this.rating = rating;
      this.portions = portions;
      this.time_preparation = time_preparation;
      this.time_total = time_total;
      this.cooking_method = cooking_method;
      this.cooking_method_temprature = cooking_method_temprature;
      this.cooking_method_temprature_unit = cooking_method_temprature_unit; // TODO If not C, convert to C
      this.main_protein = main_protein;
      this.recipe_ingredients = recipe_ingredients;
      this.sub_recipes = sub_recipes;
      this.instructions = instructions;
      this.notes = notes;
      this.comments = comments;

      this.source_id = "";
      this.calories = 0;
      this.protein = 0;
      this.carbohydrates = 0;
      this.sugar = 0;
      this.fat = 0;
      this.saturated_fat = 0;
      this.cost = 0;
      this.total_cost = 0;

      this.regby = getUsername();
      this.regtime = getNow(true);
      this.modby = getUsername();
      this.modtime = getNow(true);
    }

    // More efficient to load all ingredients first rather that fetch for every calc nutrients and cost
    public async setNutritionalAndCostAndSource(recipe: Recipe, source_id: String = "")
    {
      recipe.calories = await this.calculateNutrientInfo(recipe, "calories");
      // TODO await xyz
      return recipe;
    }

    private async calculateNutrientInfo(recipe: Recipe, propperty: any)
    {
      let res: number = 0;
      const ri = recipe.recipe_ingredients;
      if(ri.length > 0)
      {
        for (let i = 0; i < ri.length; i++)
        {
          let ingredient = await getIngredientData("id", ri[i].id.toString(), 1);
          ingredient = ingredient[0];

          if(ingredient[propperty])
            res += Number(ingredient[propperty].match(/\d+/gmi)); // Regex on numbers in case of "123 g"
        }
      }

      return Number(res);
    }

    private async calculateCost(recipe: Recipe, excludeCommon = false)
    {
      let cost: Number = 0;
      const ri = this.recipe_ingredients;
      if(ri.length > 0)
      {
        for (let i = 0; i < ri.length; i++)
        {
          let ingredient = await getIngredientData("id", ri[i].id.toString(), 1);
          if(excludeCommon && !ingredient[0].common) // ingredient[0] because getIngredientData() returns array
            cost += ingredient[0].price;
          else
            cost += ingredient[0].price;
        }
      }

      return Number(cost);
    }
  }