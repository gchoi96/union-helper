import { Block } from "@core/classes/Block";
export default class ClusteredBlockTable {
    private _table: Block[][];
    public get table(): Block[][] {
        return this._table.map((el) => [...el]).filter((row) => row.length);
    }

    get remainBlockCount() {
        return this._table.flat().length;
    }

    get totalLength() {
        return this._table.flat().reduce((acc) => acc + 1, 0);
    }

    constructor(blocks: Block[]) {
        this._table = Object.values(
            blocks.reduce((_acc, block) => {
                const key = block.shapes[0].createKey();
                _acc[key] = [...(_acc[key] ?? []), block];
                return _acc;
            }, {} as { [key: string]: Block[] })
        );
    }

    copy() {
        const newClusteredBLocks = new ClusteredBlockTable([]);
        newClusteredBLocks._table = this._table.map((el) => [...el]);
        return newClusteredBLocks;
    }

    pop(index: number) {
        const row = this._table[index];
        row.pop();
        return this;
    }

    push(index: number, block: Block){
        const row = this._table[index];
        row.push(block);
        return this;
    }
}
