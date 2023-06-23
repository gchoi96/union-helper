import { JOB_MAP } from "@/core/constants";
import { ERROR, JOB_GROUP } from "@/core/enums";
import {
    ArcherBlock,
    Block,
    MageBlock,
    PirateBlock,
    RogueBlock,
    WarriorBlock,
    XenonBlock,
} from "../Block";

describe("블럭 생성", () => {
    const characterInfo = {
        level: 30,
        nickname: "진부령박스카",
        job: JOB_MAP.섀도어,
        image: "http://이미지.com",
    };
    test("전사 블럭 생성", () => {
        characterInfo.job.group = JOB_GROUP.전사;
        expect(Block.blockFactory(characterInfo) instanceof WarriorBlock).toBe(true);
    });

    test("마법사 블럭 생성", () => {
        characterInfo.job.group = JOB_GROUP.마법사;
        expect(Block.blockFactory(characterInfo) instanceof MageBlock).toBe(true);
    });

    test("궁수 블럭 생성", () => {
        characterInfo.job.group = JOB_GROUP.궁수;
        expect(Block.blockFactory(characterInfo) instanceof ArcherBlock).toBe(true);
    });

    test("도적 블럭 생성", () => {
        characterInfo.job.group = JOB_GROUP.도적;
        expect(Block.blockFactory(characterInfo) instanceof RogueBlock).toBe(true);
    });

    test("해적 블럭 생성", () => {
        characterInfo.job.group = JOB_GROUP.해적;
        expect(Block.blockFactory(characterInfo) instanceof PirateBlock).toBe(true);
    });

    test("제논 블럭 생성", () => {
        characterInfo.job.group = JOB_GROUP.제논;
        expect(Block.blockFactory(characterInfo) instanceof XenonBlock).toBe(true);
    });

    test("요청 실패한 응답으로 블럭 생성", () => {
        const failureResponse = { ...characterInfo, job: undefined };
        expect(() => {
            Block.blockFactory(failureResponse);
        }).toThrow(ERROR.INVALID_CHARACTER);
    });
});

describe("블럭 레벨 계산", () => {
    const characterInfo = {
        level: 30,
        nickname: "진부령박스카",
        job: JOB_MAP.섀도어,
        image: "http://이미지.com",
    };
    test("블럭 레벨 계산 : 30", () => {
        characterInfo.level = 30;
        expect(Block.blockFactory(characterInfo).level).toBe(1);
    });

    test("블럭 레벨 계산 : 80", () => {
        characterInfo.level = 80;
        expect(Block.blockFactory(characterInfo).level).toBe(1);
    });

    test("블럭 레벨 계산 : 141", () => {
        characterInfo.level = 141;
        expect(Block.blockFactory(characterInfo).level).toBe(3);
    });

    test("블럭 레벨 계산 : 262", () => {
        characterInfo.level = 262;
        expect(Block.blockFactory(characterInfo).level).toBe(5);
    });
});
