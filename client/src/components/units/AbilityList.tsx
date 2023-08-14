import { Blank } from "#components/commons/Blank";
import { Box } from "#components/commons/Box";
import { Txt } from "#components/commons/Txt";
import { BACKGROUND_COLOR, BORDER_COLOR, TEXT_COLOR } from "#constants/colors";
import { JOB_MAP } from "#constants/maps";
import { EXTERNAL_AREA } from "#enums/externalArea";
import { FLEX_DIRECTION, JUSTIFY_CONTENT } from "#enums/flex";
import useBoard from "#hooks/useBoard";
import useCharacterList from "#hooks/useCharacterList";
import { flex } from "#styles/mixin";
import { getGradeFromCharacterLevel } from "#utils";
import { css } from "@emotion/css";

const boxOptions = {
    width: "180px",
    height: "220px",
};

export function AbilityList() {
    const { characterList } = useCharacterList();
    const { getAbilityList } = useBoard();
    return (
        <div
            className={css`
                ${flex({
                    direction: FLEX_DIRECTION.COLUMN,
                })}
                padding: 11.5px 11px;
                border-radius: 10px;
                border: 1px solid ${BORDER_COLOR.GRAY};
                width: fit-content;
                background: ${BACKGROUND_COLOR.GRADIENT_GRAY};
            `}
        >
            <Txt.GradientTxt gradient={TEXT_COLOR.CONTROL_TITLE}>공격대 효과</Txt.GradientTxt>
            <Blank size={7} />
            <div
                className={css`
                    ${flex({ justifyContent: JUSTIFY_CONTENT.SPACE_BETWEEN })}
                `}
            >
                <Box {...boxOptions}>
                    <Box.Label>공격대원 효과</Box.Label>
                    <div>
                        {characterList
                            .filter((character, idx) => character.job && character.isUsed)
                            .map((character) =>
                                JOB_MAP[character.job?.name!].ability.toString(
                                    character.job?.ability[getGradeFromCharacterLevel(character.level)] ?? 0
                                )
                            )
                            .sort()
                            .map((ability) => (
                                <p
                                    className={css`
                                        text-align: initial;
                                    `}
                                >
                                    {ability}
                                </p>
                            ))}
                    </div>
                </Box>
                <Blank size={6} direction="horizontal" />
                <Box {...boxOptions}>
                    <Box.Label>공격대 점령 효과</Box.Label>
                    {Object.entries(getAbilityList()).map(([abilityName, value]) => (
                        <p>{`${abilityName} ${value}${abilityName === EXTERNAL_AREA.상태이상내성 ? "" : "%"} 증가`}</p>
                    ))}
                </Box>
            </div>
        </div>
    );
}
