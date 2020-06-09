
import { ENUM_OTHER, ENUM_MEAT, ENUM_FISH, ENUM_FOWL, ENUM_VEGETABLE, ENUM_SAUCE, ENUM_CONDIMENT, ENUM_BAKEDGOODS, ENUM_PASTRY, 
    ENUM_VINEGAR, ENUM_FRUIT, ENUM_HERB, ENUM_SPICE, ENUM_PASTA, ENUM_DAIRY, ENUM_EGG, ENUM_HONEY, ENUM_OIL, ENUM_CANDY, 
    ENUM_SEED, ENUM_NUT, ENUM_DRINK } from "../../resources/language";

export enum IngredientType
{
    OTHER,
    MEAT,
    FISH,
    FOWL,
    VEGETABLE,
    SAUCE,
    CONDIMENT,
    BAKEDGOOD,
    PASTRY,
    VINEGAR,
    FRUIT,
    HERB,
    SPICE,
    PASTA,
    DAIRY,
    EGG,
    HONEY,
    OIL,
    CANDY,
    SEED,
    NUT,
    DRINK,
};

export let IngredientTypeDisplay: { [index: number]: string } = {};
IngredientTypeDisplay[IngredientType.OTHER] = ENUM_OTHER;
IngredientTypeDisplay[IngredientType.MEAT] = ENUM_MEAT;
IngredientTypeDisplay[IngredientType.FISH] = ENUM_FISH;
IngredientTypeDisplay[IngredientType.FOWL] = ENUM_FOWL;
IngredientTypeDisplay[IngredientType.VEGETABLE] = ENUM_VEGETABLE;
IngredientTypeDisplay[IngredientType.SAUCE] = ENUM_SAUCE;
IngredientTypeDisplay[IngredientType.CONDIMENT] = ENUM_CONDIMENT;
IngredientTypeDisplay[IngredientType.BAKEDGOOD] = ENUM_BAKEDGOODS;
IngredientTypeDisplay[IngredientType.PASTRY] = ENUM_PASTRY;
IngredientTypeDisplay[IngredientType.VINEGAR] = ENUM_VINEGAR;
IngredientTypeDisplay[IngredientType.FRUIT] = ENUM_FRUIT;
IngredientTypeDisplay[IngredientType.HERB] = ENUM_HERB;
IngredientTypeDisplay[IngredientType.SPICE] = ENUM_SPICE;
IngredientTypeDisplay[IngredientType.PASTA] = ENUM_PASTA;
IngredientTypeDisplay[IngredientType.DAIRY] = ENUM_DAIRY;
IngredientTypeDisplay[IngredientType.EGG] = ENUM_EGG;
IngredientTypeDisplay[IngredientType.HONEY] = ENUM_HONEY;
IngredientTypeDisplay[IngredientType.OIL] = ENUM_OIL;
IngredientTypeDisplay[IngredientType.CANDY] = ENUM_CANDY;
IngredientTypeDisplay[IngredientType.SEED] = ENUM_SEED;
IngredientTypeDisplay[IngredientType.NUT] = ENUM_NUT;
IngredientTypeDisplay[IngredientType.DRINK] = ENUM_DRINK;