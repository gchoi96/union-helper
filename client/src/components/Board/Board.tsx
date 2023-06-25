import Position from "@/core/classes/Position";
import UnionBoard from "@/core/classes/UnionBoard";
import { UNION_BOARD_WIDTH } from "@/core/constants";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Cell from "../Cell/Cell";
import { Container, Table } from "./Board.styles";

interface DragStatus {
    isDragging: boolean;
    history: Element[];
}

export default function Board() {
    const [unionBoard] = useState(new UnionBoard());
    const tableRef = useRef<HTMLTableElement>(null);

    const [dragStatus, setDragStatus] = useState<DragStatus>({ isDragging: false, history: [] });
    const handleDragStart = () => setDragStatus({ isDragging: true, history: [] });
    const handleDragOver = () => setDragStatus((prev) => ({ ...prev, isDragging: false }));
    const handleDrag: MouseEventHandler<HTMLDivElement> = (e) => {
        if (!dragStatus.isDragging) return;
        const { clientX, clientY } = e;
        const elementAtMouse = document.elementFromPoint(clientX, clientY);
        if (!elementAtMouse) return;
        if (dragStatus.history.includes(elementAtMouse)) return;
        setDragStatus((prev) => ({ ...prev, history: [...prev.history, elementAtMouse] }));
        (elementAtMouse as HTMLTableDataCellElement).click();
    };
    const toggleCellStatus = (rIdx: number, cIdx: number) => unionBoard.toggleStatus(new Position(rIdx, cIdx));

    return (
        <Container>
            <Table
                onMouseDown={handleDragStart}
                onMouseUp={handleDragOver}
                onMouseMove={handleDrag}
                ref={tableRef}
                width={`48.4rem`}
                height={`44rem`}
            >
                {unionBoard.board.map((row, rIdx) => (
                    <div key={rIdx}>
                        {row.map((cell, cIdx) => (
                            <Cell
                                size={`2.2rem`}
                                status={cell.status}
                                key={`${rIdx}_${cIdx}`}
                                handleClick={() => toggleCellStatus(rIdx, cIdx)}
                            />
                        ))}
                    </div>
                ))}
            </Table>
        </Container>
    );
}
