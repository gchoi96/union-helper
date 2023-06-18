import Position from "@/core/classes/Position";
import UnionBoard from "@/core/classes/UnionBoard";
import { CELL_STATUS } from "@/core/enums";
import { MouseEventHandler, useState } from "react";
import Cell from "../Cell/Cell";

interface DragStatus {
    isDragging: boolean;
    history: Element[];
}

export default function Board() {
    const [unionBoard] = useState(new UnionBoard());

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
        <div onMouseDown={handleDragStart} onMouseUp={handleDragOver} onMouseMove={handleDrag}>
            {unionBoard.board.map((row, rIdx) => (
                <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                        <Cell
                            status={cell.status}
                            key={`${rIdx}_${cIdx}`}
                            handleClick={() => toggleCellStatus(rIdx, cIdx)}
                        />
                    ))}
                </tr>
            ))}
        </div>
    );
}
