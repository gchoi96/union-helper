import { BlockShape } from "../BlockShape";
import Position from "../Position";

export const mageLv1Shapes = [new BlockShape([new Position(0, 0)])];

export const rogueLv4Shapes = [
    new BlockShape([
        new Position(0, 0),
        new Position(0, 1),
        new Position(0, -1),
        new Position(1, 1),
    ]),

    new BlockShape([
        new Position(0, 0),
        new Position(0, 1),
        new Position(0, -1),
        new Position(-1, 1),
    ]),

    new BlockShape([
        new Position(0, 0),
        new Position(0, -1),
        new Position(0, 1),
        new Position(1, -1),
    ]),

    new BlockShape([
        new Position(0, 0),
        new Position(1, 0),
        new Position(-1, 0),
        new Position(1, -1),
    ]),

    new BlockShape([
        new Position(0, 0),
        new Position(-1, 0),
        new Position(1, 0),
        new Position(-1, -1),
    ]),

    new BlockShape([
        new Position(0, 0),
        new Position(1, 0),
        new Position(-1, 0),
        new Position(1, 1),
    ]),

    new BlockShape([
        new Position(0, 0),
        new Position(0, -1),
        new Position(0, 1),
        new Position(-1, -1),
    ]),

    new BlockShape([
        new Position(0, 0),
        new Position(-1, 0),
        new Position(1, 0),
        new Position(-1, 1),
    ]),
];
