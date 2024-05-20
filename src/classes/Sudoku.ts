import { Segmento } from "../contracts/Segmentos"
import { RowSudoku } from "./RowSudoku"
import { SegmentoCentro } from "./SegmentoCentro"
import { SegmentoDerecho } from "./SegmentoDerecho"
import { SegmentoIzquierdo } from "./SegmentoIzquierdo"



export class Sudoku {
    private rowTable: RowSudoku[]

    constructor(rowTable?: RowSudoku[]) {
        if (rowTable) {
            this.rowTable = rowTable
        } else {
            this.rowTable = []
            for (let index = 0; index < 3; index++) {
                this.rowTable.push(new RowSudoku({ index }))
            }
        }
    }

    update({ segmento }: { segmento: Segmento }) {
        const rowParent = this.rowTable[segmento.getParent()]
        const [izquierda, centro, derecha] = rowParent.getTables()
        if (segmento instanceof SegmentoIzquierdo) {
            izquierda.update({ index: segmento.getChild(), updated: [segmento.getC0(), segmento.getC1(), segmento.getC2()] })
        } else if (segmento instanceof SegmentoCentro) {
            centro.update({ index: segmento.getChild(), updated: [segmento.getC3(), segmento.getC4(), segmento.getC5()] })
        } else if (segmento instanceof SegmentoDerecho) {
            derecha.update({ index: segmento.getChild(), updated: [segmento.getC6(), segmento.getC7(), segmento.getC8()] })
        }
    }

    fullRow({segmento}:{segmento:Segmento}) {
        const parent = segmento.getParent()
        const rowTable = this.rowTable[parent].getTables()
        const izq = rowTable[0].toArray()[segmento.getChild()]
        const centro = rowTable[1].toArray()[segmento.getChild()]
        const der = rowTable[2].toArray()[segmento.getChild()]
        return [...izq, ...centro, ...der]
    }

    toArray() {
        return this.rowTable
    }

    newInstance() {
        return new Sudoku(this.rowTable.map(r => r.newInstance()))
    }
}