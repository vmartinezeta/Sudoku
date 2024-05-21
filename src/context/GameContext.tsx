import { createContext, useContext, useState } from "react";
import { Sudoku } from "../classes/Sudoku";
import { Segmento } from "../contracts/Segmentos";

type State = {
    sudoku: Sudoku | null
    segmentoSelected: Segmento | null
    isPlaying: boolean
    setSegmento: (segmento: Segmento) => void
    loadSudoku: () => void
    iniciarJuego: ()=> void
    update: ({ segmento }: { segmento: Segmento }) => void
}


const GameContext = createContext<State>({
    sudoku: null,
    segmentoSelected: null,
    isPlaying: false,
    setSegmento: () => { },
    loadSudoku: () => { },
    iniciarJuego: ()=> {},
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
    const [isPlaying, setPlaying] = useState(false)

    const loadSudoku = () => {
        setSudoku(sudoku)
    }

    const setSegmento = (segmento: Segmento) => {
        setSegmentoSelected(segmento)
    }

    const update = ({ segmento }: { segmento: Segmento }) => {
        sudokuGlobal = sudokuGlobal.newInstance()
        sudokuGlobal.update({ segmento })
        setSudoku(sudokuGlobal)
    }

    const iniciarJuego = () => {
        setPlaying(true)
    }

    return <GameContext.Provider value={{
        sudoku,
        segmentoSelected,
        isPlaying,
        loadSudoku,
        setSegmento,
        update,
        iniciarJuego        
    }}>
        {children}
    </GameContext.Provider>
}