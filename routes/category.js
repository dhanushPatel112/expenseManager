const router = require("express").Router()
const { requireSignin, isAuth } = require("../controllers/auth")
const {
    categoryById,
    create,
    read,
    update,
    list,
    remove,
} = require("../controllers/category")
const {userById} = require("../controllers/user");

router.get("/category/:categoryId/:userId", requireSignin, isAuth, read)
router.get("/category/:userId", requireSignin, isAuth, list)
router.put("/category/:categoryId/:userId", requireSignin, isAuth, update)
router.post("/category/create/:userId", requireSignin, isAuth, create)
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, remove)

router.param("categoryId", categoryById)
router.param("userId", userById)
module.exports = router
