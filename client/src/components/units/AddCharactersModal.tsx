import { MESSAGE } from "#constants/strings";
import useCharacterList from "#hooks/useCharacterList";
import { Character } from "#types/character";
import { ClipboardEventHandler, KeyboardEventHandler, useState } from "react";
import { extractCharacterList } from "#utils";
import { fetchCharacters } from "#http/fetchCharacter";
import { css } from "@emotion/css";
import { flex } from "#styles/mixin";
import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import { BACKGROUND_COLOR, TEXT_COLOR } from "#constants/colors";
import Modal from "#components/commons/Modal";
import { Box } from "#components/commons/Box";
import CharacterInput from "#components/units/CharacterInput";
import { useAlert } from "#hooks/useAlert";
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
            <div
                className={css`
                    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
                    width:100%;
                    height: 100%;
                    textarea {
                        width: 100%;
                        height: 99%;
                        resize: none;
                        background: none;
                        border: none;
                        color: ${TEXT_COLOR.BOX_CONTENT};
                        :focus {
                            outline: none;
                        }
                        ::-webkit-scrollbar {
                            background-color: transparent;
                        }
                        ::-webkit-scrollbar-thumb {
                            background-color: ${BACKGROUND_COLOR.COUNTER};
                        }
                    }
                    > :not(:first-child) {
                        margin-left: 10px;
                    }
                    > img {
                        cursor: pointer;
                    }
                `}
            >
                <Box width="220px" height="380px">
                    <Box.Label>홈페이지 정보 붙여넣기</Box.Label>
                    <textarea onKeyDown={onKeyDownTextArea} onPaste={onPasteTextArea} value={nicknames.join("\r\n")} />
                </Box>
                <img src="/icons/load_icon.svg" onClick={onClickFetch} />
                <div
                    className={css`
                        ${flex({ direction: FLEX_DIRECTION.COLUMN, justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })};
                        height: 380px;
                    `}
                >
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
                </div>
            </div>
        </Modal>
    );
}
