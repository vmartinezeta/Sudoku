import { ChangeEvent, KeyboardEvent, useState } from "react"
import { useGame } from "../context/GameContext"
import { SegmentoDerecho } from "../classes/SegmentoDerecho"
import { Segmento } from "../contracts/Segmentos"



function MiniFilaDerecho({ segmento }: { segmento: Segmento }) {
    const { update } = useGame()
    const [segmentoSelected, setSegmentoSelected] = useState<SegmentoDerecho>(segmento as SegmentoDerecho)

    const onSelected = (segmento: SegmentoDerecho) => {
        setSegmentoSelected(segmento.newInstance())
    }


    const isInputValido = (value:string):boolean => {
        const sistemaDecimal = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => n.toString())
        return sistemaDecimal.includes(value) || value===""
    }

    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name
        if (!isInputValido(value)) {
            return
        }

        if (segmentoSelected instanceof SegmentoDerecho) {
            if (name === "C6") {
                segmentoSelected.setC6(value)
            } else if (name === "C7") {
                segmentoSelected.setC7(value)
            } else if (name === "C8") {
                segmentoSelected.setC8(value)
            }
            setSegmentoSelected(segmentoSelected.newInstance())
        }
    }

    const onUpdate = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            update({ segmento: segmentoSelected })
        }
    }


    return <div className="fila">
        <div className="col"><input name="C6" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoDerecho ?segmentoSelected.getC6():""} autoComplete="off" onFocus={() => onSelected(segmentoSelected)} onChange={onEdit} onKeyUp={onUpdate} /></div>
        <div className="col"><input name="C7" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoDerecho ?segmentoSelected.getC7():""} autoComplete="off" onFocus={() => onSelected(segmentoSelected)} onChange={onEdit} onKeyUp={onUpdate} /></div>
        <div className="col"><input name="C8" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoDerecho ?segmentoSelected.getC8():""} autoComplete="off" onFocus={() => onSelected(segmentoSelected)} onChange={onEdit} onKeyUp={onUpdate} /></div>
    </div>
}

export default MiniFilaDerecho