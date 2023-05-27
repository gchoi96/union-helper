import { SELECT_WORLD_CHARACTER, UNION_GRADE } from "@core/constants";
import { UnionGrade } from "@core/types/UnionGrade";

export const calcUnionGrade = (totalLevel: number): UnionGrade => {
    return Object.values(UNION_GRADE)[Math.floor(Math.floor(totalLevel / 500))];
};

export const extractCharacterList = (copiedText: string): string[] => {
    const splitText = copiedText.split("\n");
    const selectWorldIndex = splitText.findIndex((str) => str.includes(SELECT_WORLD_CHARACTER));
    const [worldIndex, characterListIndex] = [selectWorldIndex + 1, selectWorldIndex + 2];
    const world = splitText[worldIndex];
    const characterList = splitText[characterListIndex].split(world).slice(0, -1);
    characterList.forEach((_, idx) => (characterList[idx] = characterList[idx].replace(characterList[idx - 1], "")));
    return characterList;
};
