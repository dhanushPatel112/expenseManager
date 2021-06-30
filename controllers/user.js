const User = require("../models/user")

// Find a single User with an id
exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found",
            })
        }
        req.profile = user
        next()
    })
}

exports.read = (req, res) => {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

// Update a User by the id in the request
exports.update = (req, res) => {
    // console.log('UPDATE USER - req.user', req.user, 'UPDATE DATA', req.body);
    const { email, password,name,phone } = req.body

    User.findOne({ _id: req.profile._id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found",
            })
        }
        if (!email) {
            return res.status(400).json({
                error: "Email is required",
            })
        } else {
            user.email = email
        }
        if (!name) {
            return res.status(400).json({
                error: "name is required",
            })
        } else {
            user.name = name
        }
        if (!phone) {
            return res.status(400).json({
                error: "phone is required",
            })
        } else {
            user.phone = phone
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({
                    error: "Password should be min 6 characters long",
                })
            } else {
                user.password = password
            }
        }

        user.save((err, updatedUser) => {
            if (err) {
                console.log("USER UPDATE ERROR", err)
                return res.status(400).json({
                    error: "User update failed",
                })
            }
            updatedUser.hashed_password = undefined
            updatedUser.salt = undefined
            res.json(updatedUser)
        })
    })
}

// Delete a Tutorial with the specified id in the request
exports.del = (req, res) => {
    const id = req.profile._id

    User.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                })
            } else {
                res.send({
                    message: "User was deleted successfully!",
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: "Could not delete User with id=" + id,
            })
        })
}
