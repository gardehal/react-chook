import { ENUM_NONE, ENUM_VERY_EASY, ENUM_EASY, ENUM_MEDIUM, ENUM_HARD, ENUM_VERY_HARD
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

export let DifficultyDisplay: { [index: number]: string } = {};
DifficultyDisplay[Difficulty.NONE] = ENUM_NONE;
DifficultyDisplay[Difficulty.VERY_EASY] = ENUM_VERY_EASY;
DifficultyDisplay[Difficulty.EASY] = ENUM_EASY;
DifficultyDisplay[Difficulty.MEDIUM] = ENUM_MEDIUM;
DifficultyDisplay[Difficulty.HARD] = ENUM_HARD;
DifficultyDisplay[Difficulty.VERY_HARD] = ENUM_VERY_HARD;