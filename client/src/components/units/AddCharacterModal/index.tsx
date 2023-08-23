import { Blank } from "#components/commons/Blank";
import Modal from "#components/commons/Modal";
import { Txt } from "#components/commons/Txt";
import { TEXT_COLOR } from "#constants/colors";
import { JOB_MAP } from "#constants/maps";
import { MESSAGE } from "#constants/strings";
import { JOB_NAME } from "#enums/job";
import { useAlert } from "#hooks/useAlert";
import useCharacterList from "#hooks/useCharacterList";
import { ChangeEventHandler, useState } from "react";
import * as S from "./styles";
import { v4 as uuidv4 } from "uuid";
const labelOptions = {
    color: TEXT_COLOR.WHITE,
    size: "12px",
    weight: 600,
};
interface Props {
    closeModal: () => void;
}

export function AddCharacterModal({ closeModal }: Props) {
    const [level, setLevel] = useState("");
    const [job, setJob] = useState("");
    const { add } = useCharacterList();
    const alert = useAlert();
    const onBlurLevel = () => {
        const number = Number(level);
        if (!level.length) return;
        if (number >= 60 && number <= 300) return;
        alert(MESSAGE.OUT_OF_LEVEL_RANGE);
        setLevel("");
    };
    const onInputLevel: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        const isNumber = /^\d+$/.test(value);
        if (isNumber) setLevel(value);
    };

    const onChangeSelect: ChangeEventHandler<HTMLSelectElement> = (e) => setJob(e.target.value);

    const onClickSave = () => {
        if (!level || !job) {
            alert(MESSAGE.MISSING_REQUIRED_INPUT);
            return;
        }
        const character = {
            nickname: job,
            level: Number(level),
            job: JOB_MAP[job],
            image: "",
            isUsed: false,
            isMobile: false,
        };

        add(character);
        closeModal();
    };

    return (
        <Modal closeModal={closeModal} onClickSave={onClickSave}>
            <S.Container>
                <Txt {...labelOptions}>직업</Txt>
                <Blank size={7} />
                <select onChange={onChangeSelect} value={job}>
                    <option value="">선택</option>
                    {Object.keys(JOB_NAME)
                        .filter((name) => name !== JOB_NAME.메이플M)
                        .map((name, idx) => (
                            <option key={uuidv4()}>{name}</option>
                        ))}
                </select>
                <Blank size={20} />
                <Txt {...labelOptions}>레벨</Txt>
                <Blank size={7} />
                <input value={level} onInput={onInputLevel} onBlur={onBlurLevel} />
            </S.Container>
        </Modal>
    );
}
