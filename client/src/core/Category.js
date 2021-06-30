import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { API } from "../config"
import { isAuthenticated } from "../auth"
import { Link } from "react-router-dom"

const Category = () => {
    const [category, setCategory] = useState([])
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const whole_user_id = isAuthenticated() ? isAuthenticated().user._id : null

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
        const id = isAuthenticated() ? isAuthenticated().user._id : null
        const token = isAuthenticated() ? isAuthenticated().token : null

        const listCategory = async (userId, token) => {
            try {
                const res = await fetch(`${API}/category/${userId}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                const data = await res.json()
                setCategory(
                    data.map((cat) => {
                        return cat
                    })
                )
            } catch (err) {
                setError(err)
            }
        }

        listCategory(id, token)
    }, [])

    const ShowCat = ({
        cat: {
            cat_desc,
            cat_name,
            cat_type,
            createdAt,
            postedBy: { email, user_id },
            _id,
        },
    }) => {
        const deleteCat = async (cat_id, user_id, token) => {
            try {
                const res = await fetch(
                    `${API}/category/${cat_id}/${user_id}`,
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

        return (
            <div className='card text-white bg-dark'>
                <div
                    className='card-title'
                    style={{
                        textTransform: "uppercase",
                        fontSize: "22px",
                        color: "#d5dbed",
                        fontFamily: "Gill Sans ,sans-serif,serif",
                    }}
                >
                    {cat_name}
                </div>
                <div
                    className='card-body'
                    style={{ margin: "0px", padding: "0px" }}
                >
                    <p
                        className='card-text'
                        style={{ color: "#d5dbed", fontFamily: "cursive" }}
                    >
                        Type : {cat_type}{" "}
                    </p>
                    <p
                        className='card-text'
                        style={{ color: "#d5dbed", fontFamily: "cursive" }}
                    >
                        Description : {cat_desc}
                    </p>
                </div>
                <div style={{ flex: 1, flexDirection: "row" }}>
                    <Link
                        className='btn btn-danger btn-md'
                        onClick={() => {
                            deleteCat(
                                _id,
                                whole_user_id,
                                isAuthenticated().token
                            )
                        }}
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            backgroundColor: "#b02a2a",
                            margin: "15px",
                        }}
                    >
                        Delete Category
                    </Link>
                    <Link
                        className='btn btn-danger btn-md'
                        to={`/category/update/${_id}/${whole_user_id}`}
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            backgroundColor: "#b02a2a",
                            margin: "15px",
                        }}
                    >
                        Update Category
                    </Link>
                </div>
            </div>
        )
    }
    const id = isAuthenticated() ? isAuthenticated().user._id : null
    return (
        <Layout>
            <div>
                <div className='row' style={{ textAlign: "center" }}>
                    <div className='col-12'>
                        <div
                            className='row center'
                            style={{ textAlign: "center" }}
                        >
                            {category.map((c, i) => (
                                <div
                                    key={i}
                                    className='col-4 mb-5'
                                    style={{ padding: "50px" }}
                                >
                                    <ShowCat cat={c} />
                                </div>
                            ))}
                        </div>
                        {showSuccess()}
                        <hr />
                    </div>
                </div>
                <div>{error}</div>
                {category.length && (
                    <Link
                        className='btn btn-primary btn-lg'
                        id='button'
                        style={{
                            position: "flex",
                            flexWrap: "wrap",
                            alignContent: "center",
                            alignItems: "flex-end",
                        }}
                        to={`/category/create/${id}`}
                    >
                        Create Category
                    </Link>
                )}
                {!category.length && (
                    <Link
                        className='btn btn-primary btn-lg'
                        id='button'
                        style={{
                            position: "absolute",
                            // top:"50%",
                            bottom:"10",
                            flexWrap: "wrap",
                            alignContent: "center",
                            alignItems: "flex-end",
                        }}
                        to={`/category/create/${id}`}
                    >
                        Create Category
                    </Link>
                )}
            </div>
        </Layout>
    )
}

export default Category
