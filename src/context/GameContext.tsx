import { createContext, useContext, useState } from "react";
import { Sudoku } from "../classes/Sudoku";
import { Segmento } from "../contracts/Segmentos";


const GameContext = createContext<{
    sudoku: Sudoku | null,
    segmentoSelected: Segmento | null,
    setSegmento: (segmento: Segmento) => void,
    loadSudoku: () => void,
    update: (row: Segmento) => void
}>({
    sudoku: null,
    segmentoSelected: null,
    setSegmento: () => { },
    loadSudoku: () => { },
    update: () => { }
})


export const useGame = () => {
    const context = useContext(GameContext)
    if (!context) {
        throw new TypeError("Es obligatorio el uso del GameProvider")
    }
    return context
}


let sudokuGlobal = new Sudoku()

export const GameProvider = ({ children }: { children: React.ReactNode }) => {

    const [sudoku, setSudoku] = useState<Sudoku>(sudokuGlobal)
    const [segmentoSelected, setSegmentoSelected] = useState<Segmento | null>(null)


    const loadSudoku = () => {
        setSudoku(sudoku)
    }

    const setSegmento = (segmento: Segmento) => {
        setSegmentoSelected(segmento)
    }

    const update = (row: Segmento) => {
        sudokuGlobal = sudokuGlobal.newInstance()
        sudokuGlobal.update({ row })
        setSudoku(sudokuGlobal)
    }


    return <GameContext.Provider value={{
        sudoku,
        segmentoSelected,
        loadSudoku,
        setSegmento,
        update
    }}>
        {children}
    </GameContext.Provider>
}