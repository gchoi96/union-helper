import { Button } from "#components/commons/Button";
import { JOB_MAP } from "#constants/maps";
import { MESSAGE } from "#constants/strings";
import { useKey } from "#hooks/useKey";
import { Character } from "#types/character";
import { ChangeEventHandler, HTMLAttributes, useState } from "react";
import * as S from "./styles";

interface CharacterInfoInput extends HTMLAttributes<HTMLDivElement> {
    nickname: string;
    onSave: (character: Character) => void;
}

export default function CharacterInput({ onSave, ...props }: CharacterInfoInput) {
    const [level, setLevel] = useState("");
    const [job, setJob] = useState("");
    const { generate } = useKey("job");
    const onInputLevel: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        const isNumber = /^\d+$/.test(value);
        if (isNumber) setLevel(value);
    };

    const onBlurLevel = () => {
        const number = Number(level);
        if (!level.length) return;
        if (number >= 60 && number <= 300) return;
        alert(MESSAGE.OUT_OF_LEVEL_RANGE);
        setLevel("");
    };

    const onChangeSelect: ChangeEventHandler<HTMLSelectElement> = (e) => setJob(e.target.value);

    const onClickAdd = () => {
        if (!level || !job) {
            alert(MESSAGE.MISSING_REQUIRED_INPUT);
            return;
        }
        const character = {
            nickname: props.nickname,
            level: Number(level),
            job: JOB_MAP[job],
            image: "",
            isUsed: false,
            isMobile: false,
        };
        onSave(character);
    };

    return (
        <S.Container>
            <S.InputWrapper>
                <S.NicknameTxt>{`${props.nickname} Lv.`}</S.NicknameTxt>
                <S.LevelInput value={level} onInput={onInputLevel} onBlur={onBlurLevel} placeholder="000" />
                <S.JobSelect onChange={onChangeSelect}>
                    <option value="">직업</option>
                    {Object.keys(JOB_MAP).map((job, idx) => (
                        <option value={job} key={generate()}>
                            {job}
                        </option>
                    ))}
                </S.JobSelect>
            </S.InputWrapper>
            <Button.IconButton image="" onClick={onClickAdd} />
        </S.Container>
    );
}
