import { Block } from "./Block";
type Map = {
    [key: string]: Block[];
}
export default class BlockMap {
    private map: Map;

    constructor(blocks: Block[]) {
        this.map = blocks.reduce((_acc, block) => {
            const key = block.shapes[0].createKey();
            _acc[key] = [...(_acc[key] ?? []), block];
            return _acc;
        }, {} as Map);
    }

    get(key: string){
      return this.map[key];
    }

    keys(){
      return Object.keys(this.map);
    }
    
    values(){
      return Object.values(this.map).filter(blocks => blocks.length);
    }

    copy(){
      return new BlockMap(this.getAllBlocks());
    }

    private getAllBlocks() {
      return Object.values(this.map).flat();
    }
}
