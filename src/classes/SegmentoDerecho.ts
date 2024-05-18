import { ContentCell } from "../contracts/Cell"
import { SegmentoDerechoFactory } from "../contracts/Segmentos"


export class SegmentoDerecho {
    public parent: number
    public child:number
    public c6: ContentCell
    public c7: ContentCell
    public c8: ContentCell

    constructor({parent, child, c6, c7, c8 }: SegmentoDerechoFactory) {
        this.parent = parent
        this.child = child
        this.c6 = c6
        this.c7 = c7
        this.c8 = c8
    }

    getParent() {
        return this.parent
    }

    getChild() {
        return this.child
    }

    setC6(value:ContentCell) {
        this.c6 = value
    }

    getC6() {
        return this.c6
    }

    setC7(value:ContentCell) {
        this.c7 = value
    }

    getC7() {
        return this.c7
    }

    setC8(value:ContentCell) {
        this.c8 = value
    }

    getC8() {
        return this.c8
    }
}