export enum BLOCK_STATUS {
    IN_USE,
    NOT_IN_USE,
}

export enum CELL_STATUS {
    OCCUPIED,
    TO_BE_OCCUPIED,
    AVAILABLE,
    UNAVAILABLE,
}

export enum BUTTON_COLOR {
    RED,
    BLUE,
    GREEN,
}

export enum CHECK_STATUS {
    CHECKED,
    UNCHECKED,
}

export enum ERROR {
    BLOCK_IN_USE = "Block is already in use",
    INVALID_CHARACTER = "Invalid character information",
    INVALID_COPIED_TEXT = "Invalid copied text",
    TRAPEZOID_CORNER_COUNT = "The number of corners in the trapezoid must be four.",
    MISSING_BLOCK = "Missing required argument: block",
}

export enum EXTERNAL_AREA {
    크리티컬데미지 = "크리티컬 데미지",
    방어율무시 = "방어율무시",
    버프지속시간 = "버프지속시간",
    일반데미지 = "일반데미지",
    보스데미지 = "보스데미지",
    크리티컬확률 = "크리티컬 확률",
    획득경험치 = "획득경험치",
    상태이상내성 = "상태이상내성",
}

export enum JOB {
    히어로 = "히어로",
    팔라딘 = "팔라딘",
    다크나이트 = "다크나이트",
    "아크메이지(불,독)" = "아크메이지(불,독)",
    "아크메이지(썬,콜)" = "아크메이지(썬,콜)",
    비숍 = "비숍",
    보우마스터 = "보우마스터",
    신궁 = "신궁",
    패스파인더 = "패스파인더",
    나이트로드 = "나이트로드",
    섀도어 = "섀도어",
    듀얼블레이더 = "듀얼블레이더",
    바이퍼 = "바이퍼",
    캡틴 = "캡틴",
    캐논슈터 = "캐논슈터",
    소울마스터 = "소울마스터",
    플레임위자드 = "플레임위자드",
    윈드브레이커 = "윈드브레이커",
    나이트워커 = "나이트워커",
    스트라이커 = "스트라이커",
    미하일 = "미하일",
    블래스터 = "블래스터",
    배틀메이지 = "배틀메이지",
    와일드헌터 = "와일드헌터",
    메카닉 = "메카닉",
    데몬슬레이어 = "데몬슬레이어",
    데몬어벤져 = "데몬어벤져",
    제논 = "제논",
    아란 = "아란",
    에반 = "에반",
    메르세데스 = "메르세데스",
    팬텀 = "팬텀",
    은월 = "은월",
    루미너스 = "루미너스",
    카이저 = "카이저",
    카인 = "카인",
    카데나 = "카데나",
    엔젤릭버스터 = "엔젤릭버스터",
    아델 = "아델",
    일리움 = "일리움",
    칼리 = "칼리",
    아크 = "아크",
    라라 = "라라",
    호영 = "호영",
    제로 = "제로",
    키네시스 = "키네시스",
}

export enum JOB_GROUP {
    전사 = "전사",
    마법사 = "마법사",
    궁수 = "궁수",
    도적 = "도적",
    해적 = "해적",
    제논 = "제논",
}
