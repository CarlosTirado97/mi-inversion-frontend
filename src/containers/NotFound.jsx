import React from 'react'

function NotFound({ mensaje = 'Not Found' }) {
    return (
        <div>
            <h1>{mensaje}</h1>
        </div>
    )
}

export default NotFound
