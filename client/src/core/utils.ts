import { JOB_MAP, SELECT_WORLD_CHARACTER, SQUARE_UNICODE, UNION_GRADE } from "@core/constants";
import { UnionGrade } from "@core/types/UnionGrade";
import { CELL_STATUS, ERROR } from "@core/enums";
import { CharacterInfo } from "@core/types/CharacterInfo";
import { FetchCharacterInfoResponse } from "@core/types/Response";

export const calcUnionGrade = (totalLevel: number): UnionGrade => {
    return Object.values(UNION_GRADE)[Math.floor(Math.floor(totalLevel / 500))];
};

export const extractCharacterList = (copiedText: string): string[] => {
    const splitText = copiedText.split("\n");
    const accountDetailIndex = splitText.findIndex((str) => str.includes(SELECT_WORLD_CHARACTER));
    if (accountDetailIndex === -1) throw new Error(ERROR.INVALID_COPIED_TEXT);
    const [worldIndex, listStartIndex] = [accountDetailIndex + 1, accountDetailIndex + 2];
    const world = splitText[worldIndex];
    const characterList = splitText[listStartIndex].split(world).slice(0, -1);
    characterList.forEach((_, idx) => (characterList[idx] = characterList[idx].replace(characterList[idx - 1], "")));
    return characterList;
};

export const convertResponseToCharacterInfo = (res: FetchCharacterInfoResponse): CharacterInfo => {
    return { ...res, level: Number(res.level), job: JOB_MAP[res.job] };
};

export const getNumbersBetween = (num1: number, num2: number) => {
    const [min, max] = [Math.min(num1, num2), Math.max(num1, num2)];
    const numbers: number[] = [];
    for (let i = min + 1; i < max; i++) {
        numbers.push(i);
    }
    return numbers;
};

export const stringToColorHex = (input: string) => {
    let color = 0;
    if (input.length === 0) {
        return color.toString(16).padStart(6, "0");
    }
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);
        color = (color << 5) - color + charCode;
        color = color & color; // 32-bit 정수로 변환
    }
    color = Math.abs(color); // 음수 제거
    return "#" + (color.toString(16).padStart(6, "0")).toUpperCase();
};

export const changeTextColor = (text: string, color: string) => {
    return `%c${text} color: ${(stringToColorHex(color))};`
  }

export const getColorSquare = (status: CELL_STATUS) => {
    switch (status) {
        case CELL_STATUS.AVAILABLE:
            return SQUARE_UNICODE.YELLOW;
        case CELL_STATUS.OCCUPIED:
            return SQUARE_UNICODE.BLUE;
        case CELL_STATUS.TO_BE_OCCUPIED:
            return SQUARE_UNICODE.GREEN;
        case CELL_STATUS.UNAVAILABLE:
            return SQUARE_UNICODE.RED;
    }
}