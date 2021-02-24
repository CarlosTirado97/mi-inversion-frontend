import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
//CONTAINERS
import Planes from '../containers/Planes'
import Home from '../containers/Home'
import Login from '../containers/Login'
import NotFound from '../containers/NotFound'
import PlanModificar from '../containers/PlanModificar'
import PlanAgregar from '../containers/PLanAgregar'
import Rendimientos from '../containers/Rendimientos'
//CONTEXT
import AppContext from '../contexts/AppContext'
//LAYOUT
import Layout from '../layouts/Layout'
//HOOKS
import useInitialState from '../hooks/useInitialState'

function App() {
    const [auth, setAuth] = useState({ id: null, User: null })
    const [planes, getPlanes] = useInitialState(`http://localhost:3000/planes`)

    const globalState = {
        auth: { ...auth, setAuth },
        Planes: { planes, getPlanes }
    }

    return (
        <AppContext.Provider value={globalState}>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/planes" component={Planes} />
                        <Route exact path="/" component={Home} />
                        <Route
                            exact
                            path="/planes/modificar/:id"
                            component={PlanModificar}
                        />
                        <Route
                            exact
                            path="/planes/agregar"
                            component={PlanAgregar}
                        />
                        <Route
                            exact
                            path="/rendimientos"
                            component={Rendimientos}
                        />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default App
