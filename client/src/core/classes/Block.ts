import { BLOCK_STATUS, ERROR, JOB_GROUP } from "../enums";
import { CharacterInfo } from "../types/CharacterInfo";
import { BlockShape, BlockShapeMap } from "./BlockShape";
import Position from "./Position";

export class Block {
    readonly size: number;
    readonly level: number;
    readonly character: CharacterInfo;
    private status = BLOCK_STATUS.NOT_IN_USE;
    readonly shapes: BlockShape[] = [];
    static additionalArea: Position[] = [];

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
        this.level = Block.calcBlockLevel(character.level);
        this.size = this.level;
        this.character = character;
        this.shapes = this.initShape();
    }

    static calcBlockLevel(characterLevel: number) {
        if (characterLevel < 100) return 1;
        if (characterLevel < 140) return 2;
        if (characterLevel < 200) return 3;
        if (characterLevel < 250) return 4;
        return 5;
    }

    private initShape() {
        const positions = (this.constructor as typeof Block).additionalArea.slice(
            0,
            this.level
        );
        return BlockShapeMap.getBlockShape(
            this.character.job!.group!,
            this.level,
            positions
        );
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
    static additionalArea: Position[] = [
        new Position(0, 0),
        new Position(0, 1),
        new Position(1, 0),
        new Position(1, 1),
        new Position(0, 2),
    ];
    constructor(character: CharacterInfo) {
        super(character);
    }
}
export class ArcherBlock extends Block {
    static additionalArea: Position[] = [
        new Position(0, 0),
        new Position(0, 1),
        new Position(0, -1),
        new Position(0, 2),
        new Position(0, -2),
    ];
    constructor(character: CharacterInfo) {
        super(character);
    }
}
export class MageBlock extends Block {
    static additionalArea: Position[] = [
        new Position(0, 0),
        new Position(0, 1),
        new Position(0, -1),
        new Position(1, 0),
        new Position(-1, 0),
    ];
    constructor(character: CharacterInfo) {
        super(character);
    }
}
export class RogueBlock extends Block {
    static additionalArea: Position[] = [
        new Position(0, 0),
        new Position(0, 1),
        new Position(0, -1),
        new Position(1, 1),
        new Position(-1, 1),
    ];
    constructor(character: CharacterInfo) {
        super(character);
    }
}
export class PirateBlock extends Block {
    static additionalArea: Position[] = [
        new Position(0, 0),
        new Position(0, 1),
        new Position(1, 0),
        new Position(-1, 1),
        new Position(-2, 1),
    ];
    constructor(character: CharacterInfo) {
        super(character);
    }
}
export class XenonBlock extends Block {
    static additionalArea: Position[] = [
        new Position(0, 0),
        new Position(0, 1),
        new Position(0, -1),
        new Position(1, 1),
        new Position(-1, -1),
    ];
    constructor(character: CharacterInfo) {
        super(character);
    }
}
