import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import AppContext from '../contexts/AppContext'

function Home({ history }) {
  const { auth } = useContext(AppContext)
  useEffect(async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post('http://localhost:3000/auth/verify', {
        authorization: `Bearer ${token}`,
      })

      auth.setAuth({ ...response.data })
    } catch (error) {
      console.log(error, 'aqui')
      history.push('/login')
    }
  }, [])
  return (
    <div>
      <h1>Hola</h1>
    </div>
  )
}

export default Home
