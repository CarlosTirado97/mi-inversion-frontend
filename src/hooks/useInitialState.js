import React, { useEffect, useState } from 'react'
import axios from 'axios'

function useInitialState(path) {
    const [state, setState] = useState(null)

    async function getStateFromPath(path) {
        return new Promise(async (resolve, reject) => {
            if (!path) return reject('No se envio el path')
            try {
                const response = await axios.get(path, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setState(response.data)
                return resolve(true)
            } catch (error) {
                console.log(error)
            }
        })
    }

    return [state, getStateFromPath]
}

export default useInitialState
