import { Block } from "#classes/Block";
import { Shape } from "#classes/Shape";
import { Delta } from "#types/delta";

interface BlockTable {
    [key: string]: ShapeDetail;
}

interface ShapeDetail {
    deltaIdx: number;
    blockIdx: number;
    blocks: Block[];
    deltas: Delta[][];
    transformations: Shape[];
}

export default class ClusteredBlockTable {
    public table: BlockTable;

    private _shapeIdx: number = 0;
    public get shapeIdx(): number {
        return this._shapeIdx;
    }
    public set shapeIdx(v: number) {
        this._shapeIdx = v;
    }
    public get shapeCount(){
        return Object.keys(this.table).length;
    }

    constructor(blocks: Block[]) {
        this.table = blocks.reduce((_acc, block) => {
            const key = block.shapes[0].createKey();
            _acc[key] = {
                transformations: block.shapes,
                deltas: block.shapes.map((shape) => {
                    return shape.deltas.map((_,idx) => shape.getDeltasByIndex(idx))
                }).flat(),
                deltaIdx: (_acc[key]?.deltaIdx ?? -1) + 1,
                blockIdx: 0,
                blocks: [...(_acc[key]?.blocks ?? []), block],
            };
            return _acc;
        }, {} as BlockTable);
    }

    copy() {
        const newClusteredBLocks = new ClusteredBlockTable([]);
        const table = Object.entries(this.table).reduce((table, [key, value]) => {
            table[key] = { ...value };
            return table;
        }, {} as BlockTable);
        newClusteredBLocks.table = table;
        return newClusteredBLocks;
    }

    getAllTransformations() {
        return Object.entries(this.table).map(([key, { transformations }]) => ({
            key,
            transformations,
        }));
    }

    shift(key: string) {
        this.table[key].blockIdx++;
        this.table[key].deltaIdx = 0;
        return this.table[key].blocks[0];
    }
}
