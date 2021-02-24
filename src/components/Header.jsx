import React from 'react'
import '../assets/styles/components/Header.css'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                Planes
            </Link>
            <Link className="navbar-brand" to="/rendimientos">
                Rendimientos
            </Link>
        </nav>
    )
}

export default Header
