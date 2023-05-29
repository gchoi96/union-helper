import Position from "../classes/Position";
import Trapezoid from "../classes/Trapezoid";
import { EXTERNAL_AREA } from "../enums";

export interface ExternalAreaInfo {
  trapezoid: Trapezoid;
  startPosition: Position;
  intersectingArea: Position[];
}