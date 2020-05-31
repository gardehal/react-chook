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

let ProteinDisplay: { [index: number]: string } = {};
ProteinDisplay[Protein.OTHER] = "Annet"; // TODO From Language 