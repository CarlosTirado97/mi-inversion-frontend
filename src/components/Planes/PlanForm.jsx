import React from 'react'
import '../../assets/styles/components/Planes/PlanesForm.css'

const PlanForm = ({
    plan,
    onSubmit,
    errors,
    onChange,
    submitError,
    textoBoton
}) => {
    return (
        <form>
            <div className="form-group">
                <label htmlFor="Nombre">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    name="Nombre"
                    onChange={onChange}
                    value={plan.Nombre}
                />
                {errors && errors.Nombre && (
                    <p className="error">{errors.Nombre}</p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="Duracion">Duracion</label>
                <input
                    type="number"
                    className="form-control"
                    name="Duracion"
                    onChange={onChange}
                    value={plan.Duracion}
                />
                {errors && errors.Duracion && (
                    <p className="error">{errors.Duracion}</p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="InversionMinima">Inversion Minima</label>
                <input
                    type="number"
                    className="form-control"
                    name="InversionMinima"
                    onChange={onChange}
                    value={plan.InversionMinima}
                />
                {errors && errors.InversionMinima && (
                    <p className="error">{errors.InversionMinima}</p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="InversionMaxima">Inversion Maxima</label>
                <input
                    type="number"
                    className="form-control"
                    name="InversionMaxima"
                    onChange={onChange}
                    value={plan.InversionMaxima}
                />
                {errors && errors.InversionMaxima && (
                    <p className="error">{errors.InversionMaxima}</p>
                )}
            </div>
            <div className="form-group">
                <label htmlFor="TasaMensual">Tasa Mensual</label>
                <input
                    type="number"
                    className="form-control"
                    name="TasaMensual"
                    onChange={onChange}
                    value={plan.TasaMensual}
                />
                {errors && errors.TasaMensual && (
                    <p className="error">{errors.TasaMensual}</p>
                )}
            </div>

            <div className="form-group">
                {submitError && (
                    <p className="error col-md-12">{submitError}</p>
                )}
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onSubmit(plan)}
                >
                    {textoBoton}
                </button>
            </div>
        </form>
    )
}

export default PlanForm
