import React, { useState, useEffect } from "react"
import Layout from "../core/Layout"
import { Link, Redirect } from "react-router-dom"
import { API } from "../config"
import { isAuthenticated } from "../auth"

const UpdateIncome = (props) => {
    const userId = isAuthenticated() ? isAuthenticated().user._id : null
    const catId = props.match.params.catId
    const trans_id = props.match.params.trans_id
    const token = isAuthenticated() ? isAuthenticated().token : null
    const [cat, setCat] = useState([])
    const [values, setValues] = useState({
        amount: 0,
        trans_title: "",
        trans_desc: "",
        trans_date: new Date(),
        cat_id: "",
        error: "",
        success: false,
        redirect: false,
    })

    const {
        amount,
        trans_title,
        trans_desc,
        trans_date,
        cat_id,
        error,
        success,
        redirect,
    } = values

    const init = (userId, trans_id, token) => {
        const getCategory = (userId, token) => {
            return fetch(`${API}/income/${trans_id}/${userId}`, {
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

        getCategory(userId, token, token).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                // populate the state
                console.log("data get ", data)
                let d = new Date(data.trans_date)
                d = d.toISOString().substring(0, 10)
                setValues({
                    ...values,
                    trans_title: data.trans_title,
                    trans_desc: data.trans_desc,
                    trans_date: d,
                    amount: data.amount,
                    cat_id: data.cat_type,
                })
                console.log("data set ", trans_title,cat_id)
            }
        })
    }

    const getCategories = () => {
        return fetch(`${API}/category/${userId}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                return response.json()
            })
            .catch((err) => console.error(err))
    }

    const isIncome = (cat) => {
        if (cat.cat_type === "income" || cat.cat_type === "both") {
            return cat
        } else {
            return false
        }
    }

    useEffect(() => {
        init(userId, trans_id, token)
        getCategories().then((data) => {
            if (!data) {
                setValues({ ...values, error: "error" })
            } else {
                setCat(data.filter(isIncome))
            }
        })
    }, [])

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const createIncome = async (
        userId,
        token,
        { amount, trans_title, trans_desc, trans_date, cat_id }
    ) => {
        try {
            const res = await fetch(
                `${API}/income/${trans_id}/${catId}/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        trans_title: trans_title,
                        trans_desc: trans_desc,
                        trans_date: trans_date,
                        amount: amount,
                    }),
                }
            )
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
                    amount: 0,
                    trans_title: "",
                    trans_desc: "",
                    trans_date: new Date(),
                    cat_id: "",
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
        createIncome(userId, token, {
            amount,
            trans_title,
            trans_desc,
            trans_date,
            cat_id,
        })
    }

    const redirectUser = () => {
        if (redirect) {
            if (!error) {
                return <Redirect to='/income' />
            }
        }
    }

    const SelectCategory = () => {
        return (
            <div>
                <select
                    className='form-control'
                    name='cat_id'
                    onChange={handleChange("cat_id")}
                    value={cat_id}
                >
                    <option>Please select</option>
                    {cat &&
                        cat.map((c, i) => (
                            <option key={i} name={c.cat_name} value={c._id}>
                                {c.cat_name}
                            </option>
                        ))}
                </select>
            </div>
        )
    }

    const incomeForm = () => {
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
                                                    Update Income.
                                                </h5>
                                                <form className='forms-sample'>
                                                    <div className='form-group'>
                                                        <label htmlFor='amount'>
                                                            Income amount
                                                        </label>
                                                        <input
                                                            onChange={handleChange(
                                                                "amount"
                                                            )}
                                                            type='number'
                                                            className='form-control'
                                                            id='amount'
                                                            placeholder='amount of transaction'
                                                            value={amount}
                                                            required
                                                        />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor='trans_title'>
                                                            Income title
                                                        </label>
                                                        <input
                                                            onChange={handleChange(
                                                                "trans_title"
                                                            )}
                                                            type='text'
                                                            className='form-control'
                                                            id='trans_title'
                                                            placeholder='Car'
                                                            value={trans_title}
                                                            required
                                                        />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label>
                                                            Category name
                                                        </label>
                                                        <SelectCategory />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor='trans_date'>
                                                            Date of transaction
                                                        </label>
                                                        <input
                                                            onChange={handleChange(
                                                                "trans_date"
                                                            )}
                                                            type='date'
                                                            className='form-control'
                                                            id='trans_date'
                                                            autoComplete='trans_date'
                                                            value={trans_date}
                                                        />
                                                    </div>
                                                    <div className='form-group'>
                                                        <label htmlFor='trans_desc'>
                                                            Description
                                                        </label>
                                                        <textarea
                                                            onChange={handleChange(
                                                                "trans_desc"
                                                            )}
                                                            className='form-control'
                                                            id='trans_desc'
                                                            autoComplete='trans_desc'
                                                            placeholder='information about income'
                                                            value={trans_desc}
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
                Income Updated.. click to view{" "}
                <Link to='/income'>Income</Link>
            </div>
        )
    }

    return (
        <Layout>
            {showError()}
            {showSuccess()}
            {incomeForm()}
            {redirectUser()}
        </Layout>
    )
}

export default UpdateIncome
