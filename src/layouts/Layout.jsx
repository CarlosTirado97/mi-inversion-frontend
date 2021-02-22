import '../assets/styles/App.css'
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'

function Layout({ children, match }) {
    const path = useLocation().pathname

    return (
        <div className="container-fluid">
            {path != '/login' && <Header />}
            {children}
            {/* <Footer /> */}
        </div>
    )
}

export default Layout
