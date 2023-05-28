import { JOB_GROUP } from "../enums";
import { Position } from "../types/Position";

const blockShapeMap: { [key in JOB_GROUP]?: { [key: number]: BlockShape } } = {};
export class BlockShapeMap {
    static readonly map: { [key in JOB_GROUP]?: { [key: number]: BlockShape[] } } = {};
    static getBlockShape(jobGroup: JOB_GROUP, level: number, positions: Position[]) {
        const shapes = BlockShapeMap.map[jobGroup]?.[level];
        if (shapes) return shapes;
        const newShapes = new BlockShape(positions).getAllTransformations();
        BlockShapeMap.map[jobGroup] = {
            ...BlockShapeMap.map[jobGroup],
            [level]: newShapes,
        };
        return newShapes;
    }
}
export class BlockShape {
    readonly positions: Position[] = [];
    constructor(positions: Position[]) {
        this.positions = positions;
    }

    getAllTransformations(): BlockShape[] {
        let blockShape: BlockShape = this;
        const transformations: BlockShape[] = [blockShape];
        for (let i = 0; i < 4; i++) {
            const curr: BlockShape[] = [blockShape];           
            curr.push(blockShape.flipVertical());
            curr.push(blockShape.flipHorizontal());
            curr.forEach((shape) => {
                if (transformations.some((_shape) => _shape.equals(shape))) return;
                transformations.push(shape);
            });

            blockShape = blockShape.rotate();
        }
        return transformations;
    }

    private equals(target: BlockShape): boolean {
        return this.toString() === target.toString();
    }

    private toString(): string {
        return this.positions.map((pos) => `${pos.x}:${pos.y}`).join("|");
    }

    private rotate(): BlockShape {
        return new BlockShape(
            this.positions.map(({ y, x }) => ({ y: x, x: -y || 0 }))
        );
    }

    private flipVertical(): BlockShape {
        return new BlockShape(
            this.positions.map(({ y, x }) => ({ y: -y || 0, x }))
        );
    }

    private flipHorizontal(): BlockShape {
        return new BlockShape(
            this.positions.map(({ y, x }) => ({ y, x: -x || 0 }))
        );
    }
}
