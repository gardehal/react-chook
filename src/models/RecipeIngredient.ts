import { Ingredient } from "./Ingredient";
import { QuantityUnit } from "./enums/QuantityUnit";
import { Preparation } from "./enums/Preparation";

export class RecipeIngredient 
{
    quantity: Number;
    ingredient: Ingredient;
    quantity_unit?: QuantityUnit;
    preparation?: Preparation;

    constructor(quantity: Number, ingredient: Ingredient, quantityUnit?: QuantityUnit, preparation?: Preparation) 
    {
      this.quantity = quantity;
      this.ingredient = ingredient;
      this.quantity_unit = quantityUnit;
      this.preparation = preparation;
    }
  }