import { UnionGrade } from "#types/unionGrade";
import Position from "#classes/Position";
import { EXTERNAL_AREA } from "#enums/externalArea";
import { ExternalArea } from "#types/externalArea";
import { JOB_GROUP, JOB_NAME } from "#enums/job";
import JobDetail from "#types/job";
import { Ability } from "#types/ability";

export const UNION_GRADE_MAP: { [key: string]: UnionGrade } = {
    NO_GRADE: {
        text: "유니온 비활성화",
        blockCount: 0,
        occupiableLevel: 0,
    },
    NOVICE_1: {
        text: "노비스 유니온 I",
        blockCount: 9,
        occupiableLevel: 0,
    },
    NOVICE_2: {
        text: "노비스 유니온 II",
        blockCount: 10,
        occupiableLevel: 0,
    },
    NOVICE_3: {
        text: "노비스 유니온 III",
        blockCount: 11,
        occupiableLevel: 0,
    },
    NOVICE_4: {
        text: "노비스 유니온 IV",
        blockCount: 12,
        occupiableLevel: 1,
    },
    NOVICE_5: {
        text: "노비스 유니온 V",
        blockCount: 13,
        occupiableLevel: 1,
    },
    VETERAN_1: {
        text: "베테랑 유니온 I",
        blockCount: 18,
        occupiableLevel: 2,
    },
    VETERAN_2: {
        text: "베테랑 유니온 II",
        blockCount: 19,
        occupiableLevel: 2,
    },
    VETERAN_3: {
        text: "베테랑 유니온 III",
        blockCount: 20,
        occupiableLevel: 3,
    },
    VETERAN_4: {
        text: "베테랑 유니온 IV",
        blockCount: 21,
        occupiableLevel: 3,
    },
    VETERAN_5: {
        text: "베테랑 유니온 V",
        blockCount: 22,
        occupiableLevel: 4,
    },
    MASTER_1: {
        text: "마스터 유니온 I",
        blockCount: 27,
        occupiableLevel: 4,
    },
    MASTER_2: {
        text: "마스터 유니온 II",
        blockCount: 28,
        occupiableLevel: 5,
    },
    MASTER_3: {
        text: "마스터 유니온 III",
        blockCount: 29,
        occupiableLevel: 5,
    },
    MASTER_4: {
        text: "마스터 유니온 IV",
        blockCount: 30,
        occupiableLevel: 5,
    },
    MASTER_5: {
        text: "마스터 유니온 V",
        blockCount: 31,
        occupiableLevel: 5,
    },
    GRANDMASTER_1: {
        text: "그랜드 마스터 유니온 I",
        blockCount: 36,
        occupiableLevel: 5,
    },
    GRANDMASTER_2: {
        text: "그랜드 마스터 유니온 II",
        blockCount: 37,
        occupiableLevel: 5,
    },
    GRANDMASTER_3: {
        text: "그랜드 마스터 유니온 III",
        blockCount: 38,
        occupiableLevel: 5,
    },
    GRANDMASTER_4: {
        text: "그랜드 마스터 유니온 IV",
        blockCount: 39,
        occupiableLevel: 5,
    },
    GRANDMASTER_5: {
        text: "그랜드 마스터 유니온 V",
        blockCount: 40,
        occupiableLevel: 5,
    },
    SUPREME_1: {
        text: "슈프림 유니온 I",
        blockCount: 41,
        occupiableLevel: 5,
    },
    SUPREME_2: {
        text: "슈프림 유니온 II",
        blockCount: 42,
        occupiableLevel: 5,
    },
    SUPREME_3: {
        text: "슈프림 유니온 III",
        blockCount: 43,
        occupiableLevel: 5,
    },
    SUPREME_4: {
        text: "슈프림 유니온 IV",
        blockCount: 44,
        occupiableLevel: 5,
    },
    SUPREME_5: {
        text: "슈프림 유니온 V",
        blockCount: 45,
        occupiableLevel: 5,
    },
};

