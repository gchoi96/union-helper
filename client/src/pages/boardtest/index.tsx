import { Block } from "@/core/classes/Block";
import BlockList from "@/core/classes/BlockList";
import UnionManager from "@/core/classes/UnionManager";
import { JOB_MAP } from "@/core/constants";
import { EXTERNAL_AREA } from "@/core/enums";
import { fetchCharacterInfo, fetchCharacterInfos } from "@/http/fetchCharacterInfo";
import UnionBoard from "@core/classes/UnionBoard";
import { extractCharacterList } from "@core/utils";
import { useEffect, useRef } from "react";
const copiedText = `NEXON
메뉴
메이플스토리
메이플스토리 월드
메이플스토리M
N
OFF
76
로그아웃
mck73132
위험


뉴스가이드랭킹커뮤니티미디어고객지원
마이메이플진부령박스카리부트2도적마이메이플내가 쓴 글
내정보 관리아이템 이용내역테스트월드회원탈퇴
내정보 관리대표캐릭터 변경메이플스토리 홈페이지 이용 시 사용할 대표캐릭터를 설정해주세요.01메이플ID 선택
chlrjs731111
chlrjs73123
02월드/캐릭터 선택리부트2
리부트2
진부령박스카리부트2진부령박스카윤웨이97리부트2윤웨이9727482913리부트227482913632817936128리부트2632817936128성비먹는하마리부트2성비먹는하마213123122121리부트2213123122121534758437589리부트2534758437589967891236492리부트2967891236492123712893712리부트2123712893712784392237894리부트2784392237894크확이왜모잘리부트2크확이왜모잘담주에쓸방무리부트2담주에쓸방무크리왜부족해리부트2크리왜부족해크리가아직도리부트2크리가아직도시드돌기시러리부트2시드돌기시러03150247리부트203150247궁수하기시러리부트2궁수하기시러BOOSTCAMPWM7리부트2BOOSTCAMPWM7뎀스어케바꿈리부트2뎀스어케바꿈크리뎀오퍼센리부트2크리뎀오퍼센이법십프지로리부트2이법십프지로여3축공0마리부트2여3축공0마확1률뎀6증리부트2확1률뎀6증방5어무퍼시리부트2방5어무퍼시혜지야힐좀써리부트2혜지야힐좀써12121442231리부트212121442231시드진짜싫어리부트2시드진짜싫어결정석맛있다리부트2결정석맛있다뎀1증6퍼센트리부트2뎀1증6퍼센트팹시제로자몽리부트2팹시제로자몽플위는텔포없리부트2플위는텔포없세르원킬좀하리부트2세르원킬좀하코카제로자몽리부트2코카제로자몽AsaShiho리부트2AsaShiho환타제롱비매리부트2환타제롱비매부수송비매너리부트2부수송비매너
대표캐릭터는 10레벨 이상이어야 지정할 수 있습니다.대표 캐릭터 저장
마이메이플 메인
내정보 관리
대표캐릭터 변경
비활성ID 전환/해제
제한 내역
캐릭터정보 공개설정
Family Site회사소개채용안내이용약관게임이용등급안내개인정보처리방침청소년보호정책운영정책넥슨PC방사이트맵(주)넥슨코리아 대표이사 이정헌 경기도 성남시 분당구판교로 256번길 7 전화: 1588-7701 팩스:0502-258-8322
E-mail:contact-us@nexon.co.kr 사업자등록번호 : 220-87-17483호 통신판매업 신고번호 : 제2013-경기성남-1659호 사업자정보확인ⓒ NEXON Korea Corporation All Rights Reserved.TOP`;
export default function InitBoardTest() {
    useEffect(() => {
        (async () => {

            // 캐릭터 랭킹 정보 스크래핑
            const characterList = await fetchCharacterInfos(
                [...extractCharacterList(copiedText),]
            );

            // 캐릭터 블록 목록 생성
            const blockList = new BlockList(
                characterList.map((character) => Block.blockFactory(character))
            );

            const unionManager = new UnionManager(blockList);
            unionManager.setPriority([
                EXTERNAL_AREA.크리티컬데미지,
                EXTERNAL_AREA.일반데미지,
                EXTERNAL_AREA.버프지속시간
            ])
            unionManager.simulate();
            unionManager.display();
            // 점령 우선 순위 
            // const unionBoard1 = new UnionBoard(blockList);
            // unionBoard1.selectExternalAreas([
            //     EXTERNAL_AREA.크리티컬데미지,
            //     EXTERNAL_AREA.일반데미지,
            //     EXTERNAL_AREA.버프지속시간
            // ]);
            // unionBoard1.arrangeBlocks();
            // // console.log(unionBoard1.t_display());
        })();
    });
    return <div style={{ width: "100vw", height: "100vh", padding: "10%" }}></div>;
}
