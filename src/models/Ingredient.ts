import { IngredientType } from "./enums/IngredientType";
import { getNow } from "../resources/Shared";

export class Ingredient 
{
    id: String;
    date: String;
    name: String;
    type: IngredientType;
    price: Number;
    common: Boolean;

    constructor(id: String, name: String, type: IngredientType, price: Number, common: Boolean = false) 
    {
      this.id = id;
      this.date = getNow(true);
      this.name = name;
      this.type = type;
      this.price = price;
      this.common = common;
    }
  }