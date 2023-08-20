import { Block } from "#classes/Block";
import { JOB_NAME } from "#enums/job";
import { characterListState, mobileLevelState } from "#store/characterList";
import { Character } from "#types/character";
import { UnionGrade } from "#types/unionGrade";
import {  calcUnionGrade } from "#utils";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function useCharacterList() {
    const [characterList, setCharacterList] = useRecoilState(characterListState);
    const [mobileState, setMobileState] = useRecoilState(mobileLevelState);
    useEffect(() => {
        localStorage.setItem("characters", JSON.stringify(characterList));
    }, [characterList]);

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
            .reduce((total, character) => total + Block.calcBlockSize(character), 0);
    };

    const getActiveCount = () => {
        return characterList.reduce((total, character) => (character.isUsed ? total + 1 : total), 0);
    };

    const getUnionGrade = (): UnionGrade => {
        const unionGrade = calcUnionGrade(getTotalLevel());
        return { ...unionGrade, blockCount: unionGrade.blockCount + (mobileState >= 30 ? 1 : 0) };
    };

    const add = (character: Character) => {
        setCharacterList((prev) => [...prev, character]);
    };

    const _delete = (nickname: string) => {
        setCharacterList((prev) => prev.filter((character) => character.nickname !== nickname));
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

    const reset = () => {
        setCharacterList([]);
        setMobileState(0);
    };

    const autoSelect = () => {
        let remainCount = getUnionGrade().blockCount - getActiveCount();
        [...characterList].forEach((character) => {
            if (remainCount <= 0) return;
            if (character.isUsed) return;
            remainCount--;
            setCharacterList((prev) => [
                ...prev.filter((_character) => _character.nickname !== character.nickname),
                { ...character, isUsed: true },
            ]);
        });
    };

    const getSelectedList = () => characterList.filter((character) => character.isUsed);

    return {
        characterList,
        getTotalLevel,
        getOccupiableSize,
        getActiveCount,
        use,
        release,
        reset,
        getUnionGrade,
        _delete,
        add,
        autoSelect,
        getSelectedList,
    };
}
