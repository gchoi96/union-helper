import { Block } from "#classes/Block";
import { JOB_GROUP } from "#enums/job";
import { BLOCK_STATUS } from "#enums/status";
import { Character } from "#types/character";

export default class BlockList {
    public get activeBlockCount(): number {
        return this.blocks.reduce((acc, cur) => (cur.status === BLOCK_STATUS.IN_USE ? acc + 1 : acc), 0);
    }

    readonly blocks: Block[];
    readonly blockCount: { [key in JOB_GROUP]: number } = {
        [JOB_GROUP.전사]: 0,
        [JOB_GROUP.궁수]: 0,
        [JOB_GROUP.마법사]: 0,
        [JOB_GROUP.도적]: 0,
        [JOB_GROUP.해적]: 0,
        [JOB_GROUP.제논]: 0,
    };

    static create(characterList: Character[]) {
        const blocks = characterList.map((characterInfo) => Block.blockFactory(characterInfo));
        return new BlockList(blocks);
    }

    constructor(blocks: Block[]) {
        this.blocks = [...blocks].sort((a, b) => b.size - a.size);
        this.initBlocks();
    }

    getBlocks(count: number) {
        return this.blocks.slice(0, count);
    }

    private initBlocks() {
        this.blocks.forEach((block) => {
            this.blockCount[block.character.job!.group]++;
        });
    }
}
