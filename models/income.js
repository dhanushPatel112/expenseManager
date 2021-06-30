const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const incomeSchema = new mongoose.Schema(
    {
        trans_title: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        trans_desc: {
            type: String,
            maxlength: 200,
        },
        trans_date: {
            type: Date,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            trim: true,
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
        cat_type: {
            type: ObjectId,
            ref:"Category",
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Income", incomeSchema)
