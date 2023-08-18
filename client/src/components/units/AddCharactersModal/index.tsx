import { MESSAGE } from "#constants/strings";
import useCharacterList from "#hooks/useCharacterList";
import { Character } from "#types/character";
import { ClipboardEventHandler, KeyboardEventHandler, useState } from "react";
import { extractCharacterList } from "#utils";
import { fetchCharacters } from "#http/fetchCharacter";
import Modal from "#components/commons/Modal";
import { Box } from "#components/commons/Box";
import CharacterInput from "#components/units/CharacterInput";
import { useAlert } from "#hooks/useAlert";
import * as S from "./styles";
interface Props {
    closeModal: () => void;
}

export function AddCharactersModal({ closeModal }: Props) {
    const [nicknames, setNicknames] = useState<string[]>([]);
    const { setCharacterList } = useCharacterList();
    const alert = useAlert();
    const [parsedCharacters, setParsedCharacters] = useState<{ success: Character[]; fail: Character[] }>({
        success: [],
        fail: [],
    });
    const onKeyDownTextArea: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Backspace") setNicknames([]);
    };

    const onClickSave = () => {
        setCharacterList(parsedCharacters.success);
        closeModal();
    };

    const onPasteTextArea: ClipboardEventHandler<HTMLTextAreaElement> = (e) => {
        try {
            setNicknames(extractCharacterList(e.clipboardData.getData("text/plain")));
            e.preventDefault();
        } catch (err: any) {
            console.error(err.message);
            alert(MESSAGE.INVALID_COPIED_TEXT);
        }
    };

    const onClickFetch = async () => {
        if (!nicknames.length) {
            alert(MESSAGE.MISSING_CHARACTER_INPUT);
            return;
        }
        setParsedCharacters(await fetchCharacters(nicknames));
    };

    const getCharacterInfo = (character: Character) => {
        return `${character.nickname} Lv.${character.level} ${character.job?.name}`;
    };

    const addCharacter = (characterInfo: Character) => {
        setParsedCharacters((prev) => ({
            fail: prev.fail.filter((info) => info.nickname !== characterInfo.nickname),
            success: [characterInfo, ...prev.success],
        }));
    };

    return (
        <Modal closeModal={closeModal} onClickSave={onClickSave}>
            <S.Container>
                <Box width="220px" height="380px">
                    <Box.Label>홈페이지 정보 붙여넣기</Box.Label>
                    <textarea onKeyDown={onKeyDownTextArea} onPaste={onPasteTextArea} value={nicknames.join("\r\n")} />
                </Box>
                <img src="/icons/load_icon.svg" onClick={onClickFetch} alt="load_icon" />
                <S.Result>
                    <Box width="360px" height="186px">
                        <Box.Label>실패</Box.Label>
                        {parsedCharacters.fail.map((character, idx) => (
                            <CharacterInput key={`fail_${idx}`} nickname={character.nickname} onSave={addCharacter} />
                        ))}
                    </Box>
                    <Box width="360px" height="186px">
                        <Box.Label>성공</Box.Label>
                        {parsedCharacters.success.map((character, idx) => (
                            <p key={`fail_${idx}`}>{getCharacterInfo(character)}</p>
                        ))}
                    </Box>
                </S.Result>
            </S.Container>
        </Modal>
    );
}
