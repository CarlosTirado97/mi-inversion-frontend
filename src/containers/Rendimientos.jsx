import React, { useContext, useEffect, useState } from 'react'
import '../assets/styles/containers/Rendimientos.css'
import AppContext from '../contexts/AppContext'
import MenuRendimientos from '../components/Rendimientos/MenuRendimientos'
import PlanestList from '../components/Planes/PlanestList'
import RendimientosInfo from '../components/Rendimientos/RendimientosInfo'
import RendimientosTablaCalcular from '../components/Rendimientos/RendimientosTablaCalcular'

function Rendimientos() {
    const seccionesFalse = {
        planes: false,
        monto: false,
        fecha: false,
        tabla: false
    }
    const { auth, Planes } = useContext(AppContext)

    const [secciones, setSecciones] = useState(seccionesFalse)
    const [plan, setPlan] = useState(null)
    const [monto, setMonto] = useState(0)
    const [fecha, setFecha] = useState('')
    const [error, setError] = useState('')
    const [contrato, setContrato] = useState({
        rendimientos: [],
        totalRendimientos: 0,
        total: 0,
        plan: '',
        monto: 0
    })

    useEffect(async () => {
        if (!Planes.planes) {
            try {
                console.log(auth)
                await Planes.getPlanes('http://localhost:3000/planes')
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log(Planes.planes)
        }
    }, [Planes.planes])

    function mostrarSeccion(seccion) {
        if (seccion == 'tabla') {
            validarCalcular()
        } else {
            setSecciones({ ...seccionesFalse, [seccion]: true })
        }
    }

    function seleccionarPlan(plan) {
        setPlan(plan)
        setSecciones({ ...seccionesFalse, monto: true })
    }

    function validarCalcular() {
        setError('')
        if (!plan) return setError('No se ha seleccionado un plan')
        if (monto < plan.InversionMinima)
            return setError(
                `El monto no puede ser menor que ${plan.InversionMinima}`
            )
        if (monto > plan.InversionMaxima)
            return setError(
                `El monto no puede ser mayor que ${plan.InversionMinima}`
            )
        if (fecha == '') {
            return setError('Selecciona la fecha')
        }
        setSecciones({ ...seccionesFalse, tabla: true })
        calcular()
    }

    function calcular() {
        let fechaFragments = fecha.split('-')
        let año = Number(fechaFragments[0])
        let mes = Number(fechaFragments[1])
        let dia = Number(fechaFragments[2])
        let rendimientos = []
        let totalRendimientos = 0

        for (let x = 0; x < plan.Duracion; x++) {
            let rendimiento = {}

            rendimiento.fecha = `${año}/${mes < 10 ? '0' + mes : mes}/${dia}`
            rendimiento.tasa = plan.TasaMensual
            rendimiento.monto = monto
            rendimiento.plazo = x + 1
            rendimiento.rendimiento = (monto * plan.TasaMensual) / 100

            if (x === 0) {
                rendimiento.rendimiento = 0
            }

            if (mes === 12) {
                mes = 1
                año++
            } else {
                mes++
            }
            rendimientos.push(rendimiento)
            totalRendimientos = totalRendimientos + rendimiento.rendimiento
        }
        setContrato({
            ...contrato,
            total: Number(monto) + Number(totalRendimientos),
            rendimientos,
            totalRendimientos,
            monto,
            plan: plan.Nombre
        })
    }

    return (
        <div className="Rendimientos-container">
            <div className="Rendimientos-body-container">
                <MenuRendimientos onClick={mostrarSeccion} />
                {secciones.planes && (
                    <PlanestList
                        planes={Planes.planes}
                        botonesFunciones={[
                            {
                                text: 'Seleccionar',
                                className: 'btn btn-info',
                                action: seleccionarPlan
                            }
                        ]}
                    />
                )}
                {secciones.monto && (
                    <div>
                        <div className="form-group">
                            <input
                                type="number"
                                className="form-control"
                                value={monto}
                                name="monto"
                                onChange={(e) => setMonto(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {secciones.fecha && (
                    <div>
                        <div className="form-group">
                            <input
                                type="date"
                                className="form-control"
                                value={fecha}
                                name="fecha"
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        </div>
                    </div>
                )}

                {secciones.tabla && (
                    <RendimientosTablaCalcular contrato={contrato} />
                )}

                <h3>{error}</h3>
                {!secciones.tabla && (
                    <RendimientosInfo plan={plan} fecha={fecha} monto={monto} />
                )}
            </div>
        </div>
    )
}

export default Rendimientos
