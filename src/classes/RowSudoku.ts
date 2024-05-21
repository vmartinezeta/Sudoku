import { MiniTable } from "./MiniTable";
import { MiniTableCentro } from "./MiniTableCentro";
import { MiniTableDerecho } from "./MiniTableDerecho";
import { MiniTableIzquierdo } from "./MiniTableIzquierdo";


export class RowSudoku {
    private tables: MiniTable[]
    private index: number

    constructor({ index, tables }: { index: number, tables?: MiniTable[] }) {
        this.index = index
        if (tables) {
            this.tables = tables
        } else {
            this.tables = []
            this.tables.push(new MiniTableIzquierdo({ parent: index }))
            this.tables.push(new MiniTableCentro({ parent: index }))
            this.tables.push(new MiniTableDerecho({ parent: index }))
        }
    }

    toInt() {
        return this.index
    }

    getTables(): MiniTable[] {
        return this.tables
    }

    newInstance() {
        return new RowSudoku({ index: this.index, tables: this.tables })
    }
}