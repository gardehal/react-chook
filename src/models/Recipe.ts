import { Protein } from "./enums/Protein";
import { RecipeType } from "./enums/RecipeType";
import { Difficulty } from "./enums/Difficulty";
import { CookingMethod } from "./enums/CookingMethod";
import { TempratureUnit } from "./enums/TempratureUnit";
import { RecipeIngredient } from "./RecipeIngredient";
import { getNow } from "../resources/Shared";
import { getIngredientData } from "../actions/IngredientActions";
import { getUsername } from "../actions/UserActions";
import { getRecipeData, setRecipeData } from "../actions/RecipeActions";

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

    public async upload(recipe: Recipe)
    {
      console.log("\nUploading: " + recipe.title);

      if(recipe.title === undefined)
          return null;

      let byNameData = await getRecipeData("title", recipe.title.toString());
      if(byNameData !== undefined && byNameData.length !== 0)
          return null;

      let byIdData = await getRecipeData("id", recipe.id.toString());
      if(byIdData !== undefined && byIdData.length !== 0)
          return null;
      
      console.log("Item ok, will upload async:");

      recipe = await this.setNutritionalAndCostAndSource(recipe);
      console.log(recipe);
      setRecipeData(recipe);

      return recipe;
    }

    public async setNutritionalAndCostAndSource(recipe: Recipe, source_id: String = "")
    { 
      let nutritionInfo = await this.setNutrientInfo(recipe); 
      if(nutritionInfo)
        recipe = nutritionInfo;

      recipe.cost = await this.calculateCost(recipe, true); // Exclude common items like flour and salt to get a more accurate one-time purchase price
      recipe.total_cost = await this.calculateCost(recipe);

      recipe.source_id = source_id;

      return recipe;
    }

    private async setNutrientInfo(recipe: Recipe, propperties: Array<keyof Recipe> = [], keepDefaultPropperties: Boolean = true)
    {
      let r: any = recipe; // Needed to be able to use propperty string as key (r[p])

      let ingredients = [];
      let nutritionPropperties: Array<string> = ["calories", "protein", "carbohydrates", "sugar", "fat", "saturated_fat"];
      
      if(propperties.length === 0 && !keepDefaultPropperties)
        return null;

      if(!keepDefaultPropperties)
        nutritionPropperties = propperties;
      else if(propperties.length > 0)
        nutritionPropperties = nutritionPropperties.concat(propperties);

      for (const i in r.recipe_ingredients) 
      {
        let dbIngredients = await getIngredientData("id", r.recipe_ingredients[i].id.toString(), 1);
        ingredients.push(dbIngredients[0]);
      }

      for (const iIndex in ingredients) 
      {
        for (const pindex in nutritionPropperties) 
        {
          let i = ingredients[iIndex];
          let p: string = nutritionPropperties[pindex];

          console.log("Propperty " + iIndex + " " + pindex);

          if(i[p] && i[p].length > 0)
            if(i.quantity_in_gram && i.quantity_in_gram.length > 0 && i.quantity_in_gram > 0)
            r[p] += i.quantity_in_gram * (parseFloat(i[p].match(/\d+[.|,]?\d*/gmi)) / 100); // Regex on numbers in case of "123 g". Devide nutri-info by 100 because it is measured per 100ml/g
        }
      }

      return r;
    }

    // TODO
    // More efficient to load all ingredients first rather that fetch for every calc nutrients and cost
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

      return Number(cost.toFixed(2));
    }
  }