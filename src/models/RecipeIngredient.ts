import { QuantityUnit } from "./enums/QuantityUnit";
import { Preparation } from "./enums/Preparation";
import { convertQuantityUnits } from "../resources/Shared";

export class RecipeIngredient 
{
    // TODO quantity can be null or unspecified, should not default to 1 or 0: "salt" "pepper", "oil"
    id: String;
    quantity: Number;
    name: String;
    quantity_unit?: QuantityUnit;
    preparation?: Preparation;
    isRecipe: Boolean;

    quantity_in_gram: Number;

    constructor(id: String, quantity: Number, name: String, quantityUnit?: QuantityUnit, preparation?: Preparation, isRecipe: Boolean = false) 
    {
      this.id = id;
      this.quantity = quantity;
      this.name = name;
      this.quantity_unit = quantityUnit;
      this.preparation = preparation;
      this.isRecipe = isRecipe;

      this.quantity_in_gram = convertQuantityUnits(quantity, quantityUnit, QuantityUnit.G) ?? 0;
    }
  }