import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { API } from "../config";
import { authenticate, isAuthenticated } from "../auth";

const Home = () => {
  const [expense, setExpense] = useState([]);
  const [error, setError] = useState(false);

  const { token, user } = isAuthenticated() ? isAuthenticated() : null;
  const { _id, email, name, phone } = user;
  console.log("user ", user);
  const fetchE = async (catId) => {
    try {
      const res = await fetch(`${API}/expense/list/${catId}/${_id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setExpense(
        data.map((expense) => {
          return expense;
        })
      );
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    const listExpense = async (userId, token) => {
      try {
        const cat_res = await fetch(`${API}/category/${userId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const all_cat = await cat_res.json();
        const id_cat = all_cat.map((cat) => cat._id);

        id_cat.forEach((id) => fetchE(id));
      } catch (err) {
        setError(err);
      }
    };

    listExpense(_id, token);
  }, []);

  return (
    <Layout className="d-flex align-items-center" >
      <div className="container card text-center flex">
        <div className="card-header">Welcome {name}</div>
        <div className="card-body">
          <h6 className="card-text"> Email : {email} &emsp; &emsp; Phone : {phone}</h6>
          <p className="card-text"></p>
        </div>
        <div className="card-footer text-muted">Total Income : </div>
        <div className="card-footer text-muted">Total Expense : </div>
      </div>
    </Layout>
  );
};

export default Home;
