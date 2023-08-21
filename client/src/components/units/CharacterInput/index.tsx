import { Button } from "#components/commons/Button";
import { JOB_MAP } from "#constants/maps";
import { MESSAGE } from "#constants/strings";
import { useAlert } from "#hooks/useAlert";
import { Character } from "#types/character";
import { ChangeEventHandler, HTMLAttributes, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import * as S from "./styles";
import { v4 as uuidv4 } from "uuid";

interface CharacterInfoInput extends HTMLAttributes<HTMLDivElement> {
    character: Character;
}

export default function CharacterInput({ character }: CharacterInfoInput) {
    const [level, setLevel] = useState("");
    const [job, setJob] = useState("");
    const alert = useAlert();
    const queryClient = useQueryClient();
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
        queryClient.setQueryData(["character", character.nickname], { ...character, level, job: JOB_MAP[job] }, {});
    };

    return (
        <S.Container>
            <S.InputWrapper>
                <S.NicknameTxt>{`${character.nickname} Lv.`}</S.NicknameTxt>
                <S.LevelInput value={level} onInput={onInputLevel} onBlur={onBlurLevel} placeholder="000" />
                <S.JobSelect onChange={onChangeSelect}>
                    <option value="">직업</option>
                    {Object.keys(JOB_MAP).map((job, idx) => (
                        <option value={job} key={uuidv4()}>
                            {job}
                        </option>
                    ))}
                </S.JobSelect>
            </S.InputWrapper>
            <Button.IconButton image="/icons/plus_icon.svg" onClick={onClickAdd} />
        </S.Container>
    );
}
