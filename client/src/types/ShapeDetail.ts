import { Block } from "#classes/Block";
import { Shape } from "#classes/Shape";
import { Delta } from "#types/delta";

export interface ShapeDetail {
  deltaIdx: number;
  blockIdx: number;
  blocks: Block[];
  deltas: Delta[][];
  transformations: Shape[];
}