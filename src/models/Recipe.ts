import { Protein } from "./enums/Protein";
import { RecipeType } from "./enums/RecipeType";
import { Difficulty } from "./enums/Difficulty";
import { CookingMethod } from "./enums/CookingMethod";
import { TempratureUnit } from "./enums/TempratureUnit";
import { RecipeIngredient } from "./RecipeIngredient";
import { getNow } from "../resources/Shared";

export class Recipe 
{
    id: String;
    date: String;
    title: String;
    cost: Number;
    total_cost: Number;
    type: RecipeType;
    // cuisine: Cuisine; // ? cuisine/oregin (mexican, european, asian)
    difficulty: Difficulty; 
    rating: Number;
    portions: Number;
    time_preparation: Number;
    time_total: Number;
    cooking_method: CookingMethod;
    cooking_method_temprature: Number;
    cooking_method_temprature_unit: TempratureUnit;
    main_protein: Protein;
    recipe_ingredients:Array<RecipeIngredient>;
    instructions:Array<String>;
    notes:Array<String>;

    constructor(id: String,
      title: String,
      type: RecipeType, 
      difficulty: Difficulty, 
      rating: Number,
      portions: Number,
      time_preparation: Number,
      time_total: Number,
      cooking_method: CookingMethod,
      cooking_method_temprature: Number,
      cooking_method_temprature_unit: TempratureUnit,
      main_protein: Protein,
      recipe_ingredients: Array<RecipeIngredient> = [],
      instructions: Array<String> = [],
      notes: Array<String> = []
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
      this.cooking_method_temprature_unit = cooking_method_temprature_unit;
      this.main_protein = main_protein;
      this.recipe_ingredients = recipe_ingredients;
      this.instructions = instructions;
      this.notes = notes;

      this.date = getNow(true);
      this.cost = this.calculateCost();
      this.total_cost = this.calculateTotalCost();
    }

    // TODO
    private calculateCost(): Number
    {
      if(this.recipe_ingredients.length === 0)
        return 0;
      else
        return 0;
    }

    private calculateTotalCost(): Number
    {
      if(this.recipe_ingredients.length === 0)
        return 0;
      else
        return 0;
    }

  }