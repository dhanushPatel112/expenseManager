import React, { useEffect, useState } from "react"
import Layout from "../core/Layout"
import { Link } from "react-router-dom"
import { API } from "../config"
import { isAuthenticated } from "../auth"

const CreateIncome = (props) => {
    const userId = props.match.params.userId
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
    })

    const {
        amount,
        trans_title,
        trans_desc,
        trans_date,
        cat_id,
        error,
        success,
    } = values

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const createExpense = async (
        userId,
        token,
        { amount, trans_title, trans_desc, trans_date, cat_id }
    ) => {
        try {
            const res = await fetch(
                `${API}/income/create/${cat_id}/${userId}`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        trans_title,
                        trans_desc,
                        trans_date,
                        amount,
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
                    trans_title: "",
                    trans_desc: "",
                    trans_date: new Date(),
                    amount: 0,
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
        createExpense(userId, token, {
            amount,
            trans_title,
            trans_desc,
            trans_date,
            cat_id,
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

    const SelectCategory = () => {
        return (
            <div>
                <select
                    className='form-control'
                    name='cat_id'
                    value={cat_id}
                    onChange={handleChange("cat_id")}
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

    const isExpense = (cat) => {
        if (cat.cat_type === "income" || cat.cat_type === "both") {
            return cat
        } else {
            return false
        }
    }

    useEffect(() => {
        getCategories().then((data) => {
            if (!data) {
                setValues({ ...values, error: "error" })
            } else {
                setCat(data.filter(isExpense))

                // if (data.cat_type === "expense" || data.cat_type === "both") {
                // setCat(data)
                // }
            }
        })
    }, [values])

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
                                                    Create Income.
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
                                                            placeholder='information about expense'
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
                New income is created click to view{" "}
                <Link to='/income'>Income</Link>
            </div>
        )
    }

    const showinfo = () => {
        return <div>cat_id:{cat_id}</div>
    }

    return (
        <Layout>
            {/* {showinfo()} */}
            {showError()}
            {showSuccess()}
            {categoryForm()}
        </Layout>
    )
}

export default CreateIncome
