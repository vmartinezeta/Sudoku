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

    update({ row }: { row: Segmento }) {
        const rowParent = this.rowTable[row.getParent()]
        const [izquierda, centro, derecha] = rowParent.getTables()
        if (row instanceof SegmentoIzquierdo) {
            izquierda.update({ index: row.getChild(), updated: [row.getC0(), row.getC1(), row.getC2()] })
        } else if (row instanceof SegmentoCentro) {
            centro.update({ index: row.getChild(), updated: [row.getC3(), row.getC4(), row.getC5()] })
        } else if (row instanceof SegmentoDerecho) {
            derecha.update({ index: row.getChild(), updated: [row.getC6(), row.getC7(), row.getC8()] })
        }
    }

    fullRow({row}:{row:Segmento}) {
        const parent = row.getParent()
        const rowTable = this.rowTable[parent].getTables()
        const rowizq = rowTable[0].toArray()[row.getChild()]
        const rowcentro = rowTable[1].toArray()[row.getChild()]
        const rowder = rowTable[2].toArray()[row.getChild()]
        return [...rowizq, ...rowcentro, ...rowder]
    }

    toArray() {
        return this.rowTable
    }

    newInstance() {
        return new Sudoku(this.rowTable.map(r => r.newInstance()))
    }
}