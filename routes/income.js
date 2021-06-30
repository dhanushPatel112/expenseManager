const router = require("express").Router()
const { requireSignin, isAuth } = require("../controllers/auth")
const { categoryById } = require("../controllers/category")
const { userById } = require("../controllers/user")
const { incomeById,create,read,list,update,remove } = require("../controllers/income")

router.post("/income/create/:categoryId/:userId", requireSignin, isAuth, create)
router.get("/income/:incomeId/:userId", requireSignin, isAuth, read)
router.get("/income/list/:categoryId/:userId", requireSignin, isAuth, list)
router.put("/income/:incomeId/:categoryId/:userId", requireSignin, isAuth, update)
router.delete("/income/:incomeId/:categoryId/:userId", requireSignin, isAuth, remove)

router.param("incomeId",incomeById)
router.param("categoryId", categoryById)
router.param("userId", userById)
module.exports = router
