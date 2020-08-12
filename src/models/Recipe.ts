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
import store from "../store";
import { RECIPE_ERROR } from "../actions/types";

export class Recipe 
{
    id: String;
    source_id: String;
    calories_kcal: number;
    protein_gram: number;
    carbohydrates_gram: number;
    sugar_gram: number;
    fat_gram: number;
    saturated_fat_gram: number;
    salt_gram: number;
    title: String;
    estimated_price: number;
    total_price: number;
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
    recipe_ingredients: Array<RecipeIngredient>;
    sub_recipes: Array<Recipe>;
    instructions: Array<String>;
    notes: Array<String>;
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
      this.calories_kcal = 0;
      this.protein_gram = 0;
      this.carbohydrates_gram = 0;
      this.sugar_gram = 0;
      this.fat_gram = 0;
      this.saturated_fat_gram = 0;
      this.salt_gram = 0;
      this.estimated_price = 0;
      this.total_price = 0;

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
      if(byNameData.length !== 0)
      {
        store.dispatch({ type: RECIPE_ERROR})
        console.log("Similar found in DB by title: " + recipe.title);
        return null;
      }

      let byIdData = await getRecipeData("id", recipe.id.toString());
      if(byIdData.length !== 0)
      {
        store.dispatch({ type: RECIPE_ERROR})
        console.log("Similar found in DB by id: " + recipe.title + " " + recipe.id);
        return null;
      }
      
      console.log("Item ok, will upload async:");
      recipe = await this.setNutritionalAndPrice(recipe);
      console.log(recipe);
      setRecipeData(recipe);

      return recipe;
    }

    public async setNutritionalAndPrice(recipe: Recipe)
    { 
      let updated = await this.setSecondaryInfo(recipe); 
      if(updated)
        recipe = updated;

      return recipe;
    }

    private async getIngredients(recipe: Recipe)
    {
      let ingredients = [];
      let ri = recipe.recipe_ingredients;
      for (const i in recipe.recipe_ingredients) 
      {
        if(ri[i].isRecipe)
        {
          let dbRecipes = await getRecipeData("id", ri[i].id.toString(), 1);
          ingredients.push(dbRecipes[0]);
        }
        else
        {
          let dbIngredients = await getIngredientData("id", ri[i].id.toString(), 1);
          ingredients.push(dbIngredients[0]);
        }
      }
      return ingredients;
    }

    async setSecondaryInfo(recipe: Recipe, propperties: Array<keyof Recipe> = [], keepDefaultPropperties: Boolean = true)
    {
      let props: Array<string> = ["price", "calories_kcal", "protein_gram", "carbohydrates_gram", "sugar_gram", "fat_gram", "saturated_fat_gram", "salt_gram"];
      
      if(propperties.length === 0 && !keepDefaultPropperties)
        return null;

      if(!keepDefaultPropperties)
        props = propperties;
      else if(propperties.length > 0)
        props = props.concat(propperties);

      let r: any = recipe; // Needed to be able to use propperty string as key (r[p])
      let ingredients = await this.getIngredients(recipe);

      for (const iIndex in ingredients) 
      {
        for (const pindex in props) 
        {
          let i = ingredients[iIndex];
          let p = props[pindex];
          // console.log(i.name + " " + p + " " + i[p]);

          if((i[p] !== undefined || i[p] !== null) && i[p].toString().length > 0)
          {
            if(p == "price")
            {
              r.total_price = parseFloat(parseFloat(r.total_price + parseFloat(i[p])).toFixed(2));
              if(!i.is_commodity) // Exclude is_commodity items/household commodity (salt, pepper, flour, ...) from price to get a more realistic one-time price
                r.estimated_price = parseFloat(parseFloat(r.estimated_price + parseFloat(i[p])).toFixed(2));
            }
            else
              if(r.recipe_ingredients[iIndex].quantity_in_gram && r.recipe_ingredients[iIndex].quantity_in_gram > 0)
                r[p] += r.recipe_ingredients[iIndex].quantity_in_gram * (parseFloat(i[p].toString().match(/\d+[.|,]?\d*/gmi)) / 100); // Regex on numbers in case of "123 g". Devide nutri-info by 100 because it is measured per 100ml/g
              else
                r[p] += parseFloat(i[p].toString().match(/\d+[.|,]?\d*/gmi));
          }
        }
      }

      return r;
    }
  }