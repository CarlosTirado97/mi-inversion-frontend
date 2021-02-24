import React from 'react'
import '../../assets/styles/components/Planes/PlanesTable.css'
import PlanesListElement from './PlanesListElement'

function PlanesList({ planes, botonesFunciones }) {
    return (
        <table className="table table-hover">
            <thead className="Table-head">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Duracion</th>
                    <th>Inversion Minima</th>
                    <th>Inversion Maxima</th>
                    <th>Tasa Mensual</th>
                    {botonesFunciones.map((b, i) => (
                        <th key={i}></th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {planes.map((p) => (
                    <PlanesListElement
                        botonesFunciones={botonesFunciones}
                        key={p.id}
                        plan={p}
                    />
                ))}
            </tbody>
        </table>
    )
}

export default PlanesList
