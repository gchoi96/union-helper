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
        color = color & color;
    }
    color = Math.abs(color);
    return "#" + color.toString(16).padStart(6, "0").toUpperCase();
};

export const changeTextColor = (text: string, color: string) => {
    return `%c${text} color: ${stringToColorHex(color)};`;
};

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
};

export const removeDuplicates = <T>(array: T[]) => {
    return Array.from(new Set(array));
};

const hashStringToNumber = (str: string, maxNum: number) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i);
    }
    return (hash % maxNum) + 1;
};

export const stringToUnicode = (str: string) => {
    const unicode = ["🟥", "🟧", "🟦", "🟪", "🟢", "🟠", "🟣", "🟫", "🟤", "⬛"];
    const hash = hashStringToNumber(str, unicode.length);

    return unicode[hash];
};

export const debounce = (callback: (args: any) => void, delay: number) => {
    let debounceTimer: NodeJS.Timer;
    return (...args: any) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
};

export const throttle = (callback: (args: any) => void, delay: number) => {
    let throttleTimer: NodeJS.Timer | null;
    return (...args: any) => {
        if (!throttleTimer) {
            throttleTimer = setTimeout(() => {
                throttleTimer = null;
                callback.apply(this, args);
            }, delay);
        }
    };
};

export const getGradeFromCharacterLevel = (level: number) => {
    if (level >= 250) return "SSS";
    if (level >= 200) return "SS";
    if (level >= 140) return "S";
    if (level >= 100) return "A";
    return "B";
};
