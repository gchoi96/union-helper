import { JOB_MAP } from "#constants/maps";
import { JOB_NAME } from "#enums/job";
import { Character } from "#types/character";
import { atom, selector } from "recoil";

const defaultMobileCharacter: Character = {
    nickname: "메이플M",
    job: JOB_MAP.메이플M,
    level: 0,
    image: "",
    isUsed: true,
    isMobile: true,
};

const _characterListState = atom<Character[]>({
    key: "_characterList",
    default: JSON.parse(localStorage.getItem("characters") || "[]"),
});

const _mobileLevelState = atom<number>({
    key: "_mobileLevel",
    default:
        (JSON.parse(localStorage.getItem("characters") ?? "[]") as Character[]).find(
            (character) => character.job?.name === JOB_NAME.메이플M
        )?.level ?? 0,
});

const mobileLevelState = selector<number>({
    key: "mobileLevel",
    get: ({ get }) => get(_mobileLevelState),
    set: ({ get, set }, newValue) => {
        set(_mobileLevelState, newValue);
        if (newValue === 0) {
            set(
                _characterListState,
                get(_characterListState).filter((character) => character.job?.name !== JOB_NAME.메이플M)
            );
            return;
        }
        const characterList = get(_characterListState);
        const mobileCharacter = {
            ...(characterList.find((character) => character.job?.name === JOB_NAME.메이플M) || defaultMobileCharacter),
        };
        if (mobileCharacter.level === newValue) return;
        mobileCharacter.level = Number(newValue);

        set(_characterListState, [
            ...characterList.filter((character) => character.job?.name !== JOB_NAME.메이플M),
            mobileCharacter,
        ]);
    },
});

const characterListState = selector<Character[]>({
    key: "characterList",
    get: ({ get }) => {
        const characterList = get(_characterListState);
        return characterList
            .filter((character) => character.job?.name !== JOB_NAME.메이플M || character.level >= 30)
            .sort((a, b) => {
                if (a.level === b.level) return b.nickname > a.nickname ? -1 : 1;
                return b.level - a.level;
            });
    },
    set: ({ set }, newValue) => {
        set(_characterListState, newValue as Character[]);
    },
});

export { characterListState, mobileLevelState };
