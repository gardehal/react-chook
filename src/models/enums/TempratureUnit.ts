import { ENUM_NONE, ENUM_CELSIUS, ENUM_FAHRENHEIT
} from "../../resources/language";

export enum TempratureUnit
{
    NONE,
    C,
    F,
};

export let TempratureUnitDisplay: { [index: number]: string } = {};
TempratureUnitDisplay[TempratureUnit.NONE] = ENUM_NONE;
TempratureUnitDisplay[TempratureUnit.C] = ENUM_CELSIUS;
TempratureUnitDisplay[TempratureUnit.F] = ENUM_FAHRENHEIT;