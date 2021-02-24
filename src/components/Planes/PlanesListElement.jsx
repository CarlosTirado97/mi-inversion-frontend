import React from 'react'
import { Link } from 'react-router-dom'

function PlanesListElement({ plan, botonesFunciones }) {
    return (
        <tr className="Table-row">
            <td>{plan.id}</td>
            <td>{plan.Nombre}</td>
            <td>{plan.Duracion}</td>
            <td>{plan.InversionMinima}</td>
            <td>{plan.InversionMaxima}</td>
            <td>{plan.TasaMensual}</td>
            {botonesFunciones.map((b, i) => (
                <td key={i}>
                    <button
                        onClick={() => b.action(plan)}
                        className={b.className}
                    >
                        {b.text}
                    </button>
                </td>
            ))}
        </tr>
    )
}

export default PlanesListElement
