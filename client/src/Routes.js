import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Signup from "./user/Signup.js"
import Signin from "./user/Signin.js"
import Home from "./core/Home.js"
import Category from "./core/Category"
import Expense from "./Expense/Expense"
import Income from "./Income/Income"
import CreateCategory from "./core/CreateCategory"
import UpdateCategory from "./core/UpdateCategory"
import { isAuthenticated } from "./auth"
import PrivateRoute  from "./auth/PrivateRoute.js"
import CreateExpense from './Expense/CreateExpense'
import UpdateExpense from './Expense/UpdateExpense'
import CreateIncome from './Income/CreateIncome'
import UpdateIncome from './Income/UpdateIncome'

const Routes = () => {
    const handelLogin = (e) => {
        return isAuthenticated() ? true : false
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path='/signin' exact component={Signin} />
                <Route path='/signup' exact component={Signup} />
                <PrivateRoute path='/' exact component={Home} />
                <PrivateRoute
                    path='/category'
                    handelLogin={handelLogin}
                    exact
                    component={Category}
                />
                <PrivateRoute
                    path='/category/create/:userId'
                    handelLogin={handelLogin}
                    exact
                    component={CreateCategory}
                />
                <PrivateRoute
                    path='/category/update/:categoryId/:userId'
                    handelLogin={handelLogin}
                    exact
                    component={UpdateCategory}
                />
                <PrivateRoute path='/expense' exact component={Expense} />
                <PrivateRoute path='/expense/create/:userId' exact component={CreateExpense} />
                <PrivateRoute path='/expense/:trans_id/:catId/:userId' exact component={UpdateExpense} />
                <PrivateRoute path='/income' exact component={Income} />
                <PrivateRoute path='/income/create/:userId' exact component={CreateIncome} />
                <PrivateRoute path='/income/:trans_id/:catId/:userId' exact component={UpdateIncome} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
