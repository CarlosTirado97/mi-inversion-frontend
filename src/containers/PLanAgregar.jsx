import React, { useEffect, useState } from 'react'
import '../assets/styles/containers/PlanModificar.css'
import axios from 'axios'
import useFormValidation from '../hooks/useFormValidation'
import PlanForm from '../components/Planes/PlanForm'

function PlanModificar({ history }) {
    const [plan, setPlan] = useState({
        id: null,
        Nombre: '',
        Duracion: 0,
        InversionMinima: 0,
        InversionMaxima: 0,
        TasaMensual: 0
    })
    const [loading, setLoading] = useState(true)
    const [errors, validate] = useFormValidation(plan)
    const [addError, setAddError] = useState('')

    async function addPlan(p) {
        console.log(p)
        const token = localStorage.getItem('token')
        console.log(token)
        setAddError('')
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
                let response = await axios.post(
                    `http://localhost:3000/planes`,
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
                setAddError(
                    error.response.data.err.message ||
                        'Error al agregar el plan'
                )
                console.log(error)
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
        addPlan(plan)
    }

    return (
        <div className="Modificar-container">
            <div className="Form-container">
                <PlanForm
                    plan={plan}
                    onSubmit={onSubmit}
                    errors={errors}
                    onChange={onChange}
                    submitError={addError}
                    textoBoton={'Agregar'}
                />
            </div>
        </div>
    )
}

export default PlanModificar
