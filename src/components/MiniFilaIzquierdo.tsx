import { ChangeEvent, KeyboardEvent, useState } from "react"
import { useGame } from "../context/GameContext"
import { SegmentoIzquierdo } from "../classes/SegmentoIzquierdo"
import { Segmento } from "../contracts/Segmentos"




function MiniFilaIzquierdo({ segmento }: { segmento: Segmento }) {
    const { sudoku, update } = useGame()
    const [segmentoSelected, setSegmentoSelected] = useState<SegmentoIzquierdo>(segmento as SegmentoIzquierdo)



    const onSelected = (segmento: SegmentoIzquierdo) => {
        setSegmentoSelected(segmento.newInstance())
    }

    const isInputValido = (value: string): boolean => {
        const sistemaDecimal = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => n.toString())
        return sistemaDecimal.includes(value) || value === ""
    }

    const onEdit = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name
        if (!isInputValido(value)) {
            return
        }


        if (segmentoSelected instanceof SegmentoIzquierdo) {
            if (name === "C0") {
                segmentoSelected.setC0(value)
            } else if (name === "C1") {
                segmentoSelected.setC1(value)
            } else if (name === "C2") {
                segmentoSelected.setC2(value)
            }
            setSegmentoSelected(segmentoSelected.newInstance())
        }
    }

    const onUpdate = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            if (!sudoku?.isValido({ segmento: segmentoSelected })) {
                setSegmentoSelected(segmento.newInstance() as SegmentoIzquierdo)
                return
            }
            console.log("updated")
            update({ segmento: segmentoSelected })
        }
    }

    return <div className="fila">
        <div className="col"><input name="C0" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoIzquierdo ? segmentoSelected.getC0() : ""} autoComplete="off" onFocus={() => onSelected(segmentoSelected)} onChange={onEdit} onKeyUp={onUpdate} /></div>
        <div className="col"><input name="C1" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoIzquierdo ? segmentoSelected.getC1() : ""} autoComplete="off" onFocus={() => onSelected(segmentoSelected)} onChange={onEdit} onKeyUp={onUpdate} /></div>
        <div className="col"><input name="C2" className="fila__input" type="text" value={segmentoSelected instanceof SegmentoIzquierdo ? segmentoSelected.getC2() : ""} autoComplete="off" onFocus={() => onSelected(segmentoSelected)} onChange={onEdit} onKeyUp={onUpdate} /></div>
    </div>
}

export default MiniFilaIzquierdo