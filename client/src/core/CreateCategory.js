import React, { useState } from "react"
import Layout from "../core/Layout"
import { Link } from "react-router-dom"
import { API } from "../config"
import { isAuthenticated } from "../auth"
import { Dropdown } from "react-bootstrap"

const CreateCategory = (props) => {
    const userId = props.match.params.userId
    const token = isAuthenticated() ? isAuthenticated().token : null
    const [list, setList] = useState("")
    const [values, setValues] = useState({
        name: "",
        desc: "",
        error: "",
        success: false,
    })

    const { name, desc, error, success } = values

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const handleTypeList = (ty) => (event) => {
        setList(ty)
    }

    const createCategory = async (userId, token, type, { name, desc }) => {
        try {
            const res = await fetch(`${API}/category/create/${userId}`, {
                method: "POST",
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
                })
            }
        } catch (err) {
            console.error(err)
        }
    }

    const clickSubmit = (event) => {
        event.preventDefault()
        setValues({ ...values, error: false })
        createCategory(userId, token, list, { name, desc })
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
                                                    Create category.
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
                                                            autoComplete='name'
                                                            placeholder='Real estate'
                                                            value={name}
                                                            required
                                                        />
                                                    </div>
                                                    <div className='form-group'>
                                                        <Dropdown>
                                                            <Dropdown.Toggle
                                                                variant='secondary'
                                                                id='dropdown-basic'
                                                            >
                                                                Type
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu>
                                                                <Dropdown.Item
                                                                    onClick={handleTypeList(
                                                                        "expense"
                                                                    )}
                                                                >
                                                                    Expense
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    onClick={handleTypeList(
                                                                        "income"
                                                                    )}
                                                                >
                                                                    Income
                                                                </Dropdown.Item>
                                                                <Dropdown.Item
                                                                    onClick={handleTypeList(
                                                                        "both"
                                                                    )}
                                                                >
                                                                    Both
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>

                                                        <div
                                                            className='form-control'
                                                            value={list}
                                                        >
                                                            {list}
                                                        </div>
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
                                                            Submit and Create
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
                New category is created click to view{" "}
                <Link to='/category'>Category</Link>
            </div>
        )
    }

    return (
        <Layout>
            {showError()}
            {showSuccess()}
            {categoryForm()}
        </Layout>
    )
}

export default CreateCategory
