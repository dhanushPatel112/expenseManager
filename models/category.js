const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const categorySchema = new mongoose.Schema(
    {
        cat_name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true,
        },
        cat_desc: {
            type: String,
            maxlength: 200,
        },
        cat_type: {
            type: String,
            enum: ["income", "expense", "both"],
            required: true,
        },
        postedBy: {
            type: ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Category", categorySchema)
