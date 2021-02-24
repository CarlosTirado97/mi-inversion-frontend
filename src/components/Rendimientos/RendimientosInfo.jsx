import React from 'react'

function RendimientosInfo({ plan, monto, fecha }) {
    return (
        <div>
            <h2>Plan: {plan && plan.Nombre}</h2>
            <h2>Monto: {monto && monto}</h2>
            <h2>Fecha: {fecha && fecha}</h2>
        </div>
    )
}

export default RendimientosInfo
