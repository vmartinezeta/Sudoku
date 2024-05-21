import { CellOrNull, ContentCell } from "../contracts/Cell"
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


    fullRow({ segmento }: { segmento: Segmento }) {
        const parent = segmento.getParent()
        const rowTable = this.rowTable[parent].getTables()
        const izq = rowTable[0].toArray()[segmento.getChild()]
        const centro = rowTable[1].toArray()[segmento.getChild()]
        const der = rowTable[2].toArray()[segmento.getChild()]
        return [...izq, ...centro, ...der]
    }


    fullCol(segmento: Segmento) {
        const cell = this.getCellActiva({ segmento })
        if (!cell) return []
        const col = cell.parent
        let cols: ContentCell[] = []
        for (let i = 0; i < 3; i++) {
            const table = this.rowTable[i].getTables()[col]
            cols = [...cols, ...table.getCol({ index: cell.col })]
        }
        return cols
    }


    getCellActiva({ segmento }: { segmento: Segmento }): CellOrNull {
        const rowTable = this.rowTable[segmento.getParent()]
        const [izq, centro, der] = rowTable.getTables()

        let rowOld = izq.toArray()[segmento.getChild()]
        if (segmento instanceof SegmentoCentro) {
            rowOld = centro.toArray()[segmento.getChild()]
        } else if (segmento instanceof SegmentoDerecho) {
            rowOld = der.toArray()[segmento.getChild()]
        }

        return this.findDiff(rowOld, segmento)
    }


    toSegmentoArray(segmento: Segmento) {
        if (segmento instanceof SegmentoIzquierdo) {
            return [segmento.getC0(), segmento.getC1(), segmento.getC2()]
        } else if (segmento instanceof SegmentoCentro) {
            return [segmento.getC3(), segmento.getC4(), segmento.getC5()]
        }
        return [segmento.getC6(), segmento.getC7(), segmento.getC8()]
    }


    getColParent(segmento: Segmento): number {
        if (segmento instanceof SegmentoIzquierdo) {
            return 0
        } else if (segmento instanceof SegmentoCentro) {
            return 1
        }
        return 2
    }


    findDiff(rowOld: ContentCell[], segmento: Segmento): CellOrNull {
        const rowNew = this.toSegmentoArray(segmento)
        const parent = this.getColParent(segmento)
        for (let i = 0; i < 3; i++) {
            if (rowOld[i] !== rowNew[i]) {
                return {
                    parent,
                    row: segmento.getChild(),
                    col: i,
                    content: rowNew[i]
                }
            }
        }
        return null
    }


    isValido({ segmento }: { segmento: Segmento }) {
        const cell = this.getCellActiva({ segmento })
        if (!cell) return false
        const tables = this.rowTable[segmento.getParent()].getTables()
        const table = tables[cell.parent]
        return !table.existe(cell.content) && !this.fullRow({ segmento }).includes(cell.content) && !this.fullCol(segmento).includes(cell.content)
    }


    toArray() {
        return this.rowTable
    }


    finalizo() {
        let cells:ContentCell[] = []
        for (let i=0; i<3; i++) {
            const tables = this.rowTable[i].getTables()
            for (let j=0; j<3; j++) {
                const table = tables[j]
                cells = [...cells, ...table.toFlatArray()]
            }
        }
        return !cells.some(value=>value==="")
    }


    newInstance() {
        return new Sudoku(this.rowTable.map(r => r.newInstance()))
    }
}