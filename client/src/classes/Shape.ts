import { JOB_GROUP } from "#enums/job";
import { Delta } from "#types/delta";

export class ShapeMap {
    static readonly map: { [key in JOB_GROUP]?: { [key: number]: Shape[] } } = {};
    static getBlockShape(jobGroup: JOB_GROUP, level: number, shape: Delta[]) {
        const shapes = ShapeMap.map[jobGroup]?.[level];
        if (shapes) return shapes;
        const newShapes = new Shape(shape).getAllTransformations();
        ShapeMap.map[jobGroup] = {
            ...ShapeMap.map[jobGroup],
            [level]: newShapes,
        };
        return newShapes;
    }
}
export class Shape {
    readonly deltas: Delta[] = [];
    constructor(shape: Delta[]) {
        this.deltas = shape;
    }

    getAllTransformations(): Shape[] {
        let shape: Shape = this;
        const transformations: Shape[] = [shape];
        for (let i = 0; i < 4; i++) {
            const curr: Shape[] = [shape];
            curr.push(shape.flipVertical());
            curr.push(shape.flipHorizontal());
            curr.forEach((shape) => {
                if (transformations.some((_shape) => _shape.equals(shape))) return;
                transformations.push(shape);
            });

            shape = shape.rotate();
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

    private equals(target: Shape): boolean {
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

    private rotate(): Shape {
        return new Shape(this.deltas.map(({ dy, dx }) => ({ dy: dx, dx: -dy || 0 })));
    }

    private flipVertical(): Shape {
        return new Shape(this.deltas.map(({ dy, dx }) => ({ dy: -dy || 0, dx: dx })));
    }

    private flipHorizontal(): Shape {
        return new Shape(this.deltas.map(({ dy, dx }) => ({ dy: dy, dx: -dx || 0 })));
    }
}
