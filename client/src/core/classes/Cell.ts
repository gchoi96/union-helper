import { CELL_STATUS } from "../enums";
import { Block } from "./Block";

export default class Cell {
  status: CELL_STATUS;
  occupyingBlock: Block | null = null;
  
  constructor(status = CELL_STATUS.UNAVAILABLE, occupyingBlock: null | Block = null) {
    this.status = status;
    this.occupyingBlock = occupyingBlock;
  }

  occupy(block: Block){
    this.status = CELL_STATUS.OCCUPIED;
    if(this.occupyingBlock) throw new Error("??")
    this.occupyingBlock = block;
  }

  copy(){
    return new Cell(this.status , this.occupyingBlock);
  }
}