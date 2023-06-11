import { JOB_GROUP } from "@core/enums";
import { Delta } from "../types/Delta";

const blockShapeMap: { [key in JOB_GROUP]?: { [key: number]: BlockShape } } = {};
export class BlockShapeMap {
    static readonly map: { [key in JOB_GROUP]?: { [key: number]: BlockShape[] } } = {};
    static getBlockShape(jobGroup: JOB_GROUP, level: number, shape: Delta[]) {
        const shapes = BlockShapeMap.map[jobGroup]?.[level];
        if (shapes) return shapes;
        const newShapes = new BlockShape(shape).getAllTransformations();
        BlockShapeMap.map[jobGroup] = {
            ...BlockShapeMap.map[jobGroup],
            [level]: newShapes,
        };
        return newShapes;
    }
}
export class BlockShape {
    readonly deltas: Delta[] = [];
    constructor(shape: Delta[]) {
        this.deltas = shape;
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

    createKey() {
        return this.deltas
            .sort((posA, posB) => {
                if (posA.dy === posB.dy) return posA.dx - posB.dx;
                return posA.dy - posB.dy;
            })
            .map(({ dx, dy }) => `${dy}:${dx}`)
            .join("|");
    }

    getDeltasByIndex(index: number) {
        const base = this.deltas[index];
        return this.deltas.map((delta, _index) => {
            if (index === _index) return { dy: 0, dx: 0 };
            return { dy: delta.dy - base.dy, dx: delta.dx - base.dx };
        });
    }

    private equals(target: BlockShape): boolean {
        return this.toString() === target.toString();
    }

    private toString(): string {
        return this.deltas
            .sort((a, b) => {
                if (a.dx === b.dx) return a.dy - b.dy;
                return a.dx - b.dx;
            })
            .map(({ dy, dx }) => `${dy}:${dx}`)
            .join("|");
    }

    private rotate(): BlockShape {
        return new BlockShape(this.deltas.map(({ dy, dx }) => ({ dy: dx, dx: -dy || 0 })));
    }

    private flipVertical(): BlockShape {
        return new BlockShape(this.deltas.map(({ dy, dx }) => ({ dy: -dy || 0, dx: dx })));
    }

    private flipHorizontal(): BlockShape {
        return new BlockShape(this.deltas.map(({ dy, dx }) => ({ dy: dy, dx: -dx || 0 })));
    }
}
