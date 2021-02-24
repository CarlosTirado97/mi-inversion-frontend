import React from 'react'

function RendimientosTablaCalcularItem({ r, i, plan }) {
    return i === 0 ? (
        <tr key={r.plazo}>
            <th>{plan}</th>
            <td>{r.fecha}</td>
            <td>{r.tasa}</td>
            <td>{r.monto}</td>
            <td>{r.rendimiento}</td>
            <td>{r.plazo}</td>
        </tr>
    ) : (
        <tr key={r.plazo}>
            <th></th>
            <td>{r.fecha}</td>
            <td>{r.tasa}</td>
            <td>{r.monto}</td>
            <td>{r.rendimiento}</td>
            <td>{r.plazo}</td>
        </tr>
    )
}

export default RendimientosTablaCalcularItem
