import useBoard from "#hooks/useBoard";
import { CELL_STATUS } from "#enums/status";
import { MESSAGE } from "#constants/strings";
import { useState } from "react";
import useCharacterList from "#hooks/useCharacterList";
import { Cell } from "#components/units/Cell";
import { Block } from "#classes/Block";
import useTooltip from "#hooks/useTooltip";
import { Tooltip } from "#components/commons/Tooltip";
import * as S from "./styles";
import { useAlert } from "#hooks/useAlert";
export function Board() {
    const { removeBlocks, board, changeCellStatus, getSelectedCount } = useBoard();
    const { getOccupiableSize } = useCharacterList();
    const [dragStatus, setDragStatus] = useState({ dragging: false, target: CELL_STATUS.NOT_SELECTED });
    const [hoveredBlock, setHoveredBlock] = useState<Block | null>(null);
    const { isTooltipVisible, containerRef, tooltipPosition } = useTooltip();
    const alert = useAlert();
    const onMouseDown = (rIdx: number, cIdx: number) => () => {
        removeBlocks();
        setDragStatus({
            dragging: true,
            target: [CELL_STATUS.PLACED, CELL_STATUS.SELECTED].includes(board[rIdx][cIdx].status)
                ? CELL_STATUS.SELECTED
                : CELL_STATUS.NOT_SELECTED,
        });
        toggleCellStatus(rIdx, cIdx)();
    };

    const onMouseUp = () => setDragStatus({ dragging: false, target: CELL_STATUS.NOT_SELECTED });

    const toggleCellStatus = (rIdx: number, cIdx: number) => () => {
        const prevStatus = board[rIdx][cIdx].status;
        const nextStatus = prevStatus !== CELL_STATUS.NOT_SELECTED ? CELL_STATUS.NOT_SELECTED : CELL_STATUS.SELECTED;
        if (nextStatus === CELL_STATUS.SELECTED && getSelectedCount() + 1 > getOccupiableSize()) {
            alert(MESSAGE.ALREADY_SELECT_MAXIMUM_COUNT);
            setDragStatus({ dragging: false, target: CELL_STATUS.NOT_SELECTED });
            return;
        }
        changeCellStatus({ rIdx, cIdx, status: nextStatus });
    };

    const onMouseEnter = (rIdx: number, cIdx: number) => {
        if (!dragStatus.dragging || board[rIdx][cIdx].status !== dragStatus.target) return;
        toggleCellStatus(rIdx, cIdx)();
    };

    const onHover = (rIdx: number, cIdx: number) => {
        setHoveredBlock(board[rIdx][cIdx].occupyingBlock ?? null);
    };

    return (
        <S.Container>
            <S.Board onMouseLeave={() => setHoveredBlock(null)} ref={containerRef}>
                {board.map((row, rIdx) => (
                    <div>
                        {row.map((cell, cIdx) => (
                            <Cell
                                draggable={false}
                                id={`${rIdx}_${cIdx}`}
                                key={`${rIdx}_${cIdx}`}
                                data={cell}
                                isHovered={!!(cell.occupyingBlock && cell.occupyingBlock === hoveredBlock)}
                                onMouseUp={onMouseUp}
                                onMouseDown={onMouseDown(rIdx, cIdx)}
                                onMouseEnter={() => {
                                    onMouseEnter(rIdx, cIdx);
                                    onHover(rIdx, cIdx);
                                }}
                            />
                        ))}
                    </div>
                ))}
            </S.Board>
            {hoveredBlock && isTooltipVisible && (
                <Tooltip position={tooltipPosition}>
                    <S.Tooltip.Container>
                        <S.Tooltip.Image url={hoveredBlock.character.image} />
                        <S.Tooltip.TextWrapper>
                            <p>{`Lv.${hoveredBlock?.character.level}`}</p>
                            <p>{hoveredBlock?.character.job?.name}</p>
                            <p>{hoveredBlock?.character.nickname}</p>
                        </S.Tooltip.TextWrapper>
                    </S.Tooltip.Container>
                </Tooltip>
            )}
        </S.Container>
    );
}
