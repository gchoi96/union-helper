import Position from "../classes/Position";
import { EXTERNAL_AREA } from "../enums";

export interface Area {
  name: EXTERNAL_AREA;
  positions: Position[];
}