import { ENUM_NONE, ENUM_VERY_EASY, ENUM_EASY, ENUM_MEDIUM, ENUM_HARD, ENUM_VERY_HARD,
} from "../../resources/language";

export enum Difficulty
{
    NONE,
    VERY_EASY,
    EASY,
    MEDIUM,
    HARD,
    VERY_HARD,
}

export const DifficultyDisplay: { [index: number]: string } = {};
DifficultyDisplay[Difficulty.NONE] = ENUM_NONE;
DifficultyDisplay[Difficulty.VERY_EASY] = ENUM_VERY_EASY;
DifficultyDisplay[Difficulty.EASY] = ENUM_EASY;
DifficultyDisplay[Difficulty.MEDIUM] = ENUM_MEDIUM;
DifficultyDisplay[Difficulty.HARD] = ENUM_HARD;
DifficultyDisplay[Difficulty.VERY_HARD] = ENUM_VERY_HARD;

export const DifficultyValue = (text: String) =>
{
	switch(text.toLowerCase())
	{
		case "0":
		case "NONE".toLowerCase():
		case ENUM_NONE.toLowerCase():
			return Difficulty[Difficulty.NONE];
		case "1":
		case "VERY_EASY".toLowerCase():
		case ENUM_VERY_EASY.toLowerCase():
			return Difficulty[Difficulty.VERY_EASY];
		case "2":
		case "EASY".toLowerCase():
		case ENUM_EASY.toLowerCase():
			return Difficulty[Difficulty.EASY];
		case "3":
		case "MEDIUM".toLowerCase():
		case ENUM_MEDIUM.toLowerCase():
			return Difficulty[Difficulty.MEDIUM];
		case "4":
		case "HARD".toLowerCase():
		case ENUM_HARD.toLowerCase():
			return Difficulty[Difficulty.HARD];
		case "5":
		case "VERY_HARD".toLowerCase():
		case ENUM_VERY_HARD.toLowerCase():
			return Difficulty[Difficulty.VERY_HARD];
		default:
			return text;
	}
};

export const DifficultyList = (translated: Boolean = false, join: Boolean = true, delim: string = ", ") =>
{
	let keys = Object.keys(Difficulty).filter(k => !Number.parseInt(k) && k != "0");
	let res: Array<String> = [];

	if(translated)
		for (const key in keys)
			res.push(DifficultyDisplay[key]);
	else
		for (const key in keys)
			res.push(Difficulty[key]);

	if(join)
		return res.join(delim);

	return res; 
};