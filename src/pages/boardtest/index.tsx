import { Block } from "@/core/classes/Block";
import { JOB_MAP } from "@/core/constants";
import UnionBoard from "@core/classes/UnionBoard";
import { calcUnionGrade } from "@core/utils";
import { useEffect, useRef } from "react";

export default function InitBoardTest() {
    useEffect(() => {
        new UnionBoard(calcUnionGrade(3500)).t_display();
        console.log(Block.createBlock({
            nickName: "asd",
            job: JOB_MAP.나이트로드,
            level: 200,
            image: "",
        }))
    });
    return <div style={{ width: "100vw", height: "100vh", padding: "10%" }}></div>;
}
