import React, { useEffect, useState } from "react"
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth"
import { API } from "../config"
import { Link } from "react-router-dom"
import Moment from 'react-moment';
import 'moment-timezone';
import "../core/style.css"

const Expense = () => {
    const [expense, setExpense] = useState([])
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const id = isAuthenticated() ? isAuthenticated().user._id : null
    const token = isAuthenticated() ? isAuthenticated().token : null

    const fetchE = async (catId) => {
        try {
            const res = await fetch(`${API}/expense/list/${catId}/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await res.json()
            setExpense(
                data.map((expense) => {
                    return expense
                })
            )
        } catch (err) {
            setError(err)
        }
    }

    const deleteCat = async (_id, cat_id, user_id, token) => {
        try {
            const res = await fetch(
                `${API}/expense/${_id}/${cat_id}/${user_id}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            const data = await res.json()
            if (!data) {
                setError({
                    ...error,
                    error: "There is problem Deleting Category",
                })
            }
            if (data) {
                setSuccess(true)
            }
            window.location.reload()
        } catch (err) {
            setError(err)
        }
    }

    const ShowExpense = ({ e }) => {
        return (
            <tr>
                <th scope='row'>{e.trans_title}</th>
                <td>{e.amount}</td>
                <Moment format={"YYYY/MM/DD"}>{e.trans_date}</Moment>
                <td>{e.trans_desc}</td>
                <td>
                <Link
                        className='btn btn-warning btn-md'
                        to={`/expense/${e._id}/${e.cat_type._id}/${e.postedBy._id}`}
                        style={{ flex: 1, flexDirection: "row" }}
                    >
                        Update Expense
                    </Link>
                </td>
                <td>
                    <button
                        type='button'
                        className='btn btn-danger'
                        onClick={() => {
                            deleteCat(
                                e._id,
                                e.cat_type._id,
                                isAuthenticated().user._id,
                                isAuthenticated().token
                            )
                        }}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        )
    }

    const showSuccess = () => {
        return (
            <div
                className='alert alert-fill-success'
                style={{ display: success ? "" : "none" }}
            >
                Deletion of Category Successful
            </div>
        )
    }

    useEffect(() => {
        const listExpense = async (userId, token) => {
            try {
                const cat_res = await fetch(`${API}/category/${userId}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                const all_cat = await cat_res.json()
                const id_cat = all_cat.map((cat) => cat._id)

                id_cat.forEach((id) => fetchE(id))
            } catch (err) {
                setError(err)
            }
        }

        listExpense(id, token)
    }, [])

    return (
        <Layout>
            <div>
                <div className='row' style={{ textAlign: "center" }}>
                    <div className='col-12'>
                        <div className='center' style={{ textAlign: "center" }}>
                            <table className='table container'>
                                <thead>
                                    <tr>
                                        <th scope='col'>Expense name</th>
                                        <th scope='col'>Amount</th>
                                        <th scope='col'>Date</th>
                                        <th scope='col'>Description</th>
                                        <th scope='col'>Update</th>
                                        <th scope='col'>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expense.map((e, i) => (
                                        <ShowExpense e={e} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {showSuccess()}
                        <hr />
                    </div>
                </div>
                <div>{error}</div>

                <Link
                    className='btn btn-primary btn-lg center'
                    style={{ textAlign: "center" }}
                    to={`/expense/create/${id}`}
                    id="exp_button"
                >
                    Add expense
                </Link>
            </div>
        </Layout>
    )
}

export default Expense
