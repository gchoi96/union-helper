import { Block } from "#classes/Block";
import { ShapeDetail } from "#types/ShapeDetail";

interface BlockTable {
    [key: string]: ShapeDetail;
}
export default class ClusteredBlockTable {

    public table: ShapeDetail[];

    private _shapeIdx: number = 0;
    public get shapeIdx(): number {
        return this._shapeIdx;
    }
    public set shapeIdx(v: number) {
        this._shapeIdx = v;
    }
    public get shapeCount() {
        return this.table.length;
    }

    constructor(blocks: Block[]) {
        this.table = Object.values(
            blocks.reduce((_acc, block) => {
                const key = block.shapes[0].createKey();
                _acc[key] = {
                    transformations: block.shapes,
                    deltas: block.getAllTransformations(),
                    deltaIdx: 0,
                    blockIdx: 0,
                    blocks: [...(_acc[key]?.blocks ?? []), block],
                };
                return _acc;
            }, {} as BlockTable)
        );
    }

    copy() {
        const newTable = new ClusteredBlockTable([]);
        newTable.table = this.table.map((detail) => ({ ...detail }));
        return newTable;
    }

    getAllTransformations() {
        return this.table.map(({ transformations }) => ({
            transformations,
        }));
    }

    shift(idx: number) {
        this.table[idx].blockIdx++;
        this.table[idx].deltaIdx = 0;
        return this.table[idx].blocks[0];
    }
}
