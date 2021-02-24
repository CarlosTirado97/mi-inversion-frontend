import React, { useEffect, useState } from 'react'
import '../assets/styles/containers/PlanModificar.css'
import axios from 'axios'
import NotFound from './NotFound'
import useFormValidation from '../hooks/useFormValidation'
import PlanForm from '../components/Planes/PlanForm'

function PlanModificar({ match, history }) {
    const { id } = match.params
    const [plan, setPlan] = useState({
        id: null,
        Nombre: null,
        Duracion: null,
        InversionMinima: null,
        InversionMaxima: null,
        TasaMensual: null
    })
    const [loading, setLoading] = useState(true)
    const [errors, validate] = useFormValidation(plan)
    const [updateError, setUpdateError] = useState('')

    useEffect(() => {
        getPlan(id)
    }, [])

    async function getPlan(id) {
        const token = localStorage.getItem('token')
        setLoading(true)
        try {
            const response = await axios.get(
                `http://localhost:3000/planes/${id}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            )
            setPlan(response.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    async function updatePlan(p) {
        console.log(p)
        const token = localStorage.getItem('token')
        setUpdateError('')
        const validations = {}
        validations.Nombre = { string: true, required: true, min: 6, max: 25 }
        validations.Duracion = { number: true, required: true, min: 1 }
        validations.InversionMinima = { number: true, required: true, min: 1 }
        validations.InversionMaxima = {
            number: true,
            required: true,
            min: p.InversionMinima
        }
        validations.TasaMensual = {
            number: true,
            required: true,
            min: 0,
            max: 100
        }
        validations.Duracion = { number: true, required: true, min: 1 }

        const formErrors = validate(validations)
        console.log(formErrors)
        if (
            !formErrors.Nombre &&
            !formErrors.Duracion &&
            !formErrors.InversionMinima &&
            !formErrors.InversionMaxima &&
            !formErrors.TasaMensual
        ) {
            try {
                p.id
                let response = await axios.put(
                    `http://localhost:3000/planes/${id}`,
                    {
                        Nombre: p.Nombre,
                        Duracion: p.Duracion,
                        InversionMinima: p.InversionMinima,
                        InversionMaxima: p.InversionMaxima,
                        TasaMensual: p.TasaMensual
                    },
                    {
                        headers: {
                            authorization: `Bearer ${token}`
                        }
                    }
                )
                console.log(response)
                history.push('/')
            } catch (error) {
                setUpdateError(
                    error.response.data.err.message || 'Error al modificar'
                )
                console.log(error.response.data)
            }
        }
    }

    const onChange = (e) => {
        setPlan({
            ...plan,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (plan) => {
        updatePlan(plan)
    }

    if (!loading && !plan.id) {
        return <NotFound mensaje={'No existe el plan'} />
    }
    return (
        <div className="Modificar-container">
            {plan && plan.id && (
                <div className="Form-container">
                    <PlanForm
                        plan={plan}
                        onSubmit={onSubmit}
                        errors={errors}
                        onChange={onChange}
                        submitError={updateError}
                        textoBoton={'Actualizar'}
                    />
                </div>
            )}
        </div>
    )
}

export default PlanModificar
