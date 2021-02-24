import React, { useEffect, useContext, useState } from 'react'
import '../assets/styles/containers/Home.css'
import axios from 'axios'
import PlanesList from '../components/Planes/PlanestList'
import { Link } from 'react-router-dom'
import AppContext from '../contexts/AppContext'

function Home({ history }) {
    const { Planes } = useContext(AppContext)
    const path = 'http://localhost:3000/planes'

    useEffect(async () => {
        try {
            Planes.getPlanes(path)
        } catch (error) {
            console.log(error)
        }
    }, [])

    const eliminarPlan = async (plan) => {
        if (confirm(`Deseas eliminar el plan con id: ${plan.id}`)) {
            try {
                const response = await axios.delete(
                    `http://localhost:3000/planes/${plan.id}`,
                    {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`
                        }
                    }
                )
                await Planes.getPlanes(path)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const modificarPlan = (plan) => {
        history.push(`/planes/modificar/${plan.id}`)
    }

    return (
        <div className="container-fluid PlanesContainer">
            <h1>Planes</h1>
            <div className="TableContainer">
                <Link to="/planes/agregar">
                    <button
                        type="button"
                        className="btn btn-primary Boton-agregar"
                    >
                        Agregar
                    </button>
                </Link>

                {Planes.planes && (
                    <div className="table-responsive">
                        <PlanesList
                            planes={Planes.planes}
                            botonesFunciones={[
                                {
                                    action: modificarPlan,
                                    className: 'btn btn-info',
                                    text: 'Modificar'
                                },
                                {
                                    action: eliminarPlan,
                                    className: 'btn btn-danger',
                                    text: 'Eliminar'
                                }
                            ]}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
