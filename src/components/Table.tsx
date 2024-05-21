import { MiniTable } from "../classes/MiniTable"
import { MiniTableCentro } from "../classes/MiniTableCentro"
import { MiniTableDerecho } from "../classes/MiniTableDerecho"
import { MiniTableIzquierdo } from "../classes/MiniTableIzquierdo"
import MiniFilaCentro from "./MiniFilaCentro"
import MiniFilaDerecho from "./MiniFilaDerecho"
import MiniFilaIzquierdo from "./MiniFilaIzquierdo"


function Table({ minitable }: { minitable: MiniTable }) {
    return <div className="minitable">
        {
            minitable.toSegmentoArray().map((segmento, index) => {
                return <div key={index}>
                    {minitable instanceof MiniTableIzquierdo && <MiniFilaIzquierdo segmento={segmento} />}
                    {minitable instanceof MiniTableCentro && <MiniFilaCentro segmento={segmento} />}
                    {minitable instanceof MiniTableDerecho && <MiniFilaDerecho segmento={segmento} />}
                </div>
            })
        }
    </div>
}

export default Table