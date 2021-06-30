import { API } from "../config"
import queryString from "query-string"

export const readCategory = (categoryId,userId) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json()
        })
        .catch((err) => console.log(err))
}

export const listCategory = (userId) => {
    // const query = queryString.stringify(params)
    // console.log("query", query)
    // /search attach if not working
    return fetch(`${API}/category/${userId}`, {
        method: "GET",
    })
        .then((response) => {
            return response.json()
        })
        .catch((err) => console.log(err))
}