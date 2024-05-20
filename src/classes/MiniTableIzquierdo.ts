import { ContentCell } from "../contracts/Cell";
import { Segmento } from "../contracts/Segmentos";
import { MiniTable } from "./MiniTable";
import { SegmentoIzquierdo } from "./SegmentoIzquierdo";


export class MiniTableIzquierdo extends MiniTable {

    constructor({ parent, cells }: { parent: number, cells?: ContentCell[][] }) {
        super({ parent, cells })
    }

    public crearSegmento({ index }: { index: number }): Segmento {
        const row = this.from({ index })
        return new SegmentoIzquierdo({
            parent: this.parent,
            child: index,
            c0: row[0],
            c1: row[1],
            c2: row[2]
        })
    }


    public newInstance(): MiniTable {
        return new MiniTableIzquierdo({ parent: this.parent, cells: this.cells })
    }
}