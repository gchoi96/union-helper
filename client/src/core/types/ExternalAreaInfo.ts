import Position from "@core/classes/Position";
import Trapezoid from "@core/classes/Trapezoid";

export interface ExternalAreaInfo {
  trapezoid: Trapezoid;
  startPosition: Position;
  intersectingArea: Position[];
}