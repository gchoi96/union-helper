import { characterListState } from "#store/characterList";
import { Character } from "#types/character";
import { useSetRecoilState } from "recoil";

export const useUpdateCharacterList = () => {
    const setCharacterList = useSetRecoilState(characterListState);
    const update = (characters: Character[]) => {
        setCharacterList((prev) => {
            const newList = [...prev];
            characters.forEach((character) => {
                const idx = newList.findIndex((_character) => _character.nickname === character.nickname);
                if (idx === -1) {
                    newList.push(character);
                    return;
                }
                const prevCharacter = newList.splice(idx, 1)[0];
                newList.push({ ...character, isUsed: prevCharacter.isUsed, isMobile: prevCharacter.isMobile });
            });
            return newList;
        });
    };
    return update;
};
