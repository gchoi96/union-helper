import { JOB_NAME } from "#enums/job";
import useCharacterList from "#hooks/useCharacterList";
import { Character } from "#types/character";
import { getGradeFromCharacterLevel } from "#utils";
import { HTMLAttributes } from "react";
import { Tooltip } from "#components/commons/Tooltip";
import { Txt } from "#components/commons/Txt";
import useTooltip from "#hooks/useTooltip";
import { JOB_MAP } from "#constants/maps";
import * as options from "./options";
import * as S from "./styles";
interface Props extends HTMLAttributes<HTMLDivElement> {
    character: Character;
}

export function Card({ character, ...props }: Props) {
    const { use, release, _delete, refresh } = useCharacterList();
    const { isTooltipVisible, containerRef, tooltipPosition } = useTooltip();
    return (
        <>
            <S.Container
                ref={containerRef}
                onClick={() => (character.isUsed ? release : use)(character.nickname)}
                {...props}
            >
                <S.Header>
                    <Txt.GradientTxt {...options.gradeLabelOptions} data-text={getGradeFromCharacterLevel}>
                        {getGradeFromCharacterLevel(character)}
                    </Txt.GradientTxt>
                    <Txt {...options.levelLabelOptions}>{`Lv.${character.level}`}</Txt>
                </S.Header>
                <S.Image url={character.image} />
                <Txt {...options.jobLabelOptions}>{character.job?.name ?? "???"}</Txt>
                <Txt {...options.nameLabelOptions}>{character.nickname}</Txt>
                <S.ButtonWrapper>
                    {character.image && (
                        <S.RefreshButton
                            onClick={(e) => {
                                refresh(character);
                                e.stopPropagation();
                            }}
                            {...options.refreshButtonOptions}
                        >
                            <img src="/icons/refresh_icon.svg" alt="refresh_icon" />
                        </S.RefreshButton>
                    )}
                </S.ButtonWrapper>
                {character.isUsed && <S.UsingIcon alt="using_icon" src="/icons/using_icon.svg" />}
                {isTooltipVisible && character.job?.name !== JOB_NAME.메이플M && (
                    <S.DeleteButton
                        onClick={(e) => {
                            _delete(character.nickname);
                            e.stopPropagation();
                        }}
                    >
                        <img src="/icons/x_icon.svg" alt="x_icon"></img>
                    </S.DeleteButton>
                )}
            </S.Container>
            {isTooltipVisible && (
                <Tooltip position={tooltipPosition}>
                    {JOB_MAP[character.job?.name!].ability.toString(
                        character.job?.ability[getGradeFromCharacterLevel(character)] ?? 0
                    )}
                </Tooltip>
            )}
        </>
    );
}
