import { ENUM_OTHER, ENUM_VEGAN, ENUM_VEGETARIAN, ENUM_BEEF, ENUM_LAMB, 
    ENUM_PORK, ENUM_BIRD, ENUM_EGG, ENUM_FISH, ENUM_SEAFOOD, ENUM_DAIRY, 
} from "../../resources/language";

export enum Protein
{
    OTHER,
    VEGAN,
    VEGETARIAN,
    BEEF,
    LAMB,
    PORK = 5,
    SWINE = 5,
    POULTRY = 6,
    FOWL = 6,
    BIRD = 6,
    EGG,
    FISH,
    SEAFOOD,
    DAIRY,
};

export const ProteinDisplay: { [index: number]: string } = {};
ProteinDisplay[Protein.OTHER] = ENUM_OTHER;
ProteinDisplay[Protein.VEGAN] = ENUM_VEGAN;
ProteinDisplay[Protein.VEGETARIAN] = ENUM_VEGETARIAN;
ProteinDisplay[Protein.BEEF] = ENUM_BEEF;
ProteinDisplay[Protein.LAMB] = ENUM_LAMB;
ProteinDisplay[Protein.PORK] = ENUM_PORK;
ProteinDisplay[Protein.SWINE] = ENUM_PORK;
ProteinDisplay[Protein.POULTRY] = ENUM_BIRD;
ProteinDisplay[Protein.FOWL] = ENUM_BIRD;
ProteinDisplay[Protein.BIRD] = ENUM_BIRD;
ProteinDisplay[Protein.EGG] = ENUM_EGG;
ProteinDisplay[Protein.FISH] = ENUM_FISH;
ProteinDisplay[Protein.SEAFOOD] = ENUM_SEAFOOD;
ProteinDisplay[Protein.DAIRY] = ENUM_DAIRY;

export const ProteinValue = (text: String) =>
{
	switch(text.toLowerCase())
	{
		case "0":
		case "OTHER".toLowerCase():
		case ENUM_OTHER.toLowerCase():
			return Protein[Protein.OTHER];
		case "1":
		case "VEGAN".toLowerCase():
		case ENUM_VEGAN.toLowerCase():
			return Protein[Protein.VEGAN];
		case "2":
		case "VEGETARIAN".toLowerCase():
		case ENUM_VEGETARIAN.toLowerCase():
			return Protein[Protein.VEGETARIAN];
		case "3":
		case "BEEF".toLowerCase():
		case ENUM_BEEF.toLowerCase():
			return Protein[Protein.BEEF];
		case "4":
		case "LAMB".toLowerCase():
		case ENUM_LAMB.toLowerCase():
			return Protein[Protein.LAMB];
		case "5":
		case "PORK".toLowerCase():
		case "SWINE".toLowerCase():
		case ENUM_PORK.toLowerCase():
			return Protein[Protein.PORK];
		case "6":
		case "BIRD".toLowerCase():
		case "FOWL".toLowerCase():
		case "POULTRY".toLowerCase():
		case ENUM_BIRD.toLowerCase():
			return Protein[Protein.BIRD];
		case "7":
		case "EGG".toLowerCase():
		case ENUM_EGG.toLowerCase():
			return Protein[Protein.EGG];
			case "8":
		case "FISH".toLowerCase():
		case ENUM_FISH.toLowerCase():
			return Protein[Protein.FISH];
			case "9":
		case "SEAFOOD".toLowerCase():
		case ENUM_SEAFOOD.toLowerCase():
			return Protein[Protein.SEAFOOD];
			case "10":
		case "DAIRY".toLowerCase():
		case ENUM_DAIRY.toLowerCase():
			return Protein[Protein.DAIRY];
		default:
			return text;
	}
};

export const ProteinList = (translated: Boolean = false, join: Boolean = true, delim: string = ", ") =>
{
	let keys = Object.keys(Protein).filter(k => !Number.parseInt(k) && k != "0");
	let res: Array<String> = [];

	if(translated)
		for (const key in keys)
			res.push(ProteinDisplay[key]);
	else
		for (const key in keys)
			res.push(Protein[key]);

	if(join)
		return res.join(delim);

	return res; 
};
