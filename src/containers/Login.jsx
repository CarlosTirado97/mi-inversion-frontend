import '../assets/styles/containers/Login.css'
import React, { useState, useContext } from 'react'
import UserForm from '../components/UserForm'
import AppContext from '../contexts/AppContext'
import axios from 'axios'
import useFormValidation from '../hooks/useFormValidation'

function Login({ history }) {
    const [credentials, setCredentials] = useState({ User: '', Password: '' })
    const [allowed, setAllowed] = useState(false)
    const [errors, validateFields] = useFormValidation(credentials)
    const [loginError, setLoginError] = useState('')
    const validations = {
        User: { min: 4, max: 25, notNull: true },
        Password: { min: 6, max: 15, notNull: true },
    }
    const { auth } = useContext(AppContext)

    const handleOnChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        })
    }

    const login = async () => {
        if (!errors.User && !errors.Password && allowed) {
            try {
                let response = await axios.post(
                    'http://localhost:3000/auth/login',
                    {
                        ...credentials,
                    }
                )
                response = response.data
                localStorage.setItem('token', response.token)
                console.log(response)
                auth.setAuth(response.auth)
                history.push('/')
            } catch (error) {
                console.log(error)
                setLoginError('Credenciales incorrectas')
            }
        }
    }
    const handleSubmit = () => {
        login()
    }

    return (
        <div className="container-fluid loginContainer">
            <UserForm
                user={credentials}
                handleSubmit={handleSubmit}
                onChange={handleOnChange}
                validateFields={validateFields}
                errors={errors}
                setAllowed={setAllowed}
                validations={validations}
                submitError={loginError}
            />
        </div>
    )
}

export default Login
