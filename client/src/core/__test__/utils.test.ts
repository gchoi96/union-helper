import { JOB_MAP, UNION_GRADE } from "@core/constants";
import {
    calcUnionGrade,
    convertResponseToCharacterInfo,
    extractCharacterList,
} from "@core/utils";
import { ERROR } from "../enums";
import { CharacterInfo } from "../types/CharacterInfo";
import { FetchCharacterInfoResponse } from "../types/Response";
import { extractCharacterListResult } from "./utils.data";

//#region calculate union grade
describe("calcUnionGrade", () => {
    test("유니온 등급 계산 : -1", () =>
        expect(calcUnionGrade(0)).toBe(UNION_GRADE.NO_GRADE));

    test("유니온 등급 계산 : 0)", () =>
        expect(calcUnionGrade(0)).toBe(UNION_GRADE.NO_GRADE));

    test("유니온 등급 계산 : 100)", () =>
        expect(calcUnionGrade(100)).toBe(UNION_GRADE.NO_GRADE));

    test("유니온 등급 계산 : 500)", () =>
        expect(calcUnionGrade(500)).toBe(UNION_GRADE.NOVICE_1));

    test("유니온 등급 계산 : 3000)", () =>
        expect(calcUnionGrade(3000)).toBe(UNION_GRADE.VETERAN_1));

    test("유니온 등급 계산 : 3999)", () =>
        expect(calcUnionGrade(3999)).toBe(UNION_GRADE.VETERAN_2));

    test("유니온 등급 계산 : 12500)", () =>
        expect(calcUnionGrade(12500)).toBe(UNION_GRADE.SUPREME_5));

    test("유니온 등급 계산 : 12700)", () =>
        expect(calcUnionGrade(12700)).toBe(UNION_GRADE.SUPREME_5));
});
//#endregion
//#region extract character list from copied text
describe("extractCharacterList", () => {
    test("캐릭터 목록 생성: 정상 문자열", () =>
        expect(extractCharacterList(process.env.MYPAGE_TEXT!)).toStrictEqual(
            extractCharacterListResult
        ));
    test("캐릭터 목록 생성: 빈 문자열", () => {
        expect(() => extractCharacterList("")).toThrowError(ERROR.INVALID_COPIED_TEXT);
    });

    test("캐릭터 목록 생성: 형식이 다른 문자열", () => {
        const str =
            "The Promise.allSettled() static method takes an iterable of promises as input and returns a single Promise. This returned promise fulfills when all of the input's promises settle (including when an empty iterable is passed), with an array of objects that describe the outcome of each promise.";
        expect(() => extractCharacterList(str)).toThrowError(ERROR.INVALID_COPIED_TEXT);
    });
});
//#endregion
//#region convert Response to CharacterInfo
describe("convertResponseToCharacterInfo", () => {
    test("서버 응답 -> CharacterInfo 타입으로 변환 : 성공한 응답", () => {
        const res: FetchCharacterInfoResponse = {
            nickname: "진부령박스카",
            level: "262",
            image: "https://이미지.com",
            job: "섀도어",
        };

        const info: CharacterInfo = {
            nickname: "진부령박스카",
            level: 262,
            image: "https://이미지.com",
            job: JOB_MAP.섀도어,
        };

        expect(convertResponseToCharacterInfo(res)).toEqual(info);
    });
    test("서버 응답 -> CharacterInfo 타입으로 변환 : 실패한 응답", () => {
        const res: FetchCharacterInfoResponse = {
            nickname: "진부령박스카",
            level: "",
            image: "",
            job: "",
        };

        const info = {
            nickname: "진부령박스카",
            level: 0,
            image: "",
            job: undefined,
        };

        expect(convertResponseToCharacterInfo(res)).toEqual(info);
    });
});
//#endregion
