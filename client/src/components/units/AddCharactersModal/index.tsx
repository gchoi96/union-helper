import { MESSAGE, PASTE_PLACEHOLDER } from "#constants/strings";
import { Character } from "#types/character";
import { ClipboardEventHandler, KeyboardEventHandler, useState } from "react";
import { extractCharacterList } from "#utils";
import Modal from "#components/commons/Modal";
import { Box } from "#components/commons/Box";
import CharacterInput from "#components/units/CharacterInput";
import { useAlert } from "#hooks/useAlert";
import { useCharacterQueries } from "#hooks/http/useCharacterQueries";
import { useUpdateCharacterList } from "#hooks/useUpdateCharacters";
import * as S from "./styles";
interface Props {
    closeModal: () => void;
}

export function AddCharactersModal({ closeModal }: Props) {
    const [nicknames, setNicknames] = useState<string[]>([]);
    const alert = useAlert();
    const queries = useCharacterQueries(nicknames);
    const update = useUpdateCharacterList();
    const onKeyDownTextArea: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Backspace") setNicknames([]);
    };

    const onClickSave = () => {
        update(queries.filter(({ data }) => data).map(({ data }) => data as Character));
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

    const getCharacterInfo = (character: Character) => {
        return `${character.nickname} Lv.${character.level} ${character.job?.name}`;
    };

    return (
        <Modal closeModal={closeModal} onClickSave={onClickSave}>
            <S.Container>
                <Box label="홈페이지 정보 붙여넣기" width="220px" height="380px">
                    <textarea placeholder={PASTE_PLACEHOLDER} onKeyDown={onKeyDownTextArea} onPaste={onPasteTextArea} value={nicknames.join("\r\n")} />
                </Box>
                <img src="/icons/load_icon.svg" alt="load_icon" />
                <S.Result>
                    <Box label="결과" width="320px" height="380px">
                        {queries.map(({ data: character, isLoading }, idx) =>
                            isLoading ? (
                                <div>Loading...</div>
                            ) : character && character?.job ? (
                                <p key={`character_${idx}`}>{getCharacterInfo(character)}</p>
                            ) : (
                                <CharacterInput key={`fail_${idx}`} character={character!} />
                            )
                        )}
                    </Box>
                </S.Result>
            </S.Container>
        </Modal>
    );
}
