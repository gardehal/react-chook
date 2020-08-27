import { ENUM_NONE, ENUM_OTHER, ENUM_WHOLE, ENUM_CHOPPED, ENUM_MINCED, ENUM_QUBED, ENUM_QUARTERED,
    ENUM_HALVED, ENUM_SLICED, ENUM_DRIED, ENUM_PITTED, ENUM_CORED, ENUM_GRATED, ENUM_MASHED,
    ENUM_CRUSHED, ENUM_PRESSED,
} from "../../resources/language";

export enum Preparation
{
    NONE,
    OTHER,
    WHOLE,
    CHOPPED,
    MINCED,
    QUBED,
    QUARTERED, 
    HALVED,
    SLICED,
    DRIED,
    PITTED,
    CORED,
    GRATED,
    MASHED,
    CRUSHED,
	PRESSED,
	// TODO Juiced, peeled, fresh 
};

export const PreparationDisplay: { [index: number]: string } = {};
PreparationDisplay[Preparation.NONE] = ENUM_NONE;
PreparationDisplay[Preparation.OTHER] = ENUM_OTHER;
PreparationDisplay[Preparation.WHOLE] = ENUM_WHOLE;
PreparationDisplay[Preparation.CHOPPED] = ENUM_CHOPPED;
PreparationDisplay[Preparation.MINCED] = ENUM_MINCED;
PreparationDisplay[Preparation.QUBED] = ENUM_QUBED;
PreparationDisplay[Preparation.QUARTERED] = ENUM_QUARTERED;
PreparationDisplay[Preparation.HALVED] = ENUM_HALVED;
PreparationDisplay[Preparation.SLICED] = ENUM_SLICED;
PreparationDisplay[Preparation.DRIED] = ENUM_DRIED;
PreparationDisplay[Preparation.PITTED] = ENUM_PITTED;
PreparationDisplay[Preparation.CORED] = ENUM_CORED;
PreparationDisplay[Preparation.GRATED] = ENUM_GRATED;
PreparationDisplay[Preparation.MASHED] = ENUM_MASHED;
PreparationDisplay[Preparation.CRUSHED] = ENUM_CRUSHED;
PreparationDisplay[Preparation.PRESSED] = ENUM_PRESSED;

export const PreparationValue = (text: String) =>
{
	if(!text)
		return null;
	switch(text.toLowerCase())
	{
		case "0":
		case "NONE".toLowerCase():
		case ENUM_NONE.toLowerCase():
			return Preparation[Preparation.NONE];
		case "1":
		case "OTHER".toLowerCase():
		case ENUM_OTHER.toLowerCase():
			return Preparation[Preparation.OTHER];
		case "2":
		case "WHOLE".toLowerCase():
		case ENUM_WHOLE.toLowerCase():
			return Preparation[Preparation.WHOLE];
		case "3":
		case "CHOPPED".toLowerCase():
		case ENUM_CHOPPED.toLowerCase():
			return Preparation[Preparation.CHOPPED];
		case "4":
		case "MINCED".toLowerCase():
		case ENUM_MINCED.toLowerCase():
			return Preparation[Preparation.MINCED];
		case "5":
		case "QUBED".toLowerCase():
		case ENUM_QUBED.toLowerCase():
			return Preparation[Preparation.QUBED];
		case "6":
		case "QUARTERED".toLowerCase():
		case ENUM_QUARTERED.toLowerCase():
			return Preparation[Preparation.QUARTERED];
		case "7":
		case "HALVED".toLowerCase():
		case ENUM_HALVED.toLowerCase():
			return Preparation[Preparation.HALVED];
		case "8":
		case "SLICED".toLowerCase():
		case ENUM_SLICED.toLowerCase():
			return Preparation[Preparation.SLICED];
		case "9":
		case "DRIED".toLowerCase():
		case ENUM_DRIED.toLowerCase():
			return Preparation[Preparation.DRIED];
		case "10":
		case "PITTED".toLowerCase():
		case ENUM_PITTED.toLowerCase():
			return Preparation[Preparation.PITTED];
		case "11":
		case "CORED".toLowerCase():
		case ENUM_CORED.toLowerCase():
			return Preparation[Preparation.CORED];
		case "12":
		case "GRATED".toLowerCase():
		case ENUM_GRATED.toLowerCase():
			return Preparation[Preparation.GRATED];
		case "13":
		case "MASHED".toLowerCase():
		case ENUM_MASHED.toLowerCase():
			return Preparation[Preparation.MASHED];
		case "14":
		case "CRUSHED".toLowerCase():
		case ENUM_CRUSHED.toLowerCase():
			return Preparation[Preparation.CRUSHED];
		case "15":
		case "PRESSED".toLowerCase():
		case ENUM_PRESSED.toLowerCase():
			return Preparation[Preparation.PRESSED];
		default:
			return null;
	}
};

export const PreparationList = (translated: Boolean = false, join: Boolean = true, delim: string = ", ") =>
{
	let keys = Object.keys(Preparation).filter(k => !Number.parseInt(k) && k != "0");
	let res: Array<String> = [];

	if(translated)
		for (const key in keys)
			res.push(PreparationDisplay[key]);
	else
		for (const key in keys)
			res.push(Preparation[key]);

	if(join)
		return res.join(delim);

	return res; 
};