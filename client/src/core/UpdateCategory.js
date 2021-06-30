import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { Link, Redirect } from "react-router-dom"
import { API } from "../config"
import { isAuthenticated } from "../auth"

const UpdateCategory = (props) => {
    const userId = isAuthenticated() ? isAuthenticated().user._id : null
    const catId = props.match.params.categoryId
    const token = isAuthenticated() ? isAuthenticated().token : null
    const [values, setValues] = useState({
        name: "",
        desc: "",
        type: "",
        error: "",
        success: false,
        redirect: false,
    })

    const { name, desc, type, error, success, redirect } = values

    const init = (catId, userId, token) => {
        const getCategory = (catId, userId, token) => {
            return fetch(`${API}/category/${catId}/${userId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => {
                    return response.json()
                })
                .catch((err) => console.error(err))
        }

        getCategory(catId, userId, token, token).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.cat_name,
                    desc: data.cat_desc,
                    type: data.cat_type,
                })
            }
        })
    }

    useEffect(() => {
        init(catId, userId, token)
    }, [])

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const createCategory = async (userId, token, { name, desc, type }) => {
        try {
            const res = await fetch(`${API}/category/${catId}/${userId}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    cat_name: name,
                    cat_type: type,
                    cat_desc: desc,
                }),
            })
            const data = await res.json()

            if (data.error) {
                setValues({
                    ...values,
                    error: data.error,
                    success: false,
                })
            } else {
                setValues({
                    ...values,
                    name: "",
                    desc: "",
                    error: "",
                    success: true,
                    redirect: true,
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        createCategory(userId, token, { name, desc, type })
    }

    const redirectUser = () => {
        if (redirect) {
            if (!error) {
                return <Redirect to='/category' />
            }
        }
    }

    const categoryForm = () => {
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
                                                    to='/'
                                                    className='noble-ui-logo d-block mb-2'
                                                >
                                                    Expense<span>Manager</span>
                                                </Link>
                                                <h5 className='text-muted font-weight-normal mb-4'>
                                                    Update category.
                                                </h5>
                                                <form className='forms-sample'>
                                                    <div className='form-group'>
                                                        <label htmlFor='nameCategory'>
                                                            Category name
                                                        </label>
                                                        <input
                                                            onChange={handleChange(
                                                                "name"
                                                            )}
                                                            type='text'
                                                            className='form-control'
                                                            id='name'
                                                            name='name'
                                                            autoComplete='name'
                                                            placeholder='Real estate'
                                                            value={name}
                                                            required
                                                        />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label>
                                                            Category Type
                                                        </label>
                                                        <select
                                                            className='form-control'
                                                            name='type'
                                                            onChange={handleChange(
                                                                "type"
                                                            )}
                                                            value={type}
                                                        >
                                                            <option>
                                                                Please select
                                                            </option>
                                                            <option value='income'>
                                                                income
                                                            </option>
                                                            <option value='expense'>
                                                                expense
                                                            </option>
                                                            <option value='both'>
                                                                both
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor='desc'>
                                                            Description
                                                        </label>
                                                        <textarea
                                                            onChange={handleChange(
                                                                "desc"
                                                            )}
                                                            className='form-control'
                                                            id='desc'
                                                            autoComplete='desc'
                                                            placeholder='information about cat'
                                                            value={desc}
                                                        />
                                                    </div>
                                                    <div className='mt-3'>
                                                        <button
                                                            type='submit'
                                                            className='btn btn-primary mr-2 mb-2 mb-md-0'
                                                            onClick={
                                                                clickSubmit
                                                            }
                                                        >
                                                            Submit and Update
                                                        </button>
                                                    </div>
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
                Category Updated.. click to view{" "}
                <Link to='/category'>Category</Link>
            </div>
        )
    }


    return (
        <Layout>
            {showError()}
            {showSuccess()}
            {categoryForm()} 
            {redirectUser()}
        </Layout>
    )
}

export default UpdateCategory
