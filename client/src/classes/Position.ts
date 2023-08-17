import { Delta } from "#types/delta";

export default class Position {
    readonly y: number = 0;
    readonly x: number = 0;
    static positions: { [key: number]: { [key: number]: Position } } = {};

    constructor(y: number, x: number) {
        if (Position.positions[y]?.[x]) return Position.positions[y][x];
        this.y = y;
        this.x = x;
        if (!Position.positions[y]) Position.positions[y] = {};
        Position.positions[y][x] = this;
    }

    move(delta: Delta) {
        return new Position(this.y + delta.dy, this.x + delta.dx);
    }
}
