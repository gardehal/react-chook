import { Protein } from "./enums/Protein";
import { RecipeType } from "./enums/RecipeType";
import { Difficulty } from "./enums/Difficulty";
import { CookingMethod } from "./enums/CookingMethod";
import { TempratureUnit } from "./enums/TempratureUnit";
import { RecipeIngredient } from "./RecipeIngredient";
import { getNow } from "../resources/Shared";
import { getIngredientData } from "../actions/IngredientActions";
import { Source } from "./Source";
import { getUsername } from "../actions/UserActions";

export class Recipe 
{
    id: String;
    // source_id: String;
    // calories: Number;
    // protein: Number;
    // carbohydrates: Number;
    // sugar: Number;
    // fat: Number;
    // saturated_fat: Number;
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
      rating: Number = 0,
      portions: Number = 0,
      time_preparation: Number,
      time_total: Number,
      cooking_method: CookingMethod = CookingMethod.OTHER,
      cooking_method_temprature: Number = 0,
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
      this.cooking_method_temprature_unit = cooking_method_temprature_unit;
      this.main_protein = main_protein;
      this.recipe_ingredients = recipe_ingredients;
      this.sub_recipes = sub_recipes;
      this.instructions = instructions;
      this.notes = notes;
      this.comments = comments;

      // this.source_id = source_id;
      // this.calories = Number(this.calculateX("calories"));
      // this.protein = x
      // this.carbohydrates = x
      // this.sugar = x
      // this.fat = x
      // this.saturated_fat = x
      this.cost = Number(this.calculateCost(true));
      this.total_cost = Number(this.calculateCost());

      this.regby = getUsername();
      this.regtime = getNow(true);
      this.modby = getUsername();
      this.modtime = getNow(true);
    }

    private async calculateX(type: String)
    {
      // TODO
    }

    private async calculateCost(excludeCommon = false)
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

      return cost;
    }
  }