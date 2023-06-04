import { BLOCK_STATUS, ERROR, JOB_GROUP } from "@core/enums";
import { CharacterInfo } from "@core/types/CharacterInfo";
import { BlockShape, BlockShapeMap } from "@core/classes/BlockShape";
import { Delta } from "../types/Delta";

export class Block {
    readonly size: number;
    readonly character: CharacterInfo;
    private status = BLOCK_STATUS.NOT_IN_USE;
    readonly shapes: BlockShape[] = [];
    static additionalArea: Delta[] = [];

    static blockFactory(character: CharacterInfo) {
        if (!character.job) throw new Error(ERROR.INVALID_CHARACTER);
        switch (character.job.group) {
            case JOB_GROUP.전사:
                return new WarriorBlock(character);
            case JOB_GROUP.마법사:
                return new MageBlock(character);
            case JOB_GROUP.궁수:
                return new ArcherBlock(character);
            case JOB_GROUP.도적:
                return new RogueBlock(character);
            case JOB_GROUP.해적:
                return new PirateBlock(character);
            case JOB_GROUP.제논:
                return new XenonBlock(character);
            default:
                throw new Error(ERROR.INVALID_CHARACTER);
        }
    }

    protected constructor(character: CharacterInfo) {
        this.size = Block.calcBlockSize(character.level);
        this.character = character;
        this.shapes = this.initShape();
    }

    static calcBlockSize(characterLevel: number) {
        if (characterLevel < 100) return 1;
        if (characterLevel < 140) return 2;
        if (characterLevel < 200) return 3;
        if (characterLevel < 250) return 4;
        return 5;
    }

    private initShape() {
        const positions = (this.constructor as typeof Block).additionalArea.slice(0, this.size);
        return BlockShapeMap.getBlockShape(this.character.job!.group!, this.size, positions);
    }

    getStatus() {
        return this.status;
    }

    use() {
        if (this.status) throw new Error(ERROR.BLOCK_IN_USE);
        this.status = BLOCK_STATUS.IN_USE;
    }

    release() {
        this.status = BLOCK_STATUS.NOT_IN_USE;
    }
}
export class WarriorBlock extends Block {
    static additionalArea: Delta[] = [
        { dy: 0, dx: 0 },
        { dy: 0, dx: 1 },
        { dy: 1, dx: 0 },
        { dy: 1, dx: 1 },
        { dy: 0, dx: 2 },
    ];
    constructor(character: CharacterInfo) {
        super(character);
    }
}
export class ArcherBlock extends Block {
    static additionalArea: Delta[] = [
        { dy: 0, dx: 0 },
        { dy: 0, dx: 1 },
        { dy: 0, dx: -1 },
        { dy: 0, dx: 2 },
        { dy: 0, dx: -2 },
    ];
    constructor(character: CharacterInfo) {
        super(character);
    }
}
export class MageBlock extends Block {
    static additionalArea: Delta[] = [
        { dy: 0, dx: 0 },
        { dy: 0, dx: 1 },
        { dy: 0, dx: -1 },
        { dy: 1, dx: 0 },
        { dy: -1, dx: 0 },
    ];
    constructor(character: CharacterInfo) {
        super(character);
    }
}
export class RogueBlock extends Block {
    static additionalArea: Delta[] = [
        { dy: 0, dx: 0 },
        { dy: 0, dx: 1 },
        { dy: 0, dx: -1 },
        { dy: 1, dx: 1 },
        { dy: -1, dx: 1 },
    ];
    constructor(character: CharacterInfo) {
        super(character);
    }
}
export class PirateBlock extends Block {
    static additionalArea: Delta[] = [
        { dy: 0, dx: 0 },
        { dy: 0, dx: 1 },
        { dy: 1, dx: 0 },
        { dy: -1, dx: 1 },
        { dy: -2, dx: 1 },
    ];
    constructor(character: CharacterInfo) {
        super(character);
    }
}
export class XenonBlock extends Block {
    static additionalArea: Delta[] = [
        { dy: 0, dx: 0 },
        { dy: 0, dx: 1 },
        { dy: 0, dx: -1 },
        { dy: 1, dx: 1 },
        { dy: -1, dx: -1 },
    ];
    constructor(character: CharacterInfo) {
        super(character);
    }
}
