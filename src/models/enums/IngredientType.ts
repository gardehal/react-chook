
import { ENUM_OTHER, ENUM_MEAT, ENUM_FISH, ENUM_FOWL, ENUM_VEGETABLE, ENUM_SAUCE, ENUM_CONDIMENT, ENUM_BAKEDGOOD, ENUM_PASTRY, 
    ENUM_VINEGAR, ENUM_FRUIT, ENUM_HERB, ENUM_SPICE, ENUM_PASTA, ENUM_DAIRY, ENUM_EGG, ENUM_HONEY, ENUM_OIL, ENUM_CANDY, 
    ENUM_SEED, ENUM_NUT, ENUM_DRINK, } from "../../resources/language";

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

export const IngredientTypeDisplay: { [index: number]: string } = {};
IngredientTypeDisplay[IngredientType.OTHER] = ENUM_OTHER;
IngredientTypeDisplay[IngredientType.MEAT] = ENUM_MEAT;
IngredientTypeDisplay[IngredientType.FISH] = ENUM_FISH;
IngredientTypeDisplay[IngredientType.FOWL] = ENUM_FOWL;
IngredientTypeDisplay[IngredientType.VEGETABLE] = ENUM_VEGETABLE;
IngredientTypeDisplay[IngredientType.SAUCE] = ENUM_SAUCE;
IngredientTypeDisplay[IngredientType.CONDIMENT] = ENUM_CONDIMENT;
IngredientTypeDisplay[IngredientType.BAKEDGOOD] = ENUM_BAKEDGOOD;
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

export const IngredientTypeValue = (text: String) =>
{
	switch(text.toLowerCase())
	{
		case "0":
		case "OTHER".toLowerCase():
		case ENUM_OTHER.toLowerCase():
			return IngredientType[IngredientType.OTHER];
		case "1":
		case "MEAT".toLowerCase():
		case ENUM_MEAT.toLowerCase():
			return IngredientType[IngredientType.MEAT];
		case "2":
		case "FISH".toLowerCase():
		case ENUM_FISH.toLowerCase():
			return IngredientType[IngredientType.FISH];
		case "3":
		case "FOWL".toLowerCase():
		case ENUM_FOWL.toLowerCase():
			return IngredientType[IngredientType.FOWL];
		case "4":
		case "VEGETABLE".toLowerCase():
		case ENUM_VEGETABLE.toLowerCase():
			return IngredientType[IngredientType.VEGETABLE];
		case "5":
		case "SAUCE".toLowerCase():
		case ENUM_SAUCE.toLowerCase():
			return IngredientType[IngredientType.SAUCE];
		case "6":
		case "CONDIMENT".toLowerCase():
		case ENUM_CONDIMENT.toLowerCase():
			return IngredientType[IngredientType.CONDIMENT];
		case "7":
		case "BAKEDGOOD".toLowerCase():
		case ENUM_BAKEDGOOD.toLowerCase():
			return IngredientType[IngredientType.BAKEDGOOD];
		case "8":
		case "PASTRY".toLowerCase():
		case ENUM_PASTRY.toLowerCase():
			return IngredientType[IngredientType.PASTRY];
		case "9":
		case "VINEGAR".toLowerCase():
		case ENUM_VINEGAR.toLowerCase():
			return IngredientType[IngredientType.VINEGAR];
		case "10":
		case "FRUIT".toLowerCase():
		case ENUM_FRUIT.toLowerCase():
			return IngredientType[IngredientType.FRUIT];
		case "11":
		case "HERB".toLowerCase():
		case ENUM_HERB.toLowerCase():
			return IngredientType[IngredientType.HERB];
		case "12":
		case "SPICE".toLowerCase():
		case ENUM_SPICE.toLowerCase():
			return IngredientType[IngredientType.SPICE];
		case "13":
		case "PASTA".toLowerCase():
		case ENUM_PASTA.toLowerCase():
			return IngredientType[IngredientType.PASTA];
		case "14":
		case "DAIRY".toLowerCase():
		case ENUM_DAIRY.toLowerCase():
			return IngredientType[IngredientType.DAIRY];
		case "15":
		case "EGG".toLowerCase():
		case ENUM_EGG.toLowerCase():
			return IngredientType[IngredientType.EGG];
		case "16":
		case "HONEY".toLowerCase():
		case ENUM_HONEY.toLowerCase():
			return IngredientType[IngredientType.HONEY];
		case "17":
		case "OIL".toLowerCase():
		case ENUM_OIL.toLowerCase():
			return IngredientType[IngredientType.OIL];
		case "18":
		case "CANDY".toLowerCase():
		case ENUM_CANDY.toLowerCase():
			return IngredientType[IngredientType.CANDY];
		case "19":
		case "SEED".toLowerCase():
		case ENUM_SEED.toLowerCase():
			return IngredientType[IngredientType.SEED];
		case "20":
		case "NUT".toLowerCase():
		case ENUM_NUT.toLowerCase():
			return IngredientType[IngredientType.NUT];
		case "21":
		case "DRINK".toLowerCase():
		case ENUM_DRINK.toLowerCase():
			return IngredientType[IngredientType.DRINK];
		default:
			return text;
	}
};

export const IngredientTypeList = (translated: Boolean = false, join: Boolean = true, delim: string = ", ") =>
{
	let keys = Object.keys(IngredientType).filter(k => !Number.parseInt(k) && k != "0");
	let res: Array<String> = [];

	if(translated)
		for (const key in keys)
			res.push(IngredientTypeDisplay[key]);
	else
		for (const key in keys)
			res.push(IngredientType[key]);

	if(join)
		return res.join(delim);

	return res; 
};