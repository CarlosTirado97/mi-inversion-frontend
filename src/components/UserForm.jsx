import '../assets/styles/components/UserForm.css'
import React, { useState } from 'react'

function UserForm({
    user,
    onChange,
    handleSubmit,
    validateFields,
    errors,
    setAllowed,
    validations,
    submitError,
}) {
    const handlerOnClick = () => {
        const formErrors = validateFields(validations)
        if (!formErrors.User && !formErrors.Password) {
            setAllowed(true)
            handleSubmit()
        }
    }

    return (
        <div className="UseFormContainer">
            <div className="card card-container">
                <h2 className="login_title text-center">Login</h2>
                <form className="form-signin">
                    <span id="reauth-email" className="reauth-email"></span>
                    <div className="form-group">
                        <p className="input_title">User</p>
                        <input
                            type="text"
                            className="form-control"
                            name="User"
                            value={user.User}
                            onChange={onChange}
                        />
                        {errors.User && (
                            <p className="errorValidation">{errors.User}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <p className="input_title">Password</p>
                        <input
                            type="password"
                            className="form-control"
                            name="Password"
                            value={user.Password}
                            onChange={onChange}
                        />
                        {errors.Password && (
                            <p className="errorValidation">{errors.Password}</p>
                        )}
                    </div>
                    <div className="form-group">
                        {submitError && (
                            <p className="errorValidation">{submitError}</p>
                        )}
                        <button
                            className="btn btn-lg btn-primary col-md-12"
                            type="button"
                            onClick={handlerOnClick}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserForm
