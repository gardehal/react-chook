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

export let ProteinDisplay: { [index: number]: string } = {};
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