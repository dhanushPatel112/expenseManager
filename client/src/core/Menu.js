/* eslint-disable jsx-a11y/iframe-has-title */
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: "#0000FF",
      fontStyle: "",
      fontSize: "22px",
      fontFamily: "Verdana, sans-serif",
      padding: "0px 10px",
      margin: "0px auto",
    };
  } else {
    return {
      color: "#000000",
      fontSize: "22px",
      fontFamily: "Verdana, sans-serif",
      padding: "0px 10px",
      margin: "0px auto",
    };
  }
};

const newMenu = ({ history }) => {
  return (
    <div className="horizontal-menu">
      <nav className="navbar top-navbar">
        <div className="container">
          <div className="navbar-content">
            <Link to="/" className="navbar-brand">
              Expense<span>Manager</span>
            </Link>

            <ul className="navbar-nav">
              {!isAuthenticated() && (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-plus"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        <path
                          fillRule="evenodd"
                          d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                        />
                      </svg>
                      <span className="menu-title">Signup</span>
                    </Link>
                  </li>
                </Fragment>
              )}
              <li className="nav-item dropdown nav-apps"></li>
              {!isAuthenticated() && (
                <Fragment>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signin">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      </svg>
                      <span className="menu-title">Signin</span>
                    </Link>
                  </li>
                </Fragment>
              )}
              <li className="nav-item dropdown nav-apps"></li>
              {isAuthenticated() && (
                <Fragment>
                  <div>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signin">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-person-x"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                          <path
                            fillRule="evenodd"
                            d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                        <span className="menu-title" onClick={() => signout()}>
                          Signout
                        </span>
                        {isAuthenticated() && (
                          <li className="nav-item">
                            <span
                              className="nav-link"
                              style={{ cursor: "pointer", color: "#ffffff" }}
                              onClick={() =>
                                signout(() => {
                                  history.push("/");
                                })
                              }
                            >
                              SignOut
                            </span>
                          </li>
                        )}
                      </Link>
                    </li>
                  </div>
                </Fragment>
              )}
              <li className="nav-item dropdown nav-apps"></li>
              </ul>
          </div>
        </div>
      </nav>
      <nav className="navbar top-navbar">
        <div className="container d-flex justify-content-center">
          <ul className="nav page-navigation">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-card-text"
                  viewBox="0 0 16 16"
                >
                  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
                  <path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z" />
                </svg>
                <span style={isActive(history, "/")} className="menu-title">
                  Dashboard
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-grid-1x2-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V1zm0 9a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-5z" />
                </svg>
                <span
                  style={isActive(history, "/category")}
                  className="menu-title"
                >
                  Category
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/expense">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-file-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z" />
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                </svg>
                <span
                  style={isActive(history, "/expense")}
                  className="menu-title"
                >
                  Expense
                </span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/income">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-graph-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
                <span
                  style={isActive(history, "/income")}
                  className="menu-title"
                >
                  Income
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

// const Menu = ({ history }) => {
//   return (
//     <div className="navbar navbar-dark bg-dark">
//       <ul className="nav nav-tabs bg-primary">
//         <li className="nav-items">
//           <Link className="nav-link" style={isActive(history, "/")} to="/">
//             Home
//           </Link>
//         </li>
//         <li className="nav-items">
//           <Link
//             className="nav-link"
//             style={isActive(history, "/signin")}
//             to="/signin"
//           >
//             Signin{" "}
//           </Link>
//         </li>
//         <li className="nav-items">
//           <Link
//             className="nav-link"
//             style={isActive(history, "/signup")}
//             to="/signup"
//           >
//             Signup
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

export default withRouter(newMenu);
