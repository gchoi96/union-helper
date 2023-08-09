import Position from "#classes/Position";

export interface ExternalArea {
  startPosition: Position;
  borderPositions: Position[];
  positions: Position[];
}