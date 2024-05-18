import { ContentCell } from "../contracts/Cell"
import { SegmentoCentroFactory } from "../contracts/Segmentos"


export class SegmentoCentro {
    private parent: number
    private child: number
    private c3: ContentCell
    private c4: ContentCell
    private c5: ContentCell

    constructor({ parent, child, c3, c4, c5 }: SegmentoCentroFactory) {
        this.parent = parent
        this.child = child
        this.c3 = c3
        this.c4 = c4
        this.c5 = c5
    }

    getParent() {
        return this.parent
    }

    getChild() {
        return this.child
    }

    setC3(value:ContentCell) {
        this.c3 = value
    }

    getC3() {
        return this.c3
    }

    setC4(value:ContentCell) {
        this.c4 = value
    }

    getC4() {
        return this.c4
    }

    setC5(value:ContentCell) {
        this.c5 = value
    }

    getC5() {
        return this.c5
    }
}