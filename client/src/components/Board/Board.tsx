import Position from "@/core/classes/Position";
import UnionBoard from "@/core/classes/UnionBoard";
import { UNION_BOARD_WIDTH } from "@/core/constants";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Cell from "../Cell/Cell";

interface DragStatus {
    isDragging: boolean;
    history: Element[];
}

export default function Board() {
    const [unionBoard] = useState(new UnionBoard());
    const tableRef = useRef<HTMLTableElement>(null);
    const [cellSize, setCellSize] = useState(45);

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const [dragStatus, setDragStatus] = useState<DragStatus>({ isDragging: false, history: [] });
    const handleDragStart = () => setDragStatus({ isDragging: true, history: [] });
    const handleDragOver = () => setDragStatus((prev) => ({ ...prev, isDragging: false }));
    const handleResize = () => {
        const table = tableRef.current;
        if (!table) return;
        setCellSize(table.offsetWidth / UNION_BOARD_WIDTH);
    };
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
        <div
            onMouseDown={handleDragStart}
            onMouseUp={handleDragOver}
            onMouseMove={handleDrag}
            ref={tableRef}
            style={{ width: "100%" }}
        >
            {unionBoard.board.map((row, rIdx) => (
                <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                        <Cell
                            size={cellSize}
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
