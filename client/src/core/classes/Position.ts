import { Delta } from "@core/types/Delta";
import { getNumbersBetween } from "@core/utils";

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

    private calcDistance(target: Position): number {
        const dx = this.x - target.x;
        const dy = this.y - target.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    getNearestPosition(targets: Position[]): Position {
        let nearestPosition = targets[0];
        let minDistance = this.calcDistance(targets[0]);
        for (let i = 1; i < targets.length; i++) {
            const distance = this.calcDistance(targets[i]);
            if (minDistance <= distance) continue;
            nearestPosition = targets[i];
            minDistance = distance;
        }
        return nearestPosition;
    }

    getPathBetweenPosition(target: Position): Position[] {
        const positions: Position[] = [];
        const isHorizontal = Math.abs(this.x - target.x) > Math.abs(this.y - target.y);
        const [num1, num2] = isHorizontal ? [this.x, target.x] : [this.y, target.y];
        const [min, max] = [Math.min(num1, num2), Math.max(num1, num2)];
        for (let i = min; i <= max; i++) {
            const newPosition = isHorizontal
                ? new Position(this.y, i)
                : new Position(i, this.x);
            positions.push(newPosition);
        }
        return positions;
    }

    move(delta: Delta) {
        return new Position(this.y + delta.dy, this.x + delta.dx);
    }
}
