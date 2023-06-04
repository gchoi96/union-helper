import Position from "@core/classes/Position";
import Trapezoid from "@core/classes/Trapezoid";
import { EXTERNAL_AREA } from "@core/enums";

export interface ExternalAreaInfo {
  trapezoid: Trapezoid;
  startPosition: Position;
  intersectingArea: Position[];
}