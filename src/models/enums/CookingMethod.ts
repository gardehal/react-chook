import { ENUM_OTHER, ENUM_BAKE, ENUM_ROAST, ENUM_FRY, ENUM_DEEPFRY, 
    ENUM_BOIL, ENUM_SOUSVIDE, ENUM_GRILL, ENUM_STEAM,
} from "../../resources/language";

export enum CookingMethod
{
    OTHER,
    BAKE,
    ROAST,
    FRY,
    DEEPFRY,
    BOIL,
    SOUSVIDE,
    GRILL,
    STEAM,
};

export const CookingMethodDisplay: { [index: number]: string } = {};
CookingMethodDisplay[CookingMethod.OTHER] = ENUM_OTHER;
CookingMethodDisplay[CookingMethod.BAKE] = ENUM_BAKE;
CookingMethodDisplay[CookingMethod.ROAST] = ENUM_ROAST;
CookingMethodDisplay[CookingMethod.FRY] = ENUM_FRY;
CookingMethodDisplay[CookingMethod.DEEPFRY] = ENUM_DEEPFRY;
CookingMethodDisplay[CookingMethod.BOIL] = ENUM_BOIL;
CookingMethodDisplay[CookingMethod.SOUSVIDE] = ENUM_SOUSVIDE;
CookingMethodDisplay[CookingMethod.GRILL] = ENUM_GRILL;
CookingMethodDisplay[CookingMethod.STEAM] = ENUM_STEAM;

export const CookingMethodValue = (text: String) =>
{
	if(!text)
		return null;
	switch(text.toLowerCase())
	{
		case "0":
		case "OTHER".toLowerCase():
		case ENUM_OTHER.toLowerCase():
			return CookingMethod[CookingMethod.OTHER];
		case "1":
		case "BAKE".toLowerCase():
		case ENUM_BAKE.toLowerCase():
			return CookingMethod[CookingMethod.BAKE];
		case "2":
		case "ROAST".toLowerCase():
		case ENUM_ROAST.toLowerCase():
			return CookingMethod[CookingMethod.ROAST];
		case "3":
		case "FRY".toLowerCase():
		case ENUM_FRY.toLowerCase():
			return CookingMethod[CookingMethod.FRY];
		case "4":
		case "DEEPFRY".toLowerCase():
		case ENUM_DEEPFRY.toLowerCase():
			return CookingMethod[CookingMethod.DEEPFRY];
		case "5":
		case "BOIL".toLowerCase():
		case ENUM_BOIL.toLowerCase():
			return CookingMethod[CookingMethod.BOIL];
		case "6":
		case "SOUSVIDE".toLowerCase():
		case ENUM_SOUSVIDE.toLowerCase():
			return CookingMethod[CookingMethod.SOUSVIDE];
		case "7":
		case "GRILL".toLowerCase():
		case ENUM_GRILL.toLowerCase():
			return CookingMethod[CookingMethod.GRILL];
		case "8":
		case "STEAM".toLowerCase():
		case ENUM_STEAM.toLowerCase():
			return CookingMethod[CookingMethod.STEAM];
		default:
			return null;
	}
};

export const CookingMethodList = (translated: Boolean = false, join: Boolean = true, delim: string = ", ") =>
{
	let keys = Object.keys(CookingMethod).filter(k => !Number.parseInt(k) && k != "0");
	let res: Array<String> = [];

	if(translated)
		for (const key in keys)
			res.push(CookingMethodDisplay[key]);
	else
		for (const key in keys)
			res.push(CookingMethod[key]);

	if(join)
		return res.join(delim);

	return res; 
};