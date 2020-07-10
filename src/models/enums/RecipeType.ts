import { ENUM_OTHER, ENUM_MAIN_DISH, ENUM_SIDE_DISH, ENUM_BREAKFAST, ENUM_APPETIZER, 
	ENUM_DESSERT, ENUM_PASTRY, ENUM_SALAD, ENUM_DRINK, ENUM_SPICE,
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

export const RecipeTypeDisplay: { [index: number]: string } = {};
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

export const RecipeTypeValue = (text: String) =>
{
	if(!text)
		return null;
	switch(text.toLowerCase())
	{
		case "0":
		case "OTHER".toLowerCase():
		case ENUM_OTHER.toLowerCase():
			return RecipeType[RecipeType.OTHER];
		case "1":
		case "MAIN_DISH".toLowerCase():
		case ENUM_MAIN_DISH.toLowerCase():
			return RecipeType[RecipeType.MAIN_DISH];
		case "2":
		case "SIDE_DISH".toLowerCase():
		case ENUM_SIDE_DISH.toLowerCase():
			return RecipeType[RecipeType.SIDE_DISH];
		case "3":
		case "BREAKFAST".toLowerCase():
		case ENUM_BREAKFAST.toLowerCase():
			return RecipeType[RecipeType.BREAKFAST];
		case "4":
		case "APPETIZER".toLowerCase():
		case ENUM_APPETIZER.toLowerCase():
			return RecipeType[RecipeType.APPETIZER];
		case "5":
		case "DESSERT".toLowerCase():
		case ENUM_DESSERT.toLowerCase():
			return RecipeType[RecipeType.DESSERT];
		case "6":
		case "PASTRY".toLowerCase():
		case ENUM_PASTRY.toLowerCase():
			return RecipeType[RecipeType.PASTRY];
		case "7":
		case "SALAD".toLowerCase():
		case ENUM_SALAD.toLowerCase():
			return RecipeType[RecipeType.SALAD];
		case "8":
		case "DRINK".toLowerCase():
		case ENUM_DRINK.toLowerCase():
			return RecipeType[RecipeType.DRINK];
		case "9":
		case "SPICE".toLowerCase():
		case ENUM_SPICE.toLowerCase():
			return RecipeType[RecipeType.SPICE];
		default:
			return null;
	}
};

export const RecipeTypeList = (translated: Boolean = false, join: Boolean = true, delim: string = ", ") =>
{
	let keys = Object.keys(RecipeType).filter(k => !Number.parseInt(k) && k != "0");
	let res: Array<String> = [];

	if(translated)
		for (const key in keys) 
			res.push(RecipeTypeDisplay[key]);
	else
		for (const key in keys) 
			res.push(RecipeType[key]);

	if(join)
		return res.join(delim);

	return res; 
};