const ABILITY_MAP: { [key: string]: Ability } = {
    STR: {
        toString: (value: number) => `STR ${value} 증가`,
        SSS: 100,
        SS: 80,
        S: 40,
        A: 20,
        B: 10,
    },
    INT: {
        toString: (value: number) => `INT ${value} 증가`,
        SSS: 100,
        SS: 80,
        S: 40,
        A: 20,
        B: 10,
    },
    DEX: {
        toString: (value: number) => `DEX ${value} 증가`,
        SSS: 100,
        SS: 80,
        S: 40,
        A: 20,
        B: 10,
    },
    LUK: {
        toString: (value: number) => `LUK ${value} 증가`,
        SSS: 100,
        SS: 80,
        S: 40,
        A: 20,
        B: 10,
    },
    HP1: {
        toString: (value: number) => `최대 HP ${value}% 증가`,
        SSS: 6,
        SS: 5,
        S: 4,
        A: 3,
        B: 2,
    },
    HP2: {
        toString: (value: number) => `최대 HP ${value} 증가`,
        SSS: 2500,
        SS: 2000,
        S: 1000,
        A: 500,
        B: 250,
    },
    MP: {
        toString: (value: number) => `최대 MP ${value}% 증가`,
        SSS: 6,
        SS: 5,
        S: 4,
        A: 3,
        B: 2,
    },
    criticalChance: {
        toString: (value: number) => `크리티컬 확률 ${value}% 증가`,
        SSS: 5,
        SS: 4,
        S: 3,
        A: 2,
        B: 1,
    },
    summonDuration: {
        toString: (value: number) => `소환수 지속 시간 ${value}% 증가`,
        SSS: 12,
        SS: 10,
        S: 8,
        A: 6,
        B: 4,
    },
    ignoreGuard: {
        toString: (value: number) => `방어율 무시 ${value}% 증가`,
        SSS: 6,
        SS: 5,
        S: 3,
        A: 2,
        B: 1,
    },
    resistance: {
        toString: (value: number) => `상태 이상 내성 ${value} 증가`,
        SSS: 5,
        SS: 4,
        S: 3,
        A: 2,
        B: 1,
    },
    chanceDamage: {
        toString: (value: number) => `공격 시 20% 확률로 데미지 ${value} 증가`,
        SSS: 20,
        SS: 16,
        S: 12,
        A: 8,
        B: 4,
    },
    buffDuration: {
        toString: (value: number) => `버프 지속 시간 ${value}% 증가`,
        SSS: 20,
        SS: 16,
        S: 12,
        A: 8,
        B: 4,
    },
    STRDEXLUK: {
        toString: (value: number) => `STR·DEX·LUK 각각 ${value} 증가`,
        SSS: 50,
        SS: 40,
        S: 20,
        A: 10,
        B: 5,
    },
    hpRecovery: {
        toString: (value: number) => `적 타격 시 70% 확률로 순수 HP의 ${value}% 회복`,
        SSS: 10,
        SS: 8,
        S: 6,
        A: 4,
        B: 2,
    },
    mpRecovery: {
        toString: (value: number) => `적 타격 시 70% 확률로 순수 MP의 ${value}% 회복`,
        SSS: 10,
        SS: 8,
        S: 6,
        A: 4,
        B: 2,
    },
    coolDown: {
        toString: (value: number) => `스킬 재사용 대기시간 ${value}% 감소`,
        SSS: 6,
        SS: 5,
        S: 4,
        A: 3,
        B: 2,
    },
    meso: {
        toString: (value: number) => `메소 획득량 ${value}% 증가`,
        SSS: 5,
        SS: 4,
        S: 3,
        A: 2,
        B: 1,
    },
    criticalDamage: {
        toString: (value: number) => `크리티컬 데지미 ${value}% 증가`,
        SSS: 6,
        SS: 5,
        S: 3,
        A: 2,
        B: 1,
    },
    exp: {
        toString: (value: number) => `경험치 획득량 ${value}% 증가`,
        SSS: 12,
        SS: 10,
        S: 8,
        A: 6,
        B: 4,
    },
    mobile: {
        toString: (value: number) => `공격력/마력 ${value} 증가`,
        SS: 20,
        S: 15,
        A: 10,
        B: 5,
    },
    bossDamage: {
        toString: (value: number) => `보스 공격 시 데미지 ${value}% 증가`,
        SSS: 6,
        SS: 5,
        S: 3,
        A: 2,
        B: 1,
    },
};

