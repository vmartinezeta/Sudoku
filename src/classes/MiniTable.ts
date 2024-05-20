import { ContentCell } from "../contracts/Cell"
import { Segmento } from "../contracts/Segmentos"


export abstract class MiniTable {
    protected cells: ContentCell[][]
    protected parent: number


    constructor({ parent, cells }: { parent: number, cells?:ContentCell[][] }) {
        this.parent = parent
        if (cells) {
            this.cells = cells
        } else {
            this.cells = []
            for (let i = 0; i < 3; i++) {
                const rows = []
                for (let j = 0; j < 3; j++) {
                    rows[j] = ""
                }
                this.cells[i] = rows
            }
        }
    }

    toSegmentoArray() {
        return [0, 1, 2].map(index => this.crearSegmento({ index }))
    }

    public abstract crearSegmento({ index }: { index: number }): Segmento


    from({ index }: { index: number }) {
        return this.cells[index]
    }


    update({ index, updated }: { index: number, updated: ContentCell[] }) {
        for (let j = 0; j < 3; j++) {
            this.cells[index][j] = updated[j]
        }
    }


    toArray() {
        return this.cells
    }

    toFlatArray() {
        const cells = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cells.push(this.cells[i][j])
            }
        }
        return cells
    }

    existe(value:string) {
        return this.toFlatArray().includes(value)
    }

    public abstract newInstance(): MiniTable
}