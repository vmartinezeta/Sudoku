import { ContentCell } from "../contracts/Cell";
import { MiniTable } from "./MiniTable";
import { SegmentoCentro } from "./SegmentoCentro";


export class MiniTableCentro extends MiniTable {

    constructor({ parent, cells }: { parent: number, cells?: ContentCell[][] }) {
        super({ parent, cells })
    }

    crearSegmento({ index }: { index: number }) {
        const row = this.from({ index })
        return new SegmentoCentro({ parent: this.parent, child: index, c3: row[0], c4: row[1], c5: row[2] })
    }


    public newInstance(): MiniTable {
        return new MiniTableCentro({ parent: this.parent, cells: this.cells })
    }
}