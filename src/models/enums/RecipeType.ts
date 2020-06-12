import { ENUM_OTHER, ENUM_MAIN_DISH, ENUM_SIDE_DISH, ENUM_BREAKFAST, ENUM_APPETIZER, ENUM_DESSERT, ENUM_PASTRY, ENUM_SALAD, ENUM_DRINK, ENUM_SPICE 
} from "../../resources/language";

export enum RecipeType
{
    OTHER,
    MAIN_DISH,
    SIDE_DISH,
    BREAKFAST,
    APPETIZER,
    DESSERT,
    PASTRY,
    SALAD,
    DRINK,
    SPICE,
};

export let RecipeTypeDisplay: { [index: number]: string } = {};
RecipeTypeDisplay[RecipeType.OTHER] = ENUM_OTHER;
RecipeTypeDisplay[RecipeType.MAIN_DISH] = ENUM_MAIN_DISH;
RecipeTypeDisplay[RecipeType.SIDE_DISH] = ENUM_SIDE_DISH;
RecipeTypeDisplay[RecipeType.BREAKFAST] = ENUM_BREAKFAST;
RecipeTypeDisplay[RecipeType.APPETIZER] = ENUM_APPETIZER;
RecipeTypeDisplay[RecipeType.DESSERT] = ENUM_DESSERT;
RecipeTypeDisplay[RecipeType.PASTRY] = ENUM_PASTRY;
RecipeTypeDisplay[RecipeType.SALAD] = ENUM_SALAD;
RecipeTypeDisplay[RecipeType.DRINK] = ENUM_DRINK;
RecipeTypeDisplay[RecipeType.SPICE] = ENUM_SPICE;