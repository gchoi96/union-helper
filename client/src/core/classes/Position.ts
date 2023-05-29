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
        const path: Position[] = [];
        const [dx, dy] = [target.x - this.x, target.y - this.y];
            const stepX = dx < 0 ? 1 : -1;
            for (let x = target.x; x !== this.x; x += stepX) {
                path.push(new Position(target.y, x));
            }
            const stepY = dy < 0 ? 1 : -1;
            for (let y = target.y; y !== this.y; y += stepY) {
                path.push(new Position(this.x, y));
            }
        return path;
    }
}
