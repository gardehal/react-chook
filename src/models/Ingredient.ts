import { IngredientType } from "./enums/IngredientType";
import { getNow } from "../resources/Shared";
import { getUsername } from "../actions/UserActions";

export class Ingredient 
{
    id: String;
    name: String;
    type: IngredientType;
    price: Number;

    is_commodity: Boolean;
    calories_kcal: Number;
    protein_gram: Number;
    carbohydrates_gram: Number;
    sugar_gram: Number;
    fat_gram: Number;
    saturated_fat_gram: Number;
    salt_gram: Number;

    original_name: String;
    source_link: String 
    regby: String;
    regtime: String;

    constructor(id: String, 
      name: String, 
      type: IngredientType, 
      price: Number, 
      is_commodity: Boolean = false, 
      calories_kcal: Number = 0,
      protein_gram: Number = 0, 
      carbohydrates_gram: Number = 0, 
      sugar_gram: Number = 0, 
      fat_gram: Number = 0, 
      saturated_fat_gram: Number = 0,
      salt_gram: Number = 0,

      original_name: String = "",
      source_link: String = "") 
    {
      this.id = id;
      this.name = name.toLowerCase();
      this.type = type;
      this.price = price;

      this.is_commodity = is_commodity;
      this.calories_kcal = calories_kcal;
      this.protein_gram = protein_gram;
      this.carbohydrates_gram = carbohydrates_gram;
      this.sugar_gram = sugar_gram;
      this.fat_gram = fat_gram;
      this.saturated_fat_gram = saturated_fat_gram;
      this.salt_gram = salt_gram;

      this.original_name = original_name;
      this.source_link = source_link;
      this.regby = getUsername();
      this.regtime = getNow(true);
    }
  }