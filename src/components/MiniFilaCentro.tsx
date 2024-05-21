import { ChangeEvent, KeyboardEvent, useState } from "react"
import { useGame } from "../context/GameContext"
import { SegmentoCentro } from "../classes/SegmentoCentro"
import { Segmento } from "../contracts/Segmentos"


function MiniFilaCentro({ segmento }: { segmento: Segmento }) {
    const { sudoku, update, isPlaying } = useGame()
    const [segmentoSelected, setSegmentoSelected] = useState<SegmentoCentro>(segmento as SegmentoCentro)

    const onSelected = (segmento: SegmentoCentro) => {
        setSegmentoSelected(segmento.newInstance())
    }

    const isInputValido = (value: string): boolean => {
        const sistemaDecimal = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => n.toString())
        return sistemaDecimal.includes(value) || value === ""
    }

    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name

        if (!isPlaying) return  

        if (!isInputValido(value)) {
            return
        }

        if (segmentoSelected instanceof SegmentoCentro) {
            if (name === "C3") {
                segmentoSelected.setC3(value)
            } else if (name === "C4") {
                segmentoSelected.setC4(value)
            } else if (name === "C5") {
                segmentoSelected.setC5(value)
            }
            setSegmentoSelected(segmentoSelected.newInstance())
        }
    }

    const onUpdate = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return
        if (!sudoku?.isValido({ segmento: segmentoSelected })) {
            setSegmentoSelected(segmento.newInstance() as SegmentoCentro)
            return
        }
        update({ segmento: segmentoSelected })
    }

    return <div className="fila">
        <div className="col"><input name="C3" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoCentro ? segmentoSelected.getC3() : ""} autoComplete="off" onFocus={() => onSelected(segmentoSelected)} onChange={onEdit} onKeyUp={onUpdate} disabled={!isPlaying} /></div>
        <div className="col"><input name="C4" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoCentro ? segmentoSelected.getC4() : ""} autoComplete="off" onFocus={() => onSelected(segmentoSelected)} onChange={onEdit} onKeyUp={onUpdate} disabled={!isPlaying} /></div>
        <div className="col"><input name="C5" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoCentro ? segmentoSelected.getC5() : ""} autoComplete="off" onFocus={() => onSelected(segmentoSelected)} onChange={onEdit} onKeyUp={onUpdate} disabled={!isPlaying} /></div>
    </div>
}

export default MiniFilaCentro