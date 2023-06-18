import ClusteredBlockTable from "@classes/ClusteredBlockTable";
import Position from "@classes/Position";
import UnionBoard from "@classes/UnionBoard";

export interface PlaceStatus {
  board: UnionBoard;
  blockTable: ClusteredBlockTable;
  linkedPositions: Position[]
  remainSize: number;
}


