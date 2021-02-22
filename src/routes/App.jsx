import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from '../containers/Home'
import Login from '../containers/Login'
import NotFound from '../containers/NotFound'
import AppContext from '../contexts/AppContext'
import Layout from '../layouts/Layout'

function App() {
    const [auth, setAuth] = useState({ id: null, User: null })

    const globalState = { auth: { ...auth, setAuth } }

    return (
        <AppContext.Provider value={globalState}>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/" component={Home} />
                        <Route component={NotFound} />
                    </Switch>
                </Layout>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default App
