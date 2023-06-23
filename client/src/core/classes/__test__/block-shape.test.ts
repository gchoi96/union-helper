import { JOB_MAP } from "@/core/constants";
import { JOB_GROUP } from "@/core/enums";
import { Block } from "../Block";
import { mageLv1Shapes, rogueLv4Shapes } from "./block-shape.testdata";

describe("블럭 모양", () => {
    const characterInfo = {
        level: 250,
        nickname: "진부령박스카",
        job: JOB_MAP.섀도어,
        image: "http://이미지.com",
    };

    test("블럭 모양: 마법사 lv1", () => {
        characterInfo.level = 60;
        characterInfo.job.group = JOB_GROUP.마법사;
        expect(Block.blockFactory(characterInfo).shapes).toEqual(mageLv1Shapes);
    });

    test("블럭 모양: 도적 lv4", () => {
        characterInfo.level = 250;
        characterInfo.job.group = JOB_GROUP.도적;
        expect(Block.blockFactory(characterInfo).shapes).toEqual(rogueLv4Shapes);
    });
});
