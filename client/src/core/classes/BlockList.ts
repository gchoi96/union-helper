import { JOB_GROUP } from "../enums";
import { Block } from "./Block";

export default class BlockList {
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
        this.blocks = blocks;
        this.initBlockCount();
    }

    initBlockCount() {
        this.blocks.forEach((block) => this.blockCount[block.character.job.group]++);
    }
}
