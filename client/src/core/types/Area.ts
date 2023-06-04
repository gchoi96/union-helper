import Position from "@core/classes/Position";
import { EXTERNAL_AREA } from "@core/enums";

export interface Area {
  name: EXTERNAL_AREA;
  positions: Position[];
}