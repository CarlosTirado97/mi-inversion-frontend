import React from 'react'

function MenuRendimientosItem({ onClick, texto, className }) {
    return (
        <button type="button" onClick={onClick} className={className}>
            {texto}
        </button>
    )
}

export default MenuRendimientosItem
