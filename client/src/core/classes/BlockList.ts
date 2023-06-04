import { JOB_GROUP } from "@core/enums";
import { Block } from "@core/classes/Block";

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
        this.blocks = [...blocks].sort((a, b) => b.size - a.size);
        this.initBlocks();
    }
    
    
    
    getTotalLevel() {
        return this.totalLevel;
    }

    getBlocks(count: number){
        return this.blocks.slice(0, count);
    }

    private initBlocks() {
        this.blocks.forEach((block) => {
            this.totalLevel += block.character.level;
            this.blockCount[block.character.job!.group]++;
        });
    }
}
