import { ERROR } from "#constants/strings";
import { JOB_GROUP, JOB_NAME } from "#enums/job";
import { BLOCK_STATUS } from "#enums/status";
import { Character } from "#types/character";
import { Delta } from "#types/delta";
import { Shape, ShapeMap } from "#classes/Shape";
import { convertMobileLevelToGeneralLevel } from "#utils";

export class Block {
    readonly size: number;
    readonly character: Character;
    readonly shapes: Shape[] = [];

    private _status = BLOCK_STATUS.NOT_IN_USE;
    get status() {
        return this._status;
    }
    static additionalArea: Delta[] = [];

    static blockFactory(character: Character) {
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

    protected constructor(character: Character) {
        this.size = Block.calcBlockSize(character);
        this.character = character;
        this.shapes = this.initShapes();
    }

    static calcBlockSize(character: Character) {
        let { level, job } = character;
        const isMobile = job?.name === JOB_NAME.메이플M;
        if (isMobile) level = convertMobileLevelToGeneralLevel(level);
        if (level >= 250) return 5;
        if (level >= 200) return 4;
        if (level >= 140) return 3;
        if (level >= 100) return 2;
        return 1;
    }

    private initShapes() {
        const positions = (this.constructor as typeof Block).additionalArea.slice(0, this.size);
        return ShapeMap.getBlockShape(this.character.job!.group!, this.size, positions);
    }

    getAllTransformations() {
        return Object.values(
            this.shapes
                .map((shape) => {
                    return shape.deltas.map((_, idx) => shape.getDeltasByIndex(idx));
                })
                .flat()
                .reduce((map, deltas) => {
                    const key = deltas
                        .sort((posA, posB) => {
                            if (posA.dy === posB.dy) return posA.dx - posB.dx;
                            return posA.dy - posB.dy;
                        })
                        .map(({ dx, dy }) => `${dy}:${dx}`)
                        .join("|");
                    if (map[key]) return map;
                    map[key] = deltas;
                    return map;
                }, {} as { [key: string]: Delta[] })
        );
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
    constructor(character: Character) {
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
    constructor(character: Character) {
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
    constructor(character: Character) {
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
    constructor(character: Character) {
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
    constructor(character: Character) {
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
    constructor(character: Character) {
        super(character);
    }
}
