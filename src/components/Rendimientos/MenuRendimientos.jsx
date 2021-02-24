import React from 'react'
import '../../assets/styles/components/Rendimientos/MenuRendimientos.css'
import MenuRendimientosItem from './MenuRendimientosItem'

function MenuRendimientos({ onClick, calcular }) {
    return (
        <div>
            <div className="Menu-container">
                <MenuRendimientosItem
                    texto={'Selecciona Plan'}
                    className={'MenuItem MenuItemNormal'}
                    onClick={() => onClick('planes')}
                />
                <MenuRendimientosItem
                    texto={'Ingresa el monto'}
                    className={'MenuItem MenuItemNormal'}
                    onClick={() => onClick('monto')}
                />
                <MenuRendimientosItem
                    texto={'Selecciona la fecha'}
                    className={'MenuItem MenuItemNormal'}
                    onClick={() => onClick('fecha')}
                />
                <MenuRendimientosItem
                    texto={'Calcular'}
                    className={'MenuItem MenuItemCalcular'}
                    onClick={() => onClick('tabla')}
                />
            </div>
        </div>
    )
}

export default MenuRendimientos
