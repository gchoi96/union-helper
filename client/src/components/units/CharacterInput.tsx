import { Button } from "#components/commons/Button";
import { BACKGROUND_COLOR, TEXT_COLOR } from "#constants/colors";
import { JOB_MAP } from "#constants/maps";
import { MESSAGE } from "#constants/strings";
import { ALIGN_ITEMS, JUSTIFY_CONTENT } from "#enums/flex";
import { useKey } from "#hooks/useKey";
import { flex } from "#styles/mixin";
import { Character } from "#types/character";
import { css } from "@emotion/css";
import { ChangeEventHandler, HTMLAttributes, useState } from "react";

const inputStyle = css`
    color: ${TEXT_COLOR.WHITE};
    border: none;
    background: ${BACKGROUND_COLOR.INPUT};
    padding: 1px 2px;
    :focus {
        outline: 1px solid gray;
    }
`;

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
        <div
            className={css`
                ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN, alignItems: ALIGN_ITEMS.CENTER })}
                width:100%;
                > :first-child {
                    ${flex({ alignItems: ALIGN_ITEMS.CENTER })}
                    text-align: center;
                    font-size: 12px;
                    font-weight: 500;
                    letter-spacing: 0.2px;
                    > p {
                        font-size: 12px;
                    }
                    > :last-child {
                        margin-left: 6px;
                    }
                }
            `}
        >
            <div>
                <p>{`${props.nickname} Lv.`}</p>
                <input
                    className={css`
                        font-size: 1rem;
                        width: 2rem;
                        ${inputStyle};
                    `}
                    value={level}
                    onInput={onInputLevel}
                    onBlur={onBlurLevel}
                    placeholder="000"
                />
                <select
                    className={css`
                        font-size: 10px;
                        width: 100px;
                        ${inputStyle}
                    `}
                    onChange={onChangeSelect}
                >
                    <option value="">직업</option>
                    {Object.keys(JOB_MAP).map((job, idx) => (
                        <option value={job} key={generate()}>
                            {job}
                        </option>
                    ))}
                </select>
            </div>
            <Button.IconButton image="" onClick={onClickAdd} />
        </div>
    );
}
