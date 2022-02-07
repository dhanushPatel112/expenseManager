import React, { useState } from "react";
import Layout from "../core/Layout";
import { Link } from "react-router-dom";
import { signup } from "../auth";
import "./style.css";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, phone, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password, phone })
      .then((data) => {
        try {
          if (data.error) {
            setValues({ ...values, error: data.error, success: false });
          } else {
            setValues({
              ...values,
              name: "",
              email: "",
              password: "",
              phone: "",
              error: "",
              success: true,
            });
          }
        } catch {
          setValues({ ...values, error: data, success: false });
        }
      })
      .catch((err) => {
        setValues({ ...values, error: err, success: false });
      });
  };

  const signUpForm = () => (
    <div id="body_html">
      <div className="session">
        <div className="left"></div>
        <form action="" className="log-in" autoComplete="off">
          <p>Welcome to </p>
          <h4>
            Expense <span>Manager</span>
          </h4>
          <div className="floating-label">
            <input
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              onChange={handleChange("email")}
              required
              value={email}
            />
            <label htmlFor="email">Email:</label>
            <div className="icon"></div>
          </div>
          <div className="floating-label">
            <input
              placeholder="Name"
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              onChange={handleChange("name")}
              value={name}
            />
            <label htmlFor="name">Name:</label>
            <div className="icon"></div>
          </div>

          <div className="floating-label">
            <input
              onChange={handleChange("phone")}
              type="tel"
              id="exampleInputPhone"
              placeholder="9786543210"
              value={phone}
              required
              pattern="[0-9]{10}"
            />
            <label htmlFor="name">Phone number:</label>
            <div className="icon"></div>
          </div>

          <div className="floating-label">
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              autoComplete="on"
              onChange={handleChange("password")}
              value={password}
            />
            <label htmlFor="password">Password:</label>
            <div className="icon"></div>
          </div>
          <button type="submit" onClick={clickSubmit}>
            Log in
          </button>
          <br />
          <Link style={{ color: "blue" }} to="/signin">
            Already a user? Sign in
          </Link>
        </form>
      </div>
    </div>
  );

  const signUpFormOld = () => {
    return (
      <div className="main-wrapper">
        <div className="page-wrapper full-page">
          <div className="page-content d-flex align-items-center justify-content-center">
            <div className="row w-100 mx-0 auth-page">
              <div className="col-md-8 col-xl-6 mx-auto">
                <div className="card">
                  <div className="row">
                    <div className="col-md-4 pr-md-0">
                      <div className="auth-left-wrapper"></div>
                    </div>
                    <div className="col-md-8 pl-md-0">
                      <div className="auth-form-wrapper px-4 py-5">
                        <Link to="/" className="noble-ui-logo d-block mb-2">
                          Expense<span>Manager</span>
                        </Link>
                        <h5 className="text-muted font-weight-normal mb-4">
                          Create a account.
                        </h5>
                        <form className="forms-sample">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Email address
                            </label>
                            <input
                              onChange={handleChange("email")}
                              type="email"
                              className="form-control"
                              id="exampleInputEmail1"
                              placeholder="Email"
                              value={email}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputUsername1">
                              Full name
                            </label>
                            <input
                              onChange={handleChange("name")}
                              type="text"
                              className="form-control"
                              id="exampleInputUsername1"
                              autoComplete="Username"
                              placeholder="Jon Smith"
                              value={name}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Password
                            </label>
                            <input
                              onChange={handleChange("password")}
                              type="password"
                              className="form-control"
                              id="exampleInputPassword1"
                              autoComplete="current-password"
                              placeholder="Password"
                              value={password}
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="exampleInputPhone">Phone</label>
                            <input
                              onChange={handleChange("phone")}
                              type="tel"
                              className="form-control"
                              id="exampleInputPhone"
                              placeholder="1234567890"
                              value={phone}
                              required
                              pattern="[0-9]{10}"
                            />
                          </div>
                          <div className="mt-3">
                            <button
                              type="submit"
                              className="btn btn-primary mr-2 mb-2 mb-md-0"
                              onClick={clickSubmit}
                            >
                              Sing up
                            </button>
                          </div>
                          <Link
                            to="/signin"
                            className="d-block mt-3 text-muted"
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
    );
  };

  const showError = () => {
    return (
      <div
        className="alert alert-fill-danger"
        style={{ display: error ? "" : "none" }}
      >
        <div>Error</div>
        {error}
      </div>
    );
  };
  const showSuccess = () => {
    return (
      <div
        className="alert alert-fill-success"
        style={{ display: success ? "" : "none" }}
      >
        <div>success full</div>
        New account is created plz <Link to="/signin">Signin</Link>
      </div>
    );
  };

  return (
    <Layout>
      {showError()}
      {showSuccess()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
