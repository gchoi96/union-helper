import { UNION_GRADE } from "@core/constants";
import { calcUnionGrade, extractCharacterList } from "@core/utils";

//#region calculate union grade
it("calculate union grade correctly(0)", () => {
    expect(calcUnionGrade(0)).toBe(UNION_GRADE.NO_GRADE);
});

it("calculate union grade correctly(100)", () => {
    expect(calcUnionGrade(100)).toBe(UNION_GRADE.NO_GRADE);
});

it("calculate union grade correctly(500)", () => {
    expect(calcUnionGrade(500)).toBe(UNION_GRADE.NOVICE_1);
});

it("calculate union grade correctly(3000)", () => {
    expect(calcUnionGrade(3000)).toBe(UNION_GRADE.VETERAN_1);
});

it("calculate union grade correctly(3999)", () => {
    expect(calcUnionGrade(3999)).toBe(UNION_GRADE.VETERAN_2);
});

it("calculate union grade correctly(12500)", () => {
    expect(calcUnionGrade(12500)).toBe(UNION_GRADE.SUPREME_5);
});

it("calculate union grade correctly(12700)", () => {
    expect(calcUnionGrade(12700)).toBe(UNION_GRADE.SUPREME_5);
});

it("calculate union grade correctly(12700)", () => {
    expect(calcUnionGrade(12700)).toBe(UNION_GRADE.SUPREME_5);
});
//#endregion

//#region extract character list from copied text
it("extract character list", () => {
    expect(extractCharacterList(process.env.MYPAGE_TEXT!)).toEqual([
        "진부령박스카",
        "윤웨이97",
        "27482913",
        "632817936128",
        "성비먹는하마",
        "213123122121",
        "534758437589",
        "967891236492",
        "123712893712",
        "784392237894",
        "크확이왜모잘",
        "담주에쓸방무",
        "크리왜부족해",
        "크리가아직도",
        "시드돌기시러",
        "03150247",
        "궁수하기시러",
        "BOOSTCAMPWM7",
        "뎀스어케바꿈",
        "크리뎀오퍼센",
        "이법십프지로",
        "여3축공0마",
        "확1률뎀6증",
        "방5어무퍼시",
        "혜지야힐좀써",
        "12121442231",
        "시드진짜싫어",
        "결정석맛있다",
        "뎀1증6퍼센트",
        "팹시제로자몽",
        "플위는텔포없",
        "세르원킬좀하",
        "코카제로자몽",
        "AsaShiho",
    ]);
});
//#endregion
