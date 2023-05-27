import { UnionGrade } from "@core/types/UnionGrade";
export const UNION_BOARD_WIDTH = 22;
export const UNION_BOARD_HEIGHT = 20;
export const DEFAULT_AREA_WIDTH = 6;
export const DEFAULT_AREA_HEIGHT = 5;
export const SELECT_WORLD_CHARACTER = "월드/캐릭터";
export const DEFAULT_OCCUPATION_LEVEL = 6;
export const UNION_GRADE: Readonly<{ [key: string]: UnionGrade }> = {
    NO_GRADE: {
        blockCount: 0,
        occupiableLevel: 0,
    },
    NOVICE_1: {
        blockCount: 9,
        occupiableLevel: 0,
    },
    NOVICE_2: {
        blockCount: 10,
        occupiableLevel: 0,
    },
    NOVICE_3: {
        blockCount: 11,
        occupiableLevel: 0,
    },
    NOVICE_4: {
        blockCount: 12,
        occupiableLevel: 1,
    },
    NOVICE_5: {
        blockCount: 13,
        occupiableLevel: 1,
    },
    VETERAN_1: {
        blockCount: 18,
        occupiableLevel: 2,
    },
    VETERAN_2: {
        blockCount: 19,
        occupiableLevel: 2,
    },
    VETERAN_3: {
        blockCount: 20,
        occupiableLevel: 3,
    },
    VETERAN_4: {
        blockCount: 21,
        occupiableLevel: 3,
    },
    VETERAN_5: {
        blockCount: 22,
        occupiableLevel: 4,
    },
    MASTER_1: {
        blockCount: 27,
        occupiableLevel: 4,
    },
    MASTER_2: {
        blockCount: 28,
        occupiableLevel: 5,
    },
    MASTER_3: {
        blockCount: 29,
        occupiableLevel: 5,
    },
    MASTER_4: {
        blockCount: 30,
        occupiableLevel: 5,
    },
    MASTER_5: {
        blockCount: 31,
        occupiableLevel: 5,
    },
    GRANDMASTER_1: {
        blockCount: 36,
        occupiableLevel: 5,
    },
    GRANDMASTER_2: {
        blockCount: 37,
        occupiableLevel: 5,
    },
    GRANDMASTER_3: {
        blockCount: 38,
        occupiableLevel: 5,
    },
    GRANDMASTER_4: {
        blockCount: 39,
        occupiableLevel: 5,
    },
    GRANDMASTER_5: {
        blockCount: 40,
        occupiableLevel: 5,
    },
    SUPREME_1: {
        blockCount: 41,
        occupiableLevel: 5,
    },
    SUPREME_2: {
        blockCount: 42,
        occupiableLevel: 5,
    },
    SUPREME_3: {
        blockCount: 43,
        occupiableLevel: 5,
    },
    SUPREME_4: {
        blockCount: 44,
        occupiableLevel: 5,
    },
    SUPREME_5: {
        blockCount: 45,
        occupiableLevel: 5,
    },
};
