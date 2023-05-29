import { JOB_GROUP } from "../enums";
import { Block } from "./Block";

export default class BlockList {
    private totalLevel = 0;
    readonly blocks: Block[];
    readonly blockCount: { [key in JOB_GROUP]: number } = {
        [JOB_GROUP.전사]: 0,
        [JOB_GROUP.궁수]: 0,
        [JOB_GROUP.마법사]: 0,
        [JOB_GROUP.도적]: 0,
        [JOB_GROUP.해적]: 0,
        [JOB_GROUP.제논]: 0,
    };

    constructor(blocks: Block[]) {
        this.blocks = [...blocks].sort((a,b) => b.level - a.level);
        this.initBlocks();
    }

    getTotalLevel() {
        return this.totalLevel;
    }

    getAvailableSize(blockCount: number) {
        return this.blocks.slice(0, blockCount).reduce((acc, cur) => acc + cur.size, 0);
    }

    initBlocks() {
        this.blocks.forEach((block) => {
            this.totalLevel += block.character.level;
            this.blockCount[block.character.job!.group]++;
        });
    }
}
