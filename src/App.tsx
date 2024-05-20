import { useEffect } from "react"
import { useGame } from "./context/GameContext"
import Table from "./components/Table"
import "./App.css"



function App() {
  const { loadSudoku, sudoku } = useGame()

  useEffect(() => {
    loadSudoku()
  }, [])


  return <div className="app">
    <h1 className="title">Sudoku</h1>
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
}

export default App