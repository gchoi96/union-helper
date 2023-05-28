import { UnionGrade } from "@core/types/UnionGrade";
import { JOB, JOB_GROUP } from "./enums";
import { JobInfo } from "./types/JobInfo";

export const UNION_BOARD_WIDTH = 22;
export const UNION_BOARD_HEIGHT = 20;
export const DEFAULT_AREA_WIDTH = 6;
export const DEFAULT_AREA_HEIGHT = 5;
export const SELECT_WORLD_CHARACTER = "월드/캐릭터";
export const DEFAULT_OCCUPATION_LEVEL = 6;

export const ERROR: Readonly<{ [key: string]: string }> = {
    BLOCK_IN_USE: "Block is already in use",
    INVALID_CHARACTER: "Invalid character information"
};

export const JOB_MAP: Readonly<{ [key: string]: JobInfo }> = {
    파이터: { name: JOB.히어로, group: JOB_GROUP.전사 },
    크루세이더: { name: JOB.히어로, group: JOB_GROUP.전사 },
    히어로: { name: JOB.히어로, group: JOB_GROUP.전사 },
    페이지: { name: JOB.팔라딘, group: JOB_GROUP.전사 },
    나이트: { name: JOB.팔라딘, group: JOB_GROUP.전사 },
    팔라딘: { name: JOB.팔라딘, group: JOB_GROUP.전사 },
    스피어맨: { name: JOB.다크나이트, group: JOB_GROUP.전사 },
    버서커: { name: JOB.다크나이트, group: JOB_GROUP.전사 },
    다크나이트: { name: JOB.다크나이트, group: JOB_GROUP.전사 },
    "위자드(불,독)": { name: JOB["아크메이지(불,독)"], group: JOB_GROUP.마법사 },
    "메이지(불,독)": { name: JOB["아크메이지(불,독)"], group: JOB_GROUP.마법사 },
    "아크메이지(불,독)": { name: JOB["아크메이지(불,독)"], group: JOB_GROUP.마법사 },
    "위자드(썬,콜)": { name: JOB["아크메이지(썬,콜)"], group: JOB_GROUP.마법사 },
    "메이지(썬,콜)": { name: JOB["아크메이지(썬,콜)"], group: JOB_GROUP.마법사 },
    "아크메이지(썬,콜)": { name: JOB["아크메이지(썬,콜)"], group: JOB_GROUP.마법사 },
    클레릭: { name: JOB.비숍, group: JOB_GROUP.마법사 },
    프리스트: { name: JOB.비숍, group: JOB_GROUP.마법사 },
    비숍: { name: JOB.비숍, group: JOB_GROUP.마법사 },
    헌터: { name: JOB.보우마스터, group: JOB_GROUP.궁수 },
    레인저: { name: JOB.보우마스터, group: JOB_GROUP.궁수 },
    보우마스터: { name: JOB.보우마스터, group: JOB_GROUP.궁수 },
    사수: { name: JOB.신궁, group: JOB_GROUP.궁수 },
    저격수: { name: JOB.신궁, group: JOB_GROUP.궁수 },
    신궁: { name: JOB.신궁, group: JOB_GROUP.궁수 },
    체이서: { name: JOB.패스파인더, group: JOB_GROUP.궁수 },
    "에인션트 아처": { name: JOB.패스파인더, group: JOB_GROUP.궁수 },
    패스파인더: { name: JOB.패스파인더, group: JOB_GROUP.궁수 },
    어쌔신: { name: JOB.나이트로드, group: JOB_GROUP.도적 },
    허밋: { name: JOB.나이트로드, group: JOB_GROUP.도적 },
    나이트로드: { name: JOB.나이트로드, group: JOB_GROUP.도적 },
    시프: { name: JOB.섀도어, group: JOB_GROUP.도적 },
    시프마스터: { name: JOB.섀도어, group: JOB_GROUP.도적 },
    섀도어: { name: JOB.섀도어, group: JOB_GROUP.도적 },
    듀얼블레이드: { name: JOB.듀얼블레이더, group: JOB_GROUP.도적 },
    세미듀어러: { name: JOB.듀얼블레이더, group: JOB_GROUP.도적 },
    듀어러: { name: JOB.듀얼블레이더, group: JOB_GROUP.도적 },
    듀얼마스터: { name: JOB.듀얼블레이더, group: JOB_GROUP.도적 },
    슬래셔: { name: JOB.듀얼블레이더, group: JOB_GROUP.도적 },
    듀얼블레이더: { name: JOB.듀얼블레이더, group: JOB_GROUP.도적 },
    인파이터: { name: JOB.바이퍼, group: JOB_GROUP.해적 },
    버커니어: { name: JOB.바이퍼, group: JOB_GROUP.해적 },
    바이퍼: { name: JOB.바이퍼, group: JOB_GROUP.해적 },
    건슬링거: { name: JOB.캡틴, group: JOB_GROUP.해적 },
    발키리: { name: JOB.캡틴, group: JOB_GROUP.해적 },
    캡틴: { name: JOB.캡틴, group: JOB_GROUP.해적 },
    캐논슈터: { name: JOB.캐논슈터, group: JOB_GROUP.해적 },
    캐논블래스터: { name: JOB.캐논슈터, group: JOB_GROUP.해적 },
    캐논마스터: { name: JOB.캐논슈터, group: JOB_GROUP.해적 },
    소울마스터: { name: JOB.소울마스터, group: JOB_GROUP.전사 },
    플레임위자드: { name: JOB.플레임위자드, group: JOB_GROUP.마법사 },
    윈드브레이커: { name: JOB.윈드브레이커, group: JOB_GROUP.궁수 },
    나이트워커: { name: JOB.나이트워커, group: JOB_GROUP.도적 },
    스트라이커: { name: JOB.스트라이커, group: JOB_GROUP.해적 },
    미하일: { name: JOB.미하일, group: JOB_GROUP.전사 },
    블래스터: { name: JOB.블래스터, group: JOB_GROUP.전사 },
    배틀메이지: { name: JOB.배틀메이지, group: JOB_GROUP.마법사 },
    와일드헌터: { name: JOB.와일드헌터, group: JOB_GROUP.궁수 },
    메카닉: { name: JOB.메카닉, group: JOB_GROUP.해적 },
    데몬슬레이어: { name: JOB.데몬슬레이어, group: JOB_GROUP.전사 },
    데몬어벤져: { name: JOB.데몬어벤져, group: JOB_GROUP.전사 },
    제논: { name: JOB.제논, group: JOB_GROUP.제논 },
    아란: { name: JOB.아란, group: JOB_GROUP.전사 },
    에반: { name: JOB.에반, group: JOB_GROUP.마법사 },
    메르세데스: { name: JOB.메르세데스, group: JOB_GROUP.궁수 },
    팬텀: { name: JOB.팬텀, group: JOB_GROUP.도적 },
    은월: { name: JOB.은월, group: JOB_GROUP.해적 },
    루미너스: { name: JOB.루미너스, group: JOB_GROUP.마법사 },
    카이저: { name: JOB.카이저, group: JOB_GROUP.전사 },
    카인: { name: JOB.카인, group: JOB_GROUP.궁수 },
    카데나: { name: JOB.카데나, group: JOB_GROUP.도적 },
    엔젤릭버스터: { name: JOB.엔젤릭버스터, group: JOB_GROUP.해적 },
    아델: { name: JOB.아델, group: JOB_GROUP.전사 },
    일리움: { name: JOB.일리움, group: JOB_GROUP.마법사 },
    칼리: { name: JOB.칼리, group: JOB_GROUP.도적 },
    아크: { name: JOB.아크, group: JOB_GROUP.해적 },
    라라: { name: JOB.라라, group: JOB_GROUP.마법사 },
    호영: { name: JOB.호영, group: JOB_GROUP.도적 },
    제로: { name: JOB.제로, group: JOB_GROUP.전사 },
    키네시스: { name: JOB.키네시스, group: JOB_GROUP.마법사 },
};

export const UNION_GRADE: { [key: string]: UnionGrade } = {
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
