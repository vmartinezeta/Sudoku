import { SegmentoCentro } from "../classes/SegmentoCentro"
import { SegmentoDerecho } from "../classes/SegmentoDerecho"
import { SegmentoIzquierdo } from "../classes/SegmentoIzquierdo"
import { ContentCell } from "./Cell"


interface SegmentoFactory {
    parent:number
    child: number    
}

export interface SegmentoIzquierdoFactory extends SegmentoFactory {
    c0: ContentCell
    c1: ContentCell
    c2: ContentCell
}

export interface SegmentoCentroFactory extends SegmentoFactory{
    c3:ContentCell
    c4:ContentCell
    c5:ContentCell
}

export interface SegmentoDerechoFactory extends SegmentoFactory {
    c6: ContentCell
    c7: ContentCell
    c8: ContentCell
}


export type Segmento = SegmentoIzquierdo | SegmentoCentro | SegmentoDerecho