export type ContentCell = number | string

interface CellFactory {
    parent:number
    row:number
    col:number
    content: ContentCell
}

export type CellOrNull = CellFactory | null