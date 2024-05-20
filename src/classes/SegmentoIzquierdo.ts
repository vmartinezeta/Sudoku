import { ContentCell } from "../contracts/Cell"
import { SegmentoIzquierdoFactory } from "../contracts/Segmentos"


export class SegmentoIzquierdo {
    private parent: number
    private child: number
    private c0: ContentCell
    private c1: ContentCell
    private c2: ContentCell

    constructor({ parent, child, c0, c1, c2 }: SegmentoIzquierdoFactory) {
        this.parent = parent
        this.child = child
        this.c0 = c0
        this.c1 = c1
        this.c2 = c2
    }

    getParent() {
        return this.parent
    }

    getChild() {
        return this.child
    }

    setC0(value: ContentCell) {
        this.c0 = value
    }

    getC0() {
        return this.c0
    }

    setC1(value: ContentCell) {
        this.c1 = value
    }

    getC1() {
        return this.c1
    }

    setC2(value: ContentCell) {
        this.c2 = value
    }

    getC2() {
        return this.c2
    }


    newInstance() {
        return new SegmentoIzquierdo({ parent: this.parent, child: this.child, c0: this.c0, c1: this.c1, c2: this.c2 })
    }
}