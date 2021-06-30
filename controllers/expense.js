const { errorHandler } = require("../helpers/dbErrorHandler")
const Expense = require("../models/expense")

exports.expenseById = (req, res, next, id) => {
    Expense.findById(id).exec((err, expense) => {
        if (err || !expense) {
            return res.status(400).json({
                error: "Expense does not exist",
            })
        }
        req.expense = expense
        next()
    })
}

exports.create = (req, res) => {
    const { trans_title, trans_desc, trans_date, amount } = req.body
    const expense = new Expense({
        trans_title,
        trans_desc,
        trans_date,
        amount,
        postedBy: req.profile,
        cat_type: req.category,
    })
        .populate(("postedBy", "_id email"))
        .populate(("cat_type", "_id cat_name cat_type"))
    expense.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            })
        }
        res.json({ data })
    })
}

exports.read = (req, res) => {
    return res.json(req.expense)
}

exports.update = (req, res) => {
    const { trans_title, trans_desc, trans_date, amount } = req.body
    Expense.findOne(req.expense._id, (err, expense) => {
        if (err || !expense) {
            return res.status(400).json({
                error: "transaction not found",
            })
        }
        if (!trans_title) {
            return res.status(400).json({
                error: "trans_title is required",
            })
        } else {
            expense.trans_title = trans_title
        }
        if (!trans_date) {
            return res.status(400).json({
                error: "trans_date is required",
            })
        } else {
            expense.trans_date = trans_date
        }
        if (!amount) {
            return res.status(400).json({
                error: "amount is required",
            })
        } else {
            expense.amount = amount
        }
        trans_desc ? (expense.trans_desc = trans_desc) : null
        expense.postedBy = req.profile
        expense.cat_type = req.category

        expense.save((err, updatedExpense) => {
            if (err) {
                console.log("expense UPDATE ERROR", err)
                return res.status(400).json({
                    error: "expense update failed",
                })
            }
            res.json(updatedExpense)
        })
    })
}

exports.remove = (req, res) => {
    const expense = req.expense
    expense.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            })
        }
        res.json({
            message: "transaction deleted",
        })
    })
}

exports.list = (req, res) => {
    Expense.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id email")
        .populate("cat_type", "cat_type")
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                })
            }
            res.json(data)
        })
}
