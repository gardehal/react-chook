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
    main_protein: Protein;
    cost: Number;
    total_cost: Number;
    title: String;
    type: RecipeType;
    // characteristics: Characteristics; // ? Soup, gulasj, solid?, salad, ...
    // Vegan: Boolean; // Can get from Protein
    difficulty: Difficulty; 
    rating: Number;
    portions: Number;
    time_preparation: Number;
    time_total: Number;
    cooking_method: CookingMethod;
    cooking_method_temprature: Number;
    cooking_method_temprature_unit: TempratureUnit;
    ingredients:Array<RecipeIngredient>;
    instructions:Array<String>;
    notes:Array<String>;

    constructor(id: String,
      main_protein: Protein,
      cost: Number,
      total_cost: Number,
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
      ingredients:Array<RecipeIngredient> = [],
      instructions:Array<String> = [],
      notes:Array<String> = []
      ) 
    {
      this.id = id;
      this.date = getNow(true);
      this.main_protein = main_protein;
      this.cost = cost;
      this.total_cost = total_cost;
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
      this.ingredients = ingredients;
      this.instructions = instructions;
      this.notes = notes;
    }
  }