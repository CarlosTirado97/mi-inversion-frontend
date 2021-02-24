import React, { useState } from 'react'

const useFormValidation = (formFields) => {
    const [errors, setErrors] = useState({})
    const validationsObject = {
        required: null,
        min: null,
        max: null,
        number: null,
        string: null
    }

    const validateField = (field, validationsField = validationsObject) => {
        let { name, value } = field

        if (value[value.length - 1] == ' ') value = value.trim('')

        if (String(value).trim() == '' || String(value) == null) {
            return `El campo ${name} no puede estar vacio`
        }

        if (validationsField.string && typeof value != 'string') {
            return `El campo ${name} tiene que ser un string, ${typeof value} mandado`
        }
        if (validationsField.number && value != 0 && !Number(value)) {
            return `El campo ${name} tiene que ser un numero, ${typeof value} mandado`
        }

        if (validationsField.typeNumber && typeof value != 'number') {
            return `El campo ${name} tiene que ser de tipo numerico, ${typeof value} enviado`
        }
        if (
            validationsField.min &&
            validationsField.string &&
            value.length < validationsField.min
        ) {
            return `El campo ${name} tiene que tener al menos ${validationsField.min} caracteres`
        }

        if (
            validationsField.min &&
            validationsField.number &&
            value < validationsField.min
        ) {
            return `El campo ${name} no puede ser menor a ${validationsField.min}`
        }
        if (
            validationsField.max &&
            validationsField.string &&
            value.length > validationsField.max
        ) {
            return `El campo ${name} no puede pasar de  ${validationsField.max} caracteres`
        }
        if (
            validationsField.max &&
            validationsField.number &&
            value > validationsField.max
        ) {
            return `El campo ${name} no puede ser mayor a ${validationsField.max}`
        }

        if (
            !validationsField.string &&
            !validationsField.number &&
            Number(value) &&
            validationsField.min &&
            Number(value) < validationsField.min
        ) {
            return `El campo ${name} no puede ser menor que ${validationsField.min}`
        }

        if (
            !validationsField.string &&
            !validationsField.number &&
            validationsField.min &&
            value.length < validationsField.min
        ) {
            return `El campo ${name} tiene que tener al menos ${validationsField.min} caracteres`
        }

        if (
            !validationsField.string &&
            !validationsField.number &&
            Number(value) &&
            validationsField.max &&
            Number(value) > validationsField.max
        ) {
            return `El campo ${name} no puede ser mayor que ${validationsField.min}`
        }

        if (
            !validationsField.string &&
            !validationsField.number &&
            validationsField.max &&
            value.length > validationsField.max
        ) {
            return `El campo ${name} no puede pasar de  ${validationsField.max} caracteres`
        }

        return null
    }

    const validateFields = (validations) => {
        let errorsFields = {}
        Object.keys(formFields).map((k) => (errorsFields[k] = null))

        Object.keys(formFields).map((k) => {
            if (validations[k]) {
                errorsFields[k] = validateField(
                    { value: formFields[k], name: k },
                    validations[k]
                )
                if (!errorsFields[k]) {
                    delete errorsFields[k]
                }
            }
        })
        if (Object.keys(errorsFields).length === 0) {
            setErrors(null)
            return null
        }
        setErrors(errorsFields)

        return errorsFields
    }

    // function createValidationsObject() {
    //     let validations = {}

    //     Object.keys(formFields).map((k) => {
    //         validations[k] = { ...validationsObject }
    //     })

    //     return validations
    // }

    return [errors, validateFields]
}

export default useFormValidation
