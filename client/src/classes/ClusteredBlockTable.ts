import { Block } from "#classes/Block";
import { Shape } from "#classes/Shape";
import { Delta } from "#types/delta";
import { tab } from "@testing-library/user-event/dist/tab";

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
    public length: number;

    private _shapeIdx: number = 0;
    public get shapeIdx(): number {
        return this._shapeIdx;
    }
    public set shapeIdx(v: number) {
        this._shapeIdx = v;
    }
    public get shapeCount() {
        return Object.keys(this.table).length;
    }

    public minBlockSize = Number.MAX_SAFE_INTEGER;

    constructor(blocks: Block[]) {
        this.length = blocks.length;
        this.table = blocks.reduce((_acc, block) => {
            this.minBlockSize = Math.min(this.minBlockSize, block.size);
            const key = block.shapes[0].createKey();
            _acc[key] = {
                transformations: block.shapes,
                deltas: Object.values(
                    block.shapes
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
                ),
                deltaIdx: 0,
                blockIdx: 0,
                blocks: [...(_acc[key]?.blocks ?? []), block],
            };
            return _acc;
        }, {} as BlockTable);
    }

    copy() {
        const newClusteredBLocks = new ClusteredBlockTable([]);
        let length = 0;
        const table = Object.entries(this.table).reduce((table, [key, value]) => {
            table[key] = { ...value };
            length += value.blocks.length;
            return table;
        }, {} as BlockTable);
        newClusteredBLocks.length = length;
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

    updateMinBlockSize() {
        this.minBlockSize = Object.values(this.table).reduce((min, { blocks, blockIdx }) => {
            if (blocks.length <= blockIdx) return min;
            return Math.min(min, blocks[0].size);
        }, Number.MAX_SAFE_INTEGER);
    }
}
