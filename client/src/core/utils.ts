import { JOB_MAP, SELECT_WORLD_CHARACTER, UNION_GRADE } from "@core/constants";
import { UnionGrade } from "@core/types/UnionGrade";
import { ERROR } from "./enums";
import { CharacterInfo } from "./types/CharacterInfo";
import { FetchCharacterInfoResponse } from "./types/Response";

export const calcUnionGrade = (totalLevel: number): UnionGrade => {
    return Object.values(UNION_GRADE)[Math.floor(Math.floor(totalLevel / 500))];
};

export const extractCharacterList = (copiedText: string): string[] => {
    const splitText = copiedText.split("\n");
    const accountDetailIndex = splitText.findIndex((str) =>
        str.includes(SELECT_WORLD_CHARACTER)
    );
    if (accountDetailIndex === -1) throw new Error(ERROR.INVALID_COPIED_TEXT);
    const [worldIndex, listStartIndex] = [accountDetailIndex + 1, accountDetailIndex + 2];
    const world = splitText[worldIndex];
    const characterList = splitText[listStartIndex].split(world).slice(0, -1);
    characterList.forEach(
        (_, idx) =>
            (characterList[idx] = characterList[idx].replace(characterList[idx - 1], ""))
    );
    return characterList;
};

export const convertResponseToCharacterInfo = (
    res: FetchCharacterInfoResponse
): CharacterInfo => {
    return { ...res, level: Number(res.level), job: JOB_MAP[res.job] };
};
