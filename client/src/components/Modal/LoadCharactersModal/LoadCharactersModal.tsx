import Box from "@/components/Box/Box";
import { ERROR, MESSAGE } from "@/core/enums";
import { CharacterInfo } from "@/core/types/CharacterInfo";
import { extractCharacterList } from "@/core/utils";
import { fetchCharacterInfos, FetchCharacterInfosResult } from "@/http/fetchCharacterInfo";
import { ClipboardEventHandler, KeyboardEventHandler, MouseEventHandler, useState } from "react";
import Modal, { ModalProps } from "../Modal";
import { Container, SubContainer } from "./LoadCharactersModal.styles";

export default function LoadCharactersModal({ closeModal, onClickSave }: Omit<ModalProps, "children">) {
    const [nicknames, setNicknames] = useState<string[]>([]);
    const [characterInfos, setCharacterInfos] = useState<FetchCharacterInfosResult>({
        successList: [],
        failureList: [],
    });
    const onKeyDownTextArea: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === "Backspace") setNicknames([]);
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

    const onClickLoad = async () => {
        if(!nicknames.length){
            alert(MESSAGE.MISSING_CHARACTER_INPUT);
            return;
        }
        setCharacterInfos(await fetchCharacterInfos(nicknames));
    };

    const getCharacterInfoSummary = (characterInfo: CharacterInfo) => {
        return `${characterInfo.nickname} Lv.${characterInfo.level} ${characterInfo.job?.name}`;
    };

    return (
        <Modal closeModal={closeModal} onClickSave={onClickSave}>
            <Container>
                <Box width="22rem" height="38rem" title="홈페이지 정보 붙여넣기">
                    <textarea onKeyDown={onKeyDownTextArea} onPaste={onPasteTextArea} value={nicknames.join("\r\n")} />
                </Box>
                <img src="/load_icon.svg" onClick={onClickLoad} />
                <SubContainer>
                    <Box width="36rem" height="18.6rem" title="실패">
                        {characterInfos.failureList.map((characterInfo, idx) => (
                            <p key={`fail_${idx}`}>{getCharacterInfoSummary(characterInfo)}</p>
                        ))}
                    </Box>
                    <Box width="36rem" height="18.6rem" title="성공">
                        {characterInfos.successList.map((characterInfo, idx) => (
                            <p key={`fail_${idx}`}>{getCharacterInfoSummary(characterInfo)}</p>
                        ))}
                    </Box>
                </SubContainer>
            </Container>
        </Modal>
    );
}
