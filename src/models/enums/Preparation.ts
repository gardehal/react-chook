import { ENUM_NONE, ENUM_OTHER, ENUM_WHOLE, ENUM_CHOPPED, ENUM_MINCED, ENUM_QUBED, ENUM_QUARTERED,
    ENUM_HALVED, ENUM_SLICED, ENUM_DRIED, ENUM_PITTED, ENUM_CORED, ENUM_GRATED, ENUM_MASHED,
    ENUM_CRUSHED, ENUM_PRESSED
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
};

export let PreparationDisplay: { [index: number]: string } = {};
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