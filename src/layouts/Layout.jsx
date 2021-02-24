import '../assets/styles/App.css'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
import Auth from '../middlewares/Auth'

function Layout({ children, match }) {
    const routes = [
        '/',
        '/planes/agregar',
        '/planes/modificar/{param}',
        '/rendimientos'
    ]
    const path = useLocation().pathname

    if (path == '/login') {
        return <div className="container-fluid">{children}</div>
    }

    return (
        <Auth routes={routes}>
            <div className="container-fluid">
                <Header />
                {children}
            </div>
        </Auth>
    )
}

export default Layout
