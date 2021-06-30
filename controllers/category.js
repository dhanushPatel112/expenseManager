const Category = require("../models/category")
const { errorHandler } = require("../helpers/dbErrorHandler")
const User = require("../models/user")

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category from params does not exist",
            })
        }
        req.category = category
        next()
    })
}

exports.create = (req, res) => {
    const { cat_name, cat_desc, cat_type } = req.body
    req.profile.salt = undefined
    req.profile.hashed_password = undefined
    const category = new Category({
        cat_name,
        cat_desc,
        cat_type,
        postedBy: req.profile,
    })
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            })
        }
        res.json({ data })
    })
}

exports.read = (req, res) => {
    return res.json(req.category)
}

// Update a User by the id in the request
exports.update = (req, res) => {
    console.log(
        "UPDATE Category - req.category",
        req.category,
        "UPDATE DATA",
        req.body,
        "params",
        req.params
    )
    const { cat_name, cat_desc, cat_type } = req.body

    Category.findOne(req.category._id , (err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Category not found",
            })
        }
        if (!cat_name) {
            return res.status(400).json({
                error: "cat_name is required",
            })
        } else {
            category.cat_name = cat_name
        }
        if (!cat_type) {
            return res.status(400).json({
                error: "cat_type is required",
            })
        } else {
            category.cat_type = cat_type
        }
        cat_desc ? (category.cat_desc = cat_desc) : null
        category.postedBy = req.profile

        category.save((err, updatedCategory) => {
            if (err) {
                console.log("Category UPDATE ERROR", err)
                return res.status(400).json({
                    error: "Category update failed",
                })
            }
            res.json(updatedCategory)
        })
    })
}

exports.remove = (req, res) => {
    const category = req.category
    category.remove((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err),
            })
        }
        res.json({
            message: "Category deleted",
        })
    })
}

exports.list = (req, res) => {
    Category.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id email")
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err),
                })
            }
            res.json(data)
        })
}
