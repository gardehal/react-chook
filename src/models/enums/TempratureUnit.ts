import { ENUM_NONE, ENUM_CELSIUS, ENUM_FAHRENHEIT
} from "../../resources/language";

export enum TempratureUnit
{
    NONE,
    C,
    F,
};

export const TempratureUnitDisplay: { [index: number]: string } = {};
TempratureUnitDisplay[TempratureUnit.NONE] = ENUM_NONE;
TempratureUnitDisplay[TempratureUnit.C] = ENUM_CELSIUS;
TempratureUnitDisplay[TempratureUnit.F] = ENUM_FAHRENHEIT;

export const TempratureUnitValue = (text: String) =>
{
	switch(text.toLowerCase())
	{
		case "0":
		case "NONE".toLowerCase():
		case ENUM_NONE.toLowerCase():
			return TempratureUnit[TempratureUnit.NONE];
		case "1":
		case "C".toLowerCase():
		case ENUM_CELSIUS.toLowerCase():
			return TempratureUnit[TempratureUnit.C];
		case "2":
		case "F".toLowerCase():
		case ENUM_FAHRENHEIT.toLowerCase():
			return TempratureUnit[TempratureUnit.F];
		default:
			return text;
	}
};

export const TempratureUnitList = (translated: Boolean = false, join: Boolean = true, delim: string = ", ") =>
{
	let keys = Object.keys(TempratureUnit).filter(k => !Number.parseInt(k) && k != "0");
	let res: Array<String> = [];

	if(translated)
		for (const key in keys)
			res.push(TempratureUnitDisplay[key]);
	else
		for (const key in keys)
			res.push(TempratureUnit[key]);

	if(join)
		return res.join(delim);

	return res; 
};