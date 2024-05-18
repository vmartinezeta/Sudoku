import { useEffect, useState } from "react"
import { MiniTable } from "../classes/MiniTable"
import { SegmentoCentro } from "../classes/SegmentoCentro"
import { SegmentoDerecho } from "../classes/SegmentoDerecho"
import { SegmentoIzquierdo } from "../classes/SegmentoIzquierdo"
import { Segmento } from "../contracts/Segmentos"
import { useGame } from "../context/GameContext"


function Table({ minitable }: { minitable: MiniTable }) {
    const { sudoku, update } = useGame()
    const [segmentoSelected, setSegmentoSelected] = useState<Segmento | null>(null)

    useEffect(() => {
        if (segmentoSelected !== null) {
            console.log(sudoku?.fullRow({ row: segmentoSelected }))
        }
    }, [sudoku])

    const onSelected = (segmento: Segmento) => {
        setSegmentoSelected(segmento)
    }

    const onEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name
        const sistemaDecimal = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => n.toString())
        if (!sistemaDecimal.includes(value)) {
            return
        }

        if (segmentoSelected instanceof SegmentoIzquierdo) {
            // segmentoSelected[`set${name}`](value)
            if (name === "C0") {
                segmentoSelected.setC0(value)
            } else if (name === "C1") {
                segmentoSelected.setC1(value)
            } else if (name === "C2") {
                segmentoSelected.setC2(value)
            }
        } else if (segmentoSelected instanceof SegmentoCentro) {
            if (name === "C3") {
                segmentoSelected.setC3(value)
            } else if (name === "C4") {
                segmentoSelected.setC4(value)
            } else if (name === "C5") {
                segmentoSelected.setC5(value)
            }
        } else if (segmentoSelected instanceof SegmentoDerecho) {
            if (name === "C6") {
                segmentoSelected.setC6(value)
            } else if (name === "C7") {
                segmentoSelected.setC7(value)
            } else if (name === "C8") {
                segmentoSelected.setC8(value)
            }
        }
        setSegmentoSelected(segmentoSelected)
    }

    const onUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && segmentoSelected !== null) {
            update(segmentoSelected)
        }
    }


    return <div className="minitable">
        {
            minitable.toSegmentoArray().map((segmento, index) => {

                return <div className="fila" key={index}>
                    {segmento instanceof SegmentoIzquierdo && <div className="col"><input name="C0" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoIzquierdo ? segmentoSelected.getC0() : ""} autoComplete="off" onFocus={() => onSelected(segmento)} onChange={onEdit} onKeyUp={onUpdate} /></div>}
                    {segmento instanceof SegmentoIzquierdo && <div className="col"><input name="C1" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoIzquierdo ? segmentoSelected.getC1() : ""} autoComplete="off" onFocus={() => onSelected(segmento)} onChange={onEdit} onKeyUp={onUpdate} /></div>}
                    {segmento instanceof SegmentoIzquierdo && <div className="col"><input name="C2" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoIzquierdo ? segmentoSelected.getC2() : ""} autoComplete="off" onFocus={() => onSelected(segmento)} onChange={onEdit} onKeyUp={onUpdate} /></div>}
                    {segmento instanceof SegmentoCentro && <div className="col"><input name="C3" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoCentro ? segmentoSelected.getC3() : ""} autoComplete="off" onFocus={() => onSelected(segmento)} onChange={onEdit} onKeyUp={onUpdate} /></div>}
                    {segmento instanceof SegmentoCentro && <div className="col"><input name="C4" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoCentro ? segmentoSelected.getC4() : ""} autoComplete="off" onFocus={() => onSelected(segmento)} onChange={onEdit} onKeyUp={onUpdate} /></div>}
                    {segmento instanceof SegmentoCentro && <div className="col"><input name="C5" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoCentro ? segmentoSelected.getC5() : ""} autoComplete="off" onFocus={() => onSelected(segmento)} onChange={onEdit} onKeyUp={onUpdate} /></div>}
                    {segmento instanceof SegmentoDerecho && <div className="col"><input name="C6" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoDerecho ? segmentoSelected.getC6() : ""} autoComplete="off" onFocus={() => onSelected(segmento)} onChange={onEdit} onKeyUp={onUpdate} /></div>}
                    {segmento instanceof SegmentoDerecho && <div className="col"><input name="C7" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoDerecho ? segmentoSelected.getC7() : ""} autoComplete="off" onFocus={() => onSelected(segmento)} onChange={onEdit} onKeyUp={onUpdate} /></div>}
                    {segmento instanceof SegmentoDerecho && <div className="col"><input name="C8" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoDerecho ? segmentoSelected.getC8() : ""} autoComplete="off" onFocus={() => onSelected(segmento)} onChange={onEdit} onKeyUp={onUpdate} /></div>}
                </div>
            })
        }
    </div>
}

export default Table