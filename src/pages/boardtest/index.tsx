import UnionBoard from "@core/classes/Board";
import { calcUnionGrade } from "@core/utils";
import { useEffect, useRef } from "react";

export default function InitBoardTest() {
    useEffect(() => {
        new UnionBoard(calcUnionGrade(3500)).t_display();
    });
    return <div style={{ width: "100vw", height: "100vh", padding: "10%" }}></div>;
}
