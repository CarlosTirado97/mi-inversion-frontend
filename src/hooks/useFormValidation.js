import React, { useState } from 'react'

const useFormValidation = (formFields) => {
    const [errors, setErrors] = useState(formFields)

    const validateField = (field, validationsField = {}) => {
        const { name, value } = field
        const { min, max, notNull } = validationsField

        if (notNull && value.trim() == '') {
            return `El campo ${name} no puede estar vacio`
        }

        if (min && value.length < min) {
            return `El campo ${name} tiene que tener al menos ${min} caracteres`
        }
        if (max && value.length > max) {
            return `El campo ${name} no puede pasar de  ${max} caracteres`
        }
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
            }
        })
        setErrors(errorsFields)

        return errorsFields
    }

    return [errors, validateFields]
}

export default useFormValidation
