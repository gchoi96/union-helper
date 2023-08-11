import { JOB_NAME } from "#enums/job";
import { characterListState, mobileLevelState } from "#store/characterList";
import { Character } from "#types/character";
import { UnionGrade } from "#types/unionGrade";
import { calcBlockSize, calcUnionGrade } from "#utils";
import { useRecoilState, useResetRecoilState } from "recoil";

export default function useCharacterList() {
    const [characterList, setCharacterList] = useRecoilState(characterListState);
    const [mobileState, setMobileState] = useRecoilState(mobileLevelState);
    const resetCharacterList = useResetRecoilState(characterListState);
    const getTotalLevel = () => {
        return characterList.reduce(
            (total, character) => (character.job?.name === JOB_NAME.메이플M ? total : total + character.level),
            0
        );
    };
    const getOccupiableSize = () => {
        const selectedList = characterList.filter((character) => character.isUsed);
        const remainCharacterCount = getUnionGrade().blockCount - selectedList.length;
        return characterList
            .filter((character) => !character.isUsed)
            .slice(0, remainCharacterCount)
            .concat(selectedList)
            .reduce((total, character) => total + calcBlockSize(character.level, character.isMobile), 0);
    };

    const getActiveCount = () => {
        return characterList.reduce((total, character) => (character.isUsed ? total + 1 : total), 0);
    };

    const getUnionGrade = (): UnionGrade => {
        const unionGrade = calcUnionGrade(getTotalLevel());
        return { ...unionGrade, blockCount: unionGrade.blockCount + (mobileState >= 30 ? 1 : 0) };
    };

    const use = (nickname: string) => {
        const newList = characterList.map((character) => ({ ...character }));
        const target = newList.find((character) => character.nickname === nickname);
        if (!target) return;
        target.isUsed = true;
        setCharacterList(newList.sort((a, b) => b.level - a.level));
    };

    const release = (nickname: string) => {
        const newList = characterList.map((character) => ({ ...character }));
        const target = newList.find((character) => character.nickname === nickname);
        if (!target) return;
        target.isUsed = false;
        setCharacterList(newList.sort((a, b) => b.level - a.level));
    };

    const sort = (characterList: Character[]) => [...characterList].sort((a, b) => b.level - a.level);

    const reset = () => {
        resetCharacterList();
        setMobileState(0);
    };

    return {
        characterList,
        setCharacterList: (characterList: Character[]) => setCharacterList(sort(characterList)),
        getTotalLevel,
        getOccupiableSize,
        getActiveCount,
        use,
        release,
        reset,
        getUnionGrade,
    };
}
