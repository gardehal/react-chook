import { ENUM_OTHER, ENUM_BAKE, ENUM_ROAST, ENUM_FRY, ENUM_DEEPFRY, 
    ENUM_BOIL, ENUM_SOUSVIDE, ENUM_GRILL, ENUM_STEAM 
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

export let CookingMethodDisplay: { [index: number]: string } = {};
CookingMethodDisplay[CookingMethod.OTHER] = ENUM_OTHER;
CookingMethodDisplay[CookingMethod.BAKE] = ENUM_BAKE;
CookingMethodDisplay[CookingMethod.ROAST] = ENUM_ROAST;
CookingMethodDisplay[CookingMethod.FRY] = ENUM_FRY;
CookingMethodDisplay[CookingMethod.DEEPFRY] = ENUM_DEEPFRY;
CookingMethodDisplay[CookingMethod.BOIL] = ENUM_BOIL;
CookingMethodDisplay[CookingMethod.SOUSVIDE] = ENUM_SOUSVIDE;
CookingMethodDisplay[CookingMethod.GRILL] = ENUM_GRILL;
CookingMethodDisplay[CookingMethod.STEAM] = ENUM_STEAM;