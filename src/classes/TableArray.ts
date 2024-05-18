import { RowSudoku } from "./RowSudoku";


export class TableArray {
    private rowsTable: RowSudoku[]

    constructor(rowsTable: RowSudoku[]) {
        this.rowsTable = rowsTable
    }

    toArray() {
        return this.rowsTable
    }
}