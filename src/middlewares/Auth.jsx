import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import AppContext from '../contexts/AppContext'
import { useHistory, useLocation } from 'react-router-dom'
import matchWithActualPath from '../utils/matchWithActualPath'

function Auth({ children, routes }) {
    const { auth } = useContext(AppContext)

    const [next, setNext] = useState(false)
    const location = useLocation()
    const history = useHistory()

    useEffect(async () => {
        checkRoutes()
    }, [])

    async function checkRoutes() {
        if (
            routes.find((r) => {
                return matchWithActualPath(location, r)
            })
        ) {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.post(
                    'http://localhost:3000/auth/verify',
                    {
                        authorization: `Bearer ${token}`
                    }
                )

                auth.setAuth({ ...response.data })
                setNext(true)
            } catch (error) {
                console.log(error)
                history.push('/login')
            }
        } else {
            setNext(true)
        }
    }

    return <>{next && children}</>
}

export default Auth
