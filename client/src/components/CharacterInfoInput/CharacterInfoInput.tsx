import { JOB_MAP } from "@/core/constants";
import { JOB, MESSAGE } from "@/core/enums";
import { CharacterInfo } from "@/core/types/CharacterInfo";
import { ChangeEventHandler, useState } from "react";
import CardButtonAdd from "../CardButton/CardButtonAdd/CardButtonAdd";
import { Container, JobSelect, LevelInput } from "./CharacterInfoInput.styles";

interface CharacterInfoInput {
    nickname: string;
    onClickAdd: (characterInfo: CharacterInfo) => void;
}

export default function CharacterInfoInput(props: CharacterInfoInput) {
    const [level, setLevel] = useState("");
    const [job, setJob] = useState("");

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
        const characterInfo = {
            nickname: props.nickname,
            level: Number(level),
            job: JOB_MAP[job],
            image: "",
        };
        props.onClickAdd(characterInfo);
    };

    return (
        <Container>
            <div>
                <p>{`${props.nickname} Lv.`}</p>
                <LevelInput value={level} onInput={onInputLevel} onBlur={onBlurLevel} placeholder="000" />
                <JobSelect onChange={onChangeSelect}>
                    <option value="none" disabled>
                        직업
                    </option>
                    {Object.keys(JOB).map((job, idx) => (
                        <option key={`{job_${idx}}`}>{job}</option>
                    ))}
                </JobSelect>
            </div>
            <CardButtonAdd onClick={onClickAdd} />
        </Container>
    );
}
