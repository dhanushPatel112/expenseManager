import React, { useState } from "react"
import Layout from "../core/Layout"
import { Link } from "react-router-dom"
import { signup } from "../auth"

const Signup = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        error: "",
        success: false,
    })

    const { name, email, password, phone, error, success } = values

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        signup({ name, email, password, phone }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    phone: "",
                    error: "",
                    success: true,
                })
            }
        })
    }

    const signUpForm = () => {
        return (
            <div className='main-wrapper'>
                <div className='page-wrapper full-page'>
                    <div className='page-content d-flex align-items-center justify-content-center'>
                        <div className='row w-100 mx-0 auth-page'>
                            <div className='col-md-8 col-xl-6 mx-auto'>
                                <div className='card'>
                                    <div className='row'>
                                        <div className='col-md-4 pr-md-0'>
                                            <div className='auth-left-wrapper'></div>
                                        </div>
                                        <div className='col-md-8 pl-md-0'>
                                            <div className='auth-form-wrapper px-4 py-5'>
                                                <Link
                                                    to
                                                    className='noble-ui-logo d-block mb-2'
                                                >
                                                    Expense<span>Manager</span>
                                                </Link>
                                                <h5 className='text-muted font-weight-normal mb-4'>
                                                    Create a account.
                                                </h5>
                                                <form className='forms-sample'>
                                                    <div className='form-group'>
                                                        <label for='exampleInputUsername1'>
                                                            Full name
                                                        </label>
                                                        <input
                                                            onChange={handleChange(
                                                                "name"
                                                            )}
                                                            type='text'
                                                            className='form-control'
                                                            id='exampleInputUsername1'
                                                            autoComplete='Username'
                                                            placeholder='Jon Smith'
                                                            value={name}
                                                            required
                                                        />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label for='exampleInputEmail1'>
                                                            Email address
                                                        </label>
                                                        <input
                                                            onChange={handleChange(
                                                                "email"
                                                            )}
                                                            type='email'
                                                            className='form-control'
                                                            id='exampleInputEmail1'
                                                            placeholder='Email'
                                                            value={email}
                                                            required
                                                        />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label for='exampleInputPassword1'>
                                                            Password
                                                        </label>
                                                        <input
                                                            onChange={handleChange(
                                                                "password"
                                                            )}
                                                            type='password'
                                                            className='form-control'
                                                            id='exampleInputPassword1'
                                                            autoComplete='current-password'
                                                            placeholder='Password'
                                                            value={password}
                                                            required
                                                        />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label for='exampleInputPhone'>
                                                            Phone
                                                        </label>
                                                        <input
                                                            onChange={handleChange(
                                                                "phone"
                                                            )}
                                                            type='tel'
                                                            className='form-control'
                                                            id='exampleInputPhone'
                                                            placeholder='1234567890'
                                                            value={phone}
                                                            required
                                                            pattern='[0-9]{10}'
                                                        />
                                                    </div>
                                                    {/* <div className='form-check form-check-flat form-check-primary'>
                                                        <label className='form-check-label'>
                                                            <input
                                                                type='checkbox'
                                                                className='form-check-input'
                                                            />
                                                            Remember me
                                                        </label>
                                                    </div> */}
                                                    <div className='mt-3'>
                                                        <button
                                                            type='submit'
                                                            className='btn btn-primary mr-2 mb-2 mb-md-0'
                                                            onClick={
                                                                clickSubmit
                                                            }
                                                        >
                                                            Sing up
                                                        </button>
                                                    </div>
                                                    <Link
                                                        to='/signin'
                                                        className='d-block mt-3 text-muted'
                                                    >
                                                        Already a user? Sign in
                                                    </Link>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const showError = () => {
        return (
            <div
                className='alert alert-fill-danger'
                style={{ display: error ? "" : "none" }}
            >
                <div>Error</div>
                {error}
            </div>
        )
    }
    const showSuccess = () => {
        return (
            <div
                className='alert alert-fill-success'
                style={{ display: success ? "" : "none" }}
            >
                <div>success full</div>
                New account is created plz <Link to='/signin'>Signin</Link>
            </div>
        )
    }

    return (
        <Layout>
            {showError()}
            {showSuccess()}
            {signUpForm()}
        </Layout>
    )
}

export default Signup
