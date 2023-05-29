import { ERROR } from "../enums";
import Position from "./Position";

export default class Trapezoid {
    private corners: Position[];
    private slope1: number;
    private slope2: number;
    private yIntercept1: number;
    private yIntercept2: number;
    constructor(corners: Position[]) {
        if (corners.length !== 4) throw new Error(ERROR.TRAPEZOID_CORNER_COUNT);
        this.corners = corners;
        const [c1, c2, c3, c4] = this.corners;
        this.slope1 = (c2.y - c1.y) / (c2.x - c1.x);
        this.slope2 = (c4.y - c3.y) / (c4.x - c3.x);
        this.yIntercept1 = c1.y - this.slope1 * c1.x;
        this.yIntercept2 = c3.y - this.slope2 * c3.x;
    }

    isInsideTrapezoid(target: Position) {
        const yOnLine1 = this.slope1 * target.x + this.yIntercept1;
        const yOnLine2 = this.slope2 * target.x + this.yIntercept2;
        return target.y >= yOnLine1 && target.y <= yOnLine2;
    }
}
