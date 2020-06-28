import { IngredientType } from "./enums/IngredientType";
import { getNow } from "../resources/Shared";
import { getUsername } from "../actions/UserActions";

export class Ingredient 
{
    id: String;
    name: String;
    type: IngredientType;
    price: Number;

    common: Boolean;
    calories: Number;
    protein: Number;
    carbohydrates: Number;
    sugar: Number;
    fat: Number;
    saturated_fat: Number;

    regby: String;
    regtime: String;

    constructor(id: String, 
      name: String, 
      type: IngredientType, 
      price: Number, 
      common: Boolean = false, 
      calories: Number = 0,
      protein: Number = 0, 
      carbohydrates: Number = 0, 
      sugar: Number = 0, 
      fat: Number = 0, 
      saturated_fat: Number = 0) 
    {
      this.id = id;
      this.name = name;
      this.type = type;
      this.price = price;

      this.common = common;
      this.calories = calories;
      this.protein = protein;
      this.carbohydrates = carbohydrates;
      this.sugar = sugar;
      this.fat = fat;
      this.saturated_fat = saturated_fat;

      this.regby = getUsername();
      this.regtime = getNow(true);
    }
  }