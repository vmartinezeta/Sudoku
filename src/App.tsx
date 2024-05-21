import { useEffect } from "react"
import { useGame } from "./context/GameContext"
import Table from "./components/Table"
import "./App.css"



function App() {
  const { loadSudoku, sudoku, iniciarJuego, isPlaying } = useGame()

  useEffect(() => {
    loadSudoku()
  }, [])


  return <div className="app">
    <div className="app__control">
      <h1 className="title">Sudoku</h1>
      <button className="button" onClick={()=>{
          if (isPlaying) return
          iniciarJuego()
        }}>Iniciar</button>
    </div>
    <div className="app__preview">
      <div className="table">
        {
          sudoku?.toArray().map((rowTable, rowTableId) => {
            return <div className="fila" key={rowTableId}>
              {
                rowTable.getTables().map((table, tableId) => {
                  return <Table minitable={table} key={tableId} />
                })
              }
            </div>
          })
        }
      </div>
    </div>
  </div>
}

export default App