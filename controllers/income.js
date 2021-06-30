const { errorHandler } = require("../helpers/dbErrorHandler")
const Income = require("../models/income")

exports.incomeById = (req, res, next, id) => {
    Income.findById(id).exec((err, income) => {
        if (err || !income) {
            return res.status(400).json({
                error: "income does not exist",
            })
        }
        req.income = income
        next()
    })
}

exports.create = (req, res) => {
    const { trans_title, trans_desc, trans_date,amount } = req.body
    console.log(req)
    const income = new Income({
        trans_title,
        trans_desc,
        trans_date,
        amount,
        postedBy: req.profile,
        cat_type: req.category
    })
    income.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            })
        }
        res.json({ data })
    })
}

exports.read = (req, res) => {
    return res.json(req.income)
}


exports.update = (req, res) => {
    const { trans_title, trans_desc, trans_date,amount } = req.body
    Income.findOne(req.income._id , (err, income) => {
        if (err || !income) {
            return res.status(400).json({
                error: "transaction not found",
            })
        }
        if (!trans_title) {
            return res.status(400).json({
                error: "trans_title is required",
            })
        } else {
            income.trans_title = trans_title
        }
        if (!trans_date) {
            return res.status(400).json({
                error: "trans_date is required",
            })
        } else {
            income.trans_date = trans_date
        }
        if(!amount){
            return res.status(400).json({
                error: "amount is required",
            })
        } else {
            income.amount = amount
        }
        trans_desc ? (income.trans_desc = trans_desc) : null
        income.postedBy = req.profile
        income.cat_type = req.category

        income.save((err, updatedIncome) => {
            if (err) {
                console.log("income UPDATE ERROR", err)
                return res.status(400).json({
                    error: "income update failed",
                })
            }
            res.json(updatedIncome)
        })
    })
   
}

exports.remove = (req, res) => {
    const income = req.income
    income.remove((err, data) => {
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
    Income.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id email")
        .populate('cat_type','cat_type')
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                })
            }
            res.json(data)
        })
}
