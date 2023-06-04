import { EXTERNAL_AREA } from "../enums";
import { BlockMap } from "../types/BlockMap";
import { UnionGrade } from "../types/UnionGrade";
import { calcUnionGrade } from "../utils";
import { Block } from "./Block";
import BlockList from "./BlockList";
import UnionBoard from "./UnionBoard";

export default class UnionManager {
    readonly occupiableSize: number;
    readonly blockList: BlockList;
    readonly remainingBlockCount;
    readonly grade: UnionGrade;

    private board: UnionBoard = new UnionBoard();
    private priority = Object.keys(EXTERNAL_AREA);

    constructor(blocks: Block[] | BlockList) {
        this.blockList = blocks instanceof BlockList ? blocks : new BlockList(blocks);
        this.grade = calcUnionGrade(this.blockList.getTotalLevel());
        this.remainingBlockCount = this.grade.blockCount ?? 9;
        this.board.initAreaStatus(this.grade.occupiableLevel);
        this.occupiableSize = this.calcAvailableSize(this.grade.blockCount);
    }

    private calcAvailableSize(blockCount: number) {
        return this.blockList.blocks.slice(0, blockCount).reduce((acc, cur) => acc + cur.size, 0);
    }

    setPriority(areas: EXTERNAL_AREA[]) {
        this.priority = areas;
        this.board.setExternalAreaStatus(areas, this.occupiableSize);
    }

    getPriority() {
        return [...this.priority];
    }

    getBlockMap() {
        return this.blockList.getBlocks(this.grade.blockCount).reduce((map, block) => {
            const key = block.shapes[0].createKey();
            map[key] = [...(map[key] ?? []), block];
            return map;
        }, {} as BlockMap);
    }

    run() {
      // board.simulate 관련 로직 manager로 이동
      // board에서는 배치 가능한가? ->
      // 이전 상태에서 블록 배치가 추가된 새로운 board 반환
      // -> 재귀 or while
      // 배치 완료 시 this.board = 배치_완료_블록
        this.board.simulate(this.getBlockMap());
    }

    display() {
        console.log(this.board.toString());
    }
}
