const validateUser = (user = '') => {
    if (user.trim() == '') {
        return `El campo User no puede estar vacio`
    }
    if (user.length < 4) {
        return `El campo User tiene que tener un minimo de 4 caracteres`
    }
    if (user.length > 25) {
        return `El campo User no puede sobrepasar 25 caracteres`
    }
}

const validatePassword = (password = '') => {
    if (password.trim() == '') {
        return `El campo Password no puede estar vacio`
    }
    if (password.length < 6) {
        return `El campo Password tiene que tener un minimo de 4 caracteres`
    }
    if (password.length > 15) {
        return `El campo Password no puede sobrepasar 25 caracteres`
    }
}

const validateField = (field, validations = {}) => {
    const { name, value } = field
    const { min, max, notNull } = validations

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

export default (usuario) => {
    let errors = { User: null, Password: null }
    let validations = {
        User: { min: 4, max: 25, notNull: true },
        Password: { min: 6, max: 15, notNull: true },
    }

    Object.keys(errors).map((k) => {
        errors[k] = validateField(
            { value: usuario[k], name: k },
            validations[k]
        )
    })

    return errors
}
