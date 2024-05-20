import { ContentCell } from "../contracts/Cell";
import { MiniTable } from "./MiniTable";
import { SegmentoDerecho } from "./SegmentoDerecho";


export class MiniTableDerecho extends MiniTable {

    constructor({ parent, cells }: { parent: number, cells?: ContentCell[][] }) {
        super({ parent, cells })
    }

    crearSegmento({ index }: { index: number }) {
        const row = this.from({ index })
        return new SegmentoDerecho({ parent: this.parent, child: index, c6: row[0], c7: row[1], c8: row[2] })
    }


    newInstance() {
        return new MiniTableDerecho({ parent: this.parent, cells: this.cells })
    }
}