export const JOB_MAP: Readonly<{ [key: string]: JobDetail }> = {
    메이플M: { name: JOB_NAME.메이플M, group: JOB_GROUP.궁수, ability: ABILITY_MAP.mobile },
    파이터: { name: JOB_NAME.히어로, group: JOB_GROUP.전사, ability: ABILITY_MAP.STR },
    크루세이더: { name: JOB_NAME.히어로, group: JOB_GROUP.전사, ability: ABILITY_MAP.STR },
    히어로: { name: JOB_NAME.히어로, group: JOB_GROUP.전사, ability: ABILITY_MAP.STR },
    페이지: { name: JOB_NAME.팔라딘, group: JOB_GROUP.전사, ability: ABILITY_MAP.STR },
    나이트: { name: JOB_NAME.팔라딘, group: JOB_GROUP.전사, ability: ABILITY_MAP.STR },
    팔라딘: { name: JOB_NAME.팔라딘, group: JOB_GROUP.전사, ability: ABILITY_MAP.STR },
    스피어맨: { name: JOB_NAME.다크나이트, group: JOB_GROUP.전사, ability: ABILITY_MAP.HP1 },
    버서커: { name: JOB_NAME.다크나이트, group: JOB_GROUP.전사, ability: ABILITY_MAP.HP1 },
    다크나이트: { name: JOB_NAME.다크나이트, group: JOB_GROUP.전사, ability: ABILITY_MAP.HP1 },
    "위자드(불,독)": { name: JOB_NAME["아크메이지(불,독)"], group: JOB_GROUP.마법사, ability: ABILITY_MAP.MP },
    "메이지(불,독)": { name: JOB_NAME["아크메이지(불,독)"], group: JOB_GROUP.마법사, ability: ABILITY_MAP.MP },
    "아크메이지(불,독)": { name: JOB_NAME["아크메이지(불,독)"], group: JOB_GROUP.마법사, ability: ABILITY_MAP.MP },
    "위자드(썬,콜)": { name: JOB_NAME["아크메이지(썬,콜)"], group: JOB_GROUP.마법사, ability: ABILITY_MAP.INT },
    "메이지(썬,콜)": { name: JOB_NAME["아크메이지(썬,콜)"], group: JOB_GROUP.마법사, ability: ABILITY_MAP.INT },
    "아크메이지(썬,콜)": { name: JOB_NAME["아크메이지(썬,콜)"], group: JOB_GROUP.마법사, ability: ABILITY_MAP.INT },
    클레릭: { name: JOB_NAME.비숍, group: JOB_GROUP.마법사, ability: ABILITY_MAP.INT },
    프리스트: { name: JOB_NAME.비숍, group: JOB_GROUP.마법사, ability: ABILITY_MAP.INT },
    비숍: { name: JOB_NAME.비숍, group: JOB_GROUP.마법사, ability: ABILITY_MAP.INT },
    헌터: { name: JOB_NAME.보우마스터, group: JOB_GROUP.궁수, ability: ABILITY_MAP.DEX },
    레인저: { name: JOB_NAME.보우마스터, group: JOB_GROUP.궁수, ability: ABILITY_MAP.DEX },
    보우마스터: { name: JOB_NAME.보우마스터, group: JOB_GROUP.궁수, ability: ABILITY_MAP.DEX },
    사수: { name: JOB_NAME.신궁, group: JOB_GROUP.궁수, ability: ABILITY_MAP.criticalChance },
    저격수: { name: JOB_NAME.신궁, group: JOB_GROUP.궁수, ability: ABILITY_MAP.criticalChance },
    신궁: { name: JOB_NAME.신궁, group: JOB_GROUP.궁수, ability: ABILITY_MAP.criticalChance },
    체이서: { name: JOB_NAME.패스파인더, group: JOB_GROUP.궁수, ability: ABILITY_MAP.DEX },
    "에인션트 아처": { name: JOB_NAME.패스파인더, group: JOB_GROUP.궁수, ability: ABILITY_MAP.DEX },
    패스파인더: { name: JOB_NAME.패스파인더, group: JOB_GROUP.궁수, ability: ABILITY_MAP.DEX },
    어쌔신: { name: JOB_NAME.나이트로드, group: JOB_GROUP.도적, ability: ABILITY_MAP.criticalChance },
    허밋: { name: JOB_NAME.나이트로드, group: JOB_GROUP.도적, ability: ABILITY_MAP.criticalChance },
    나이트로드: { name: JOB_NAME.나이트로드, group: JOB_GROUP.도적, ability: ABILITY_MAP.criticalChance },
    시프: { name: JOB_NAME.섀도어, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    시프마스터: { name: JOB_NAME.섀도어, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    섀도어: { name: JOB_NAME.섀도어, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    듀얼블레이드: { name: JOB_NAME.듀얼블레이더, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    세미듀어러: { name: JOB_NAME.듀얼블레이더, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    듀어러: { name: JOB_NAME.듀얼블레이더, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    듀얼마스터: { name: JOB_NAME.듀얼블레이더, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    슬래셔: { name: JOB_NAME.듀얼블레이더, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    듀얼블레이더: { name: JOB_NAME.듀얼블레이더, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    인파이터: { name: JOB_NAME.바이퍼, group: JOB_GROUP.해적, ability: ABILITY_MAP.STR },
    버커니어: { name: JOB_NAME.바이퍼, group: JOB_GROUP.해적, ability: ABILITY_MAP.STR },
    바이퍼: { name: JOB_NAME.바이퍼, group: JOB_GROUP.해적, ability: ABILITY_MAP.STR },
    건슬링거: { name: JOB_NAME.캡틴, group: JOB_GROUP.해적, ability: ABILITY_MAP.summonDuration },
    발키리: { name: JOB_NAME.캡틴, group: JOB_GROUP.해적, ability: ABILITY_MAP.summonDuration },
    캡틴: { name: JOB_NAME.캡틴, group: JOB_GROUP.해적, ability: ABILITY_MAP.summonDuration },
    캐논슈터: { name: JOB_NAME.캐논슈터, group: JOB_GROUP.해적, ability: ABILITY_MAP.STR },
    캐논블래스터: { name: JOB_NAME.캐논슈터, group: JOB_GROUP.해적, ability: ABILITY_MAP.STR },
    캐논마스터: { name: JOB_NAME.캐논슈터, group: JOB_GROUP.해적, ability: ABILITY_MAP.STR },
    소울마스터: { name: JOB_NAME.소울마스터, group: JOB_GROUP.전사, ability: ABILITY_MAP.HP2 },
    플레임위자드: { name: JOB_NAME.플레임위자드, group: JOB_GROUP.마법사, ability: ABILITY_MAP.INT },
    윈드브레이커: { name: JOB_NAME.윈드브레이커, group: JOB_GROUP.궁수, ability: ABILITY_MAP.DEX },
    나이트워커: { name: JOB_NAME.나이트워커, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    스트라이커: { name: JOB_NAME.스트라이커, group: JOB_GROUP.해적, ability: ABILITY_MAP.STR },
    미하일: { name: JOB_NAME.미하일, group: JOB_GROUP.전사, ability: ABILITY_MAP.HP2 },
    블래스터: { name: JOB_NAME.블래스터, group: JOB_GROUP.전사, ability: ABILITY_MAP.ignoreGuard },
    배틀메이지: { name: JOB_NAME.배틀메이지, group: JOB_GROUP.마법사, ability: ABILITY_MAP.INT },
    와일드헌터: { name: JOB_NAME.와일드헌터, group: JOB_GROUP.궁수, ability: ABILITY_MAP.chanceDamage },
    메카닉: { name: JOB_NAME.메카닉, group: JOB_GROUP.해적, ability: ABILITY_MAP.buffDuration },
    데몬슬레이어: { name: JOB_NAME.데몬슬레이어, group: JOB_GROUP.전사, ability: ABILITY_MAP.resistance },
    데몬어벤져: { name: JOB_NAME.데몬어벤져, group: JOB_GROUP.전사, ability: ABILITY_MAP.bossDamage },
    제논: { name: JOB_NAME.제논, group: JOB_GROUP.제논, ability: ABILITY_MAP.STRDEXLUK },
    아란: { name: JOB_NAME.아란, group: JOB_GROUP.전사, ability: ABILITY_MAP.hpRecovery },
    에반: { name: JOB_NAME.에반, group: JOB_GROUP.마법사, ability: ABILITY_MAP.mpRecovery },
    메르세데스: { name: JOB_NAME.메르세데스, group: JOB_GROUP.궁수, ability: ABILITY_MAP.coolDown },
    팬텀: { name: JOB_NAME.팬텀, group: JOB_GROUP.도적, ability: ABILITY_MAP.meso },
    은월: { name: JOB_NAME.은월, group: JOB_GROUP.해적, ability: ABILITY_MAP.criticalDamage },
    루미너스: { name: JOB_NAME.루미너스, group: JOB_GROUP.마법사, ability: ABILITY_MAP.INT },
    카이저: { name: JOB_NAME.카이저, group: JOB_GROUP.전사, ability: ABILITY_MAP.STR },
    카인: { name: JOB_NAME.카인, group: JOB_GROUP.궁수, ability: ABILITY_MAP.DEX },
    카데나: { name: JOB_NAME.카데나, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    엔젤릭버스터: { name: JOB_NAME.엔젤릭버스터, group: JOB_GROUP.해적, ability: ABILITY_MAP.DEX },
    아델: { name: JOB_NAME.아델, group: JOB_GROUP.전사, ability: ABILITY_MAP.STR },
    일리움: { name: JOB_NAME.일리움, group: JOB_GROUP.마법사, ability: ABILITY_MAP.INT },
    칼리: { name: JOB_NAME.칼리, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    아크: { name: JOB_NAME.아크, group: JOB_GROUP.해적, ability: ABILITY_MAP.STR },
    라라: { name: JOB_NAME.라라, group: JOB_GROUP.마법사, ability: ABILITY_MAP.INT },
    호영: { name: JOB_NAME.호영, group: JOB_GROUP.도적, ability: ABILITY_MAP.LUK },
    제로: { name: JOB_NAME.제로, group: JOB_GROUP.전사, ability: ABILITY_MAP.exp },
    키네시스: { name: JOB_NAME.키네시스, group: JOB_GROUP.마법사, ability: ABILITY_MAP.INT },
};

export const EXTERNAL_AREA_MAP: Readonly<{ [key in EXTERNAL_AREA]: ExternalArea }> = {
    [EXTERNAL_AREA.크리티컬데미지]: {
        startPosition: new Position(9, 4),
        borderPositions: [
            new Position(0, 0),
            new Position(1, 1),
            new Position(2, 2),
            new Position(3, 3),
            new Position(4, 4),
            new Position(9, 0),
            new Position(9, 1),
            new Position(9, 2),
            new Position(9, 3),
            new Position(9, 4),
        ],
        positions: [
            new Position(9, 4),
            new Position(8, 4),
            new Position(7, 4),
            new Position(6, 4),
            new Position(5, 4),
            new Position(4, 4),
            new Position(9, 3),
            new Position(8, 3),
            new Position(7, 3),
            new Position(6, 3),
            new Position(5, 3),
            new Position(4, 3),
            new Position(3, 3),
            new Position(9, 2),
            new Position(8, 2),
            new Position(7, 2),
            new Position(6, 2),
            new Position(5, 2),
            new Position(4, 2),
            new Position(3, 2),
            new Position(2, 2),
            new Position(9, 1),
            new Position(8, 1),
            new Position(7, 1),
            new Position(6, 1),
            new Position(5, 1),
            new Position(4, 1),
            new Position(3, 1),
            new Position(2, 1),
            new Position(1, 1),
            new Position(9, 0),
            new Position(8, 0),
            new Position(7, 0),
            new Position(6, 0),
            new Position(5, 0),
            new Position(4, 0),
            new Position(3, 0),
            new Position(2, 0),
            new Position(1, 0),
            new Position(0, 0),
        ],
    },
    [EXTERNAL_AREA.방어율무시]: {
        startPosition: new Position(10, 4),
        borderPositions: [
            new Position(15, 4),
            new Position(16, 3),
            new Position(17, 2),
            new Position(18, 1),
            new Position(19, 0),
            new Position(10, 0),
            new Position(10, 1),
            new Position(10, 2),
            new Position(10, 3),
            new Position(10, 4),
        ],
        positions: [
            new Position(10, 4),
            new Position(11, 4),
            new Position(12, 4),
            new Position(13, 4),
            new Position(14, 4),
            new Position(15, 4),
            new Position(10, 3),
            new Position(11, 3),
            new Position(12, 3),
            new Position(13, 3),
            new Position(14, 3),
            new Position(15, 3),
            new Position(16, 3),
            new Position(10, 2),
            new Position(11, 2),
            new Position(12, 2),
            new Position(13, 2),
            new Position(14, 2),
            new Position(15, 2),
            new Position(16, 2),
            new Position(17, 2),
            new Position(10, 1),
            new Position(11, 1),
            new Position(12, 1),
            new Position(13, 1),
            new Position(14, 1),
            new Position(15, 1),
            new Position(16, 1),
            new Position(17, 1),
            new Position(18, 1),
            new Position(10, 0),
            new Position(11, 0),
            new Position(12, 0),
            new Position(13, 0),
            new Position(14, 0),
            new Position(15, 0),
            new Position(16, 0),
            new Position(17, 0),
            new Position(18, 0),
            new Position(19, 0),
        ],
    },
    [EXTERNAL_AREA.버프지속시간]: {
        startPosition: new Position(15, 10),
        borderPositions: [
            new Position(15, 5),
            new Position(16, 4),
            new Position(17, 3),
            new Position(18, 2),
            new Position(19, 1),
            new Position(15, 10),
            new Position(16, 10),
            new Position(17, 10),
            new Position(18, 10),
            new Position(19, 10),
        ],
        positions: [
            new Position(15, 10),
            new Position(15, 9),
            new Position(15, 8),
            new Position(15, 7),
            new Position(15, 6),
            new Position(15, 5),
            new Position(16, 10),
            new Position(16, 9),
            new Position(16, 8),
            new Position(16, 7),
            new Position(16, 6),
            new Position(16, 5),
            new Position(16, 4),
            new Position(17, 10),
            new Position(17, 9),
            new Position(17, 8),
            new Position(17, 7),
            new Position(17, 6),
            new Position(17, 5),
            new Position(17, 4),
            new Position(17, 3),
            new Position(18, 10),
            new Position(18, 9),
            new Position(18, 8),
            new Position(18, 7),
            new Position(18, 6),
            new Position(18, 5),
            new Position(18, 4),
            new Position(18, 3),
            new Position(18, 2),
            new Position(19, 10),
            new Position(19, 9),
            new Position(19, 8),
            new Position(19, 7),
            new Position(19, 6),
            new Position(19, 5),
            new Position(19, 4),
            new Position(19, 3),
            new Position(19, 2),
            new Position(19, 1),
        ],
    },
    [EXTERNAL_AREA.일반데미지]: {
        startPosition: new Position(15, 11),
        borderPositions: [
            new Position(15, 16),
            new Position(16, 17),
            new Position(17, 18),
            new Position(18, 19),
            new Position(19, 20),
            new Position(15, 11),
            new Position(16, 11),
            new Position(17, 11),
            new Position(18, 11),
            new Position(19, 11),
        ],
        positions: [
            new Position(15, 11),
            new Position(15, 12),
            new Position(15, 13),
            new Position(15, 14),
            new Position(15, 15),
            new Position(15, 16),
            new Position(16, 11),
            new Position(16, 12),
            new Position(16, 13),
            new Position(16, 14),
            new Position(16, 15),
            new Position(16, 16),
            new Position(16, 17),
            new Position(17, 11),
            new Position(17, 12),
            new Position(17, 13),
            new Position(17, 14),
            new Position(17, 15),
            new Position(17, 16),
            new Position(17, 17),
            new Position(17, 18),
            new Position(18, 11),
            new Position(18, 12),
            new Position(18, 13),
            new Position(18, 14),
            new Position(18, 15),
            new Position(18, 16),
            new Position(18, 17),
            new Position(18, 18),
            new Position(18, 19),
            new Position(19, 11),
            new Position(19, 12),
            new Position(19, 13),
            new Position(19, 14),
            new Position(19, 15),
            new Position(19, 16),
            new Position(19, 17),
            new Position(19, 18),
            new Position(19, 19),
            new Position(19, 20),
        ],
    },
    [EXTERNAL_AREA.보스데미지]: {
        startPosition: new Position(10, 17),
        borderPositions: [
            new Position(15, 17),
            new Position(16, 18),
            new Position(17, 19),
            new Position(18, 20),
            new Position(19, 21),
            new Position(10, 17),
            new Position(10, 18),
            new Position(10, 19),
            new Position(10, 20),
            new Position(10, 21),
        ],
        positions: [
            new Position(10, 17),
            new Position(11, 17),
            new Position(12, 17),
            new Position(13, 17),
            new Position(14, 17),
            new Position(15, 17),
            new Position(10, 18),
            new Position(11, 18),
            new Position(12, 18),
            new Position(13, 18),
            new Position(14, 18),
            new Position(15, 18),
            new Position(16, 18),
            new Position(10, 19),
            new Position(11, 19),
            new Position(12, 19),
            new Position(13, 19),
            new Position(14, 19),
            new Position(15, 19),
            new Position(16, 19),
            new Position(17, 19),
            new Position(10, 20),
            new Position(11, 20),
            new Position(12, 20),
            new Position(13, 20),
            new Position(14, 20),
            new Position(15, 20),
            new Position(16, 20),
            new Position(17, 20),
            new Position(18, 20),
            new Position(10, 21),
            new Position(11, 21),
            new Position(12, 21),
            new Position(13, 21),
            new Position(14, 21),
            new Position(15, 21),
            new Position(16, 21),
            new Position(17, 21),
            new Position(18, 21),
            new Position(19, 21),
        ],
    },
    [EXTERNAL_AREA.크리티컬확률]: {
        startPosition: new Position(9, 17),
        borderPositions: [
            new Position(4, 17),
            new Position(3, 18),
            new Position(2, 19),
            new Position(1, 20),
            new Position(0, 21),
            new Position(9, 18),
            new Position(9, 17),
            new Position(9, 19),
            new Position(9, 20),
            new Position(9, 21),
        ],
        positions: [
            new Position(9, 17),
            new Position(8, 17),
            new Position(7, 17),
            new Position(6, 17),
            new Position(5, 17),
            new Position(4, 17),
            new Position(9, 18),
            new Position(8, 18),
            new Position(7, 18),
            new Position(6, 18),
            new Position(5, 18),
            new Position(4, 18),
            new Position(3, 18),
            new Position(9, 19),
            new Position(8, 19),
            new Position(7, 19),
            new Position(6, 19),
            new Position(5, 19),
            new Position(4, 19),
            new Position(3, 19),
            new Position(2, 19),
            new Position(9, 20),
            new Position(8, 20),
            new Position(7, 20),
            new Position(6, 20),
            new Position(5, 20),
            new Position(4, 20),
            new Position(3, 20),
            new Position(2, 20),
            new Position(1, 20),
            new Position(9, 21),
            new Position(8, 21),
            new Position(7, 21),
            new Position(6, 21),
            new Position(5, 21),
            new Position(4, 21),
            new Position(3, 21),
            new Position(2, 21),
            new Position(1, 21),
            new Position(0, 21),
        ],
    },
    [EXTERNAL_AREA.획득경험치]: {
        startPosition: new Position(4, 11),
        borderPositions: [
            new Position(4, 16),
            new Position(3, 17),
            new Position(2, 18),
            new Position(1, 19),
            new Position(0, 20),
            new Position(4, 11),
            new Position(3, 11),
            new Position(2, 11),
            new Position(1, 11),
            new Position(0, 11),
        ],
        positions: [
            new Position(4, 11),
            new Position(4, 12),
            new Position(4, 13),
            new Position(4, 14),
            new Position(4, 15),
            new Position(4, 16),
            new Position(3, 11),
            new Position(3, 12),
            new Position(3, 13),
            new Position(3, 14),
            new Position(3, 15),
            new Position(3, 16),
            new Position(3, 17),
            new Position(2, 11),
            new Position(2, 12),
            new Position(2, 13),
            new Position(2, 14),
            new Position(2, 15),
            new Position(2, 16),
            new Position(2, 17),
            new Position(2, 18),
            new Position(1, 11),
            new Position(1, 12),
            new Position(1, 13),
            new Position(1, 14),
            new Position(1, 15),
            new Position(1, 16),
            new Position(1, 17),
            new Position(1, 18),
            new Position(1, 19),
            new Position(0, 11),
            new Position(0, 12),
            new Position(0, 13),
            new Position(0, 14),
            new Position(0, 15),
            new Position(0, 16),
            new Position(0, 17),
            new Position(0, 18),
            new Position(0, 19),
            new Position(0, 20),
        ],
    },
    [EXTERNAL_AREA.상태이상내성]: {
        startPosition: new Position(4, 10),
        borderPositions: [
            new Position(4, 5),
            new Position(3, 4),
            new Position(2, 3),
            new Position(1, 2),
            new Position(0, 1),
            new Position(4, 10),
            new Position(3, 10),
            new Position(2, 10),
            new Position(1, 10),
            new Position(0, 10),
        ],
        positions: [
            new Position(4, 10),
            new Position(4, 9),
            new Position(4, 8),
            new Position(4, 7),
            new Position(4, 6),
            new Position(4, 5),
            new Position(3, 10),
            new Position(3, 9),
            new Position(3, 8),
            new Position(3, 7),
            new Position(3, 6),
            new Position(3, 5),
            new Position(3, 4),
            new Position(2, 10),
            new Position(2, 9),
            new Position(2, 8),
            new Position(2, 7),
            new Position(2, 6),
            new Position(2, 5),
            new Position(2, 4),
            new Position(2, 3),
            new Position(1, 10),
            new Position(1, 9),
            new Position(1, 8),
            new Position(1, 7),
            new Position(1, 6),
            new Position(1, 5),
            new Position(1, 4),
            new Position(1, 3),
            new Position(1, 2),
            new Position(0, 10),
            new Position(0, 9),
            new Position(0, 8),
            new Position(0, 7),
            new Position(0, 6),
            new Position(0, 5),
            new Position(0, 4),
            new Position(0, 3),
            new Position(0, 2),
            new Position(0, 1),
        ],
    },
};

export const AREA_BORDER_MAP = new Map([
    [new Position(1, 1), ["Top", "Right"]],
    [new Position(1, 20), ["Top", "Left"]],
    [new Position(2, 2), ["Top", "Right"]],
    [new Position(2, 19), ["Top", "Left"]],
    [new Position(3, 3), ["Top", "Right"]],
    [new Position(3, 18), ["Top", "Left"]],
    [new Position(4, 4), ["Top", "Right"]],
    [new Position(4, 17), ["Top", "Left"]],
    [new Position(5, 5), ["Top", "Right", "Left"]],
    [new Position(5, 16), ["Top", "Right", "Left"]],
    [new Position(6, 6), ["Top", "Right"]],
    [new Position(6, 15), ["Top", "Left"]],
    [new Position(7, 7), ["Top", "Right"]],
    [new Position(7, 14), ["Top", "Left"]],
    [new Position(8, 8), ["Top", "Right"]],
    [new Position(8, 13), ["Top", "Left"]],
    [new Position(9, 9), ["Top", "Bottom", "Right"]],
    [new Position(9, 12), ["Top", "Bottom", "Left"]],
    [new Position(10, 0), ["Top"]],
    [new Position(10, 1), ["Top"]],
    [new Position(10, 2), ["Top"]],
    [new Position(10, 3), ["Top"]],
    [new Position(10, 4), ["Top", "Right"]],
    [new Position(10, 5), ["Top", "Left"]],
    [new Position(10, 6), ["Top"]],
    [new Position(10, 7), ["Top"]],
    [new Position(10, 8), ["Top"]],
    [new Position(10, 9), ["Top", "Bottom", "Right"]],
    [new Position(10, 10), ["Top", "Right", "Right", "Left"]],
    [new Position(10, 11), ["Top", "Right", "Left", "Left"]],
    [new Position(10, 12), ["Top", "Bottom", "Left"]],
    [new Position(10, 13), ["Top"]],
    [new Position(10, 14), ["Top"]],
    [new Position(10, 15), ["Top"]],
    [new Position(10, 16), ["Top", "Right"]],
    [new Position(10, 17), ["Top", "Left"]],
    [new Position(10, 18), ["Top"]],
    [new Position(10, 19), ["Top"]],
    [new Position(10, 20), ["Top"]],
    [new Position(10, 21), ["Top"]],
    [new Position(11, 9), ["Top", "Left"]],
    [new Position(11, 12), ["Top", "Right"]],
    [new Position(12, 8), ["Top", "Left"]],
    [new Position(12, 13), ["Top", "Right"]],
    [new Position(13, 7), ["Top", "Left"]],
    [new Position(13, 14), ["Top", "Right"]],
    [new Position(14, 6), ["Top", "Left", "Bottom"]],
    [new Position(14, 15), ["Top", "Right", "Bottom"]],
    [new Position(15, 5), ["Top", "Left"]],
    [new Position(15, 16), ["Top", "Right"]],
    [new Position(16, 4), ["Top", "Left"]],
    [new Position(16, 17), ["Top", "Right"]],
    [new Position(17, 3), ["Top", "Left"]],
    [new Position(17, 18), ["Top", "Right"]],
    [new Position(18, 2), ["Top", "Left"]],
    [new Position(18, 19), ["Top", "Right"]],
    [new Position(19, 1), ["Top", "Left"]],
    [new Position(19, 20), ["Top", "Right"]],
    [new Position(0, 1), ["Bottom", "Left"]],
    [new Position(0, 20), ["Bottom", "Right"]],
    [new Position(1, 2), ["Bottom", "Left"]],
    [new Position(1, 19), ["Bottom", "Right"]],
    [new Position(2, 3), ["Bottom", "Left"]],
    [new Position(2, 18), ["Bottom", "Right"]],
    [new Position(3, 4), ["Bottom", "Left"]],
    [new Position(3, 17), ["Bottom", "Right"]],
    [new Position(4, 5), ["Bottom", "Bottom", "Left"]],
    [new Position(4, 5), ["Bottom"]],
    [new Position(4, 6), ["Bottom"]],
    [new Position(4, 7), ["Bottom"]],
    [new Position(4, 8), ["Bottom"]],
    [new Position(4, 9), ["Bottom"]],
    [new Position(4, 16), ["Bottom", "Bottom", "Right"]],
    [new Position(5, 6), ["Top", "Bottom", "Left"]],
    [new Position(5, 15), ["Top", "Bottom", "Right"]],
    [new Position(6, 7), ["Bottom", "Left"]],
    [new Position(6, 14), ["Bottom", "Right"]],
    [new Position(7, 8), ["Bottom", "Left"]],
    [new Position(7, 13), ["Bottom", "Right"]],
    [new Position(8, 9), ["Bottom", "Left"]],
    [new Position(8, 12), ["Bottom", "Right"]],
    [new Position(9, 0), ["Bottom"]],
    [new Position(9, 1), ["Bottom"]],
    [new Position(9, 2), ["Bottom"]],
    [new Position(9, 3), ["Bottom"]],
    [new Position(9, 4), ["Bottom", "Right"]],
    [new Position(9, 5), ["Bottom", "Left"]],
    [new Position(9, 6), ["Bottom"]],
    [new Position(9, 7), ["Bottom"]],
    [new Position(9, 8), ["Bottom"]],
    [new Position(9, 10), ["Bottom", "Right", "Right", "Left"]],
    [new Position(9, 11), ["Bottom", "Right", "Left", "Left"]],
    [new Position(9, 13), ["Bottom"]],
    [new Position(9, 14), ["Bottom"]],
    [new Position(9, 15), ["Bottom"]],
    [new Position(9, 16), ["Bottom", "Right"]],
    [new Position(9, 17), ["Bottom", "Left"]],
    [new Position(9, 18), ["Bottom"]],
    [new Position(9, 19), ["Bottom"]],
    [new Position(9, 20), ["Bottom"]],
    [new Position(9, 21), ["Bottom"]],
    [new Position(11, 8), ["Bottom", "Right"]],
    [new Position(11, 13), ["Bottom", "Left"]],
    [new Position(12, 7), ["Bottom", "Right"]],
    [new Position(12, 14), ["Bottom", "Left"]],
    [new Position(13, 6), ["Bottom", "Right"]],
    [new Position(13, 15), ["Bottom", "Left"]],
    [new Position(14, 5), ["Bottom", "Right", "Left"]],
    [new Position(14, 16), ["Bottom", "Right", "Left"]],
    [new Position(15, 4), ["Bottom", "Right"]],
    [new Position(15, 17), ["Bottom", "Left"]],
    [new Position(16, 3), ["Bottom", "Right"]],
    [new Position(16, 18), ["Bottom", "Left"]],
    [new Position(17, 2), ["Bottom", "Right"]],
    [new Position(17, 19), ["Bottom", "Left"]],
    [new Position(18, 1), ["Bottom", "Right"]],
    [new Position(18, 20), ["Bottom", "Left"]],
    [new Position(0, 0), ["Right"]],
    [new Position(5, 4), ["Right"]],
    [new Position(6, 4), ["Right"]],
    [new Position(6, 16), ["Right"]],
    [new Position(7, 4), ["Right"]],
    [new Position(7, 16), ["Right"]],
    [new Position(8, 4), ["Right"]],
    [new Position(8, 16), ["Right"]],
    [new Position(11, 4), ["Right"]],
    [new Position(11, 16), ["Right"]],
    [new Position(12, 4), ["Right"]],
    [new Position(12, 16), ["Right"]],
    [new Position(13, 4), ["Right"]],
    [new Position(13, 16), ["Right"]],
    [new Position(14, 4), ["Right"]],
    [new Position(19, 0), ["Right"]],
    [new Position(0, 11), ["Left"]],
    [new Position(0, 10), ["Right"]],
    [new Position(1, 10), ["Right"]],
    [new Position(2, 10), ["Right"]],
    [new Position(3, 10), ["Right"]],
    [new Position(4, 10), ["Bottom", "Right"]],
    [new Position(5, 10), ["Top", "Right"]],
    [new Position(6, 10), ["Right"]],
    [new Position(7, 10), ["Right"]],
    [new Position(8, 10), ["Right"]],
    [new Position(11, 10), ["Right"]],
    [new Position(12, 10), ["Right"]],
    [new Position(13, 10), ["Right"]],
    [new Position(14, 10), ["Bottom", "Right"]],
    [new Position(15, 10), ["Top", "Right"]],
    [new Position(16, 10), ["Right"]],
    [new Position(17, 10), ["Right"]],
    [new Position(18, 10), ["Right"]],
    [new Position(19, 10), ["Right"]],
    [new Position(0, 21), ["Left"]],
    [new Position(5, 17), ["Left"]],
    [new Position(6, 5), ["Left"]],
    [new Position(6, 17), ["Left"]],
    [new Position(7, 5), ["Left"]],
    [new Position(7, 17), ["Left"]],
    [new Position(8, 5), ["Left"]],
    [new Position(8, 17), ["Left"]],
    [new Position(11, 5), ["Left"]],
    [new Position(11, 17), ["Left"]],
    [new Position(12, 5), ["Left"]],
    [new Position(12, 17), ["Left"]],
    [new Position(13, 5), ["Left"]],
    [new Position(13, 17), ["Left"]],
    [new Position(14, 17), ["Left"]],
    [new Position(19, 21), ["Left"]],
    [new Position(1, 11), ["Left"]],
    [new Position(2, 11), ["Left"]],
    [new Position(3, 11), ["Left"]],
    [new Position(4, 11), ["Bottom", "Left"]],
    [new Position(4, 12), ["Bottom"]],
    [new Position(4, 13), ["Bottom"]],
    [new Position(4, 14), ["Bottom"]],
    [new Position(4, 15), ["Bottom"]],
    [new Position(5, 11), ["Left", "Top"]],
    [new Position(6, 11), ["Left"]],
    [new Position(7, 11), ["Left"]],
    [new Position(8, 11), ["Left"]],
    [new Position(11, 11), ["Left"]],
    [new Position(12, 11), ["Left"]],
    [new Position(13, 11), ["Left"]],
    [new Position(14, 11), ["Left", "Bottom"]],
    [new Position(15, 11), ["Left", "Top"]],
    [new Position(16, 11), ["Left"]],
    [new Position(17, 11), ["Left"]],
    [new Position(18, 11), ["Left"]],
    [new Position(19, 11), ["Left"]],
    [new Position(5, 7), ["Top"]],
    [new Position(5, 8), ["Top"]],
    [new Position(5, 9), ["Top"]],
    [new Position(5, 12), ["Top"]],
    [new Position(5, 13), ["Top"]],
    [new Position(5, 14), ["Top"]],
    [new Position(15, 6), ["Top"]],
    [new Position(15, 7), ["Top"]],
    [new Position(15, 8), ["Top"]],
    [new Position(15, 9), ["Top"]],
    [new Position(15, 12), ["Top"]],
    [new Position(15, 13), ["Top"]],
    [new Position(15, 14), ["Top"]],
    [new Position(15, 15), ["Top"]],
    [new Position(14, 7), ["Bottom"]],
    [new Position(14, 8), ["Bottom"]],
    [new Position(14, 9), ["Bottom"]],
    [new Position(14, 12), ["Bottom"]],
    [new Position(14, 13), ["Bottom"]],
    [new Position(14, 14), ["Bottom"]],
]);


