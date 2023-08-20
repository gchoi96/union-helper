import { JOB_MAP, UNION_GRADE_MAP } from "#constants/maps";
import { ERROR, SELECT_WORLD_CHARACTER } from "#constants/strings";
import { JOB_NAME } from "#enums/job";
import { Character } from "#types/character";
import { UnionGrade } from "#types/unionGrade";

export const calcUnionGrade = (totalLevel: number): UnionGrade => {
    return Object.values(UNION_GRADE_MAP)[Math.floor(Math.floor(totalLevel / 500))];
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

export const getNumbersBetween = (num1: number, num2: number) => {
    const [min, max] = [Math.min(num1, num2), Math.max(num1, num2)];
    const numbers: number[] = [];
    for (let i = min + 1; i < max; i++) {
        numbers.push(i);
    }
    return numbers;
};

export const removeDuplicates = <T>(array: T[]) => {
    return Array.from(new Set(array));
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

export const convertMobileLevelToGeneralLevel = (level: number) => {
    if (level >= 120) return 200;
    if (level >= 70) return 140;
    if (level >= 50) return 100;
    if (level >= 30) return 60;
    return 0;
};

export const getGradeFromCharacterLevel = (character: Character) => {
    let { level, job } = character;
    const isMobile = job?.name === JOB_NAME.메이플M;
    if (isMobile) level = convertMobileLevelToGeneralLevel(level);
    if (level >= 250) return "SSS";
    if (level >= 200) return "SS";
    if (level >= 140) return "S";
    if (level >= 100) return "A";
    return "B";
};

export const convertResponseToCharacter = (character: {
    nickname: string;
    level: string;
    image: string;
    job: string;
}) => ({
    nickname: character.nickname,
    job: JOB_MAP[character.job],
    level: Number(character.level),
    image: character.image,
    isUsed: false,
    isMobile: false,
});
