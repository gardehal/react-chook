export enum Protein
{
    VEGAN,
    VEGETARIAN,
    BEEF,
    LAMB,
    PORK,
    POULTRY = 5,
    FOWL = 5,
    BIRD = 5,
    EGG,
    FISH,
    SEAFOOD,
    DAIRY,
    OTHER,
};

let ProteinDisplay: { [index: number]: string } = {};
ProteinDisplay[Protein.OTHER] = "Annet"; // TODO From Language 