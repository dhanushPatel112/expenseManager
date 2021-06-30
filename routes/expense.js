const router = require("express").Router()
const { requireSignin, isAuth } = require("../controllers/auth")
const { categoryById } = require("../controllers/category")
const { userById } = require("../controllers/user")
const { expenseById,create,read,list,update,remove } = require("../controllers/expense")

router.post("/expense/create/:categoryId/:userId", requireSignin, isAuth, create)
router.get("/expense/:expenseId/:userId", requireSignin, isAuth, read)
router.get("/expense/list/:categoryId/:userId", requireSignin, isAuth, list)
router.put("/expense/:expenseId/:categoryId/:userId", requireSignin, isAuth, update)
router.delete("/expense/:expenseId/:categoryId/:userId", requireSignin, isAuth, remove)

router.param("expenseId",expenseById)
router.param("categoryId", categoryById)
router.param("userId", userById)
module.exports = router
