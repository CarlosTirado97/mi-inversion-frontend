import React from 'react'
import RendimientosTablaCalcularItem from './RendimientosTablaCalcularItem'

function RendimientosTablaCalcular({ contrato }) {
    console.log(contrato)
    return (
        <div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>PLAN</th>
                            <th>FECHA</th>
                            <th>TASA %</th>
                            <th>MONTO INICIAL</th>
                            <th>RENDIMIENTO GANADO</th>
                            <th>PLAZO</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contrato.rendimientos.map((r, i) => (
                            <RendimientosTablaCalcularItem
                                r={r}
                                i={i}
                                plan={contrato.plan}
                            />
                        ))}
                        <tr>
                            <th>TOTAL FINAL</th>
                            <td></td>
                            <td></td>
                            <th>{contrato.monto}</th>
                            <th>{contrato.totalRendimientos}</th>
                            <th>{contrato.total}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RendimientosTablaCalcular
