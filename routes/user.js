const router = require("express").Router()
const { requireSignin, isAuth } = require("../controllers/auth")
const { update, del, userById, read } = require("../controllers/user")

router.get("/user/:userId", requireSignin, isAuth, read)
router.put("/user/:userId", requireSignin, isAuth, update)
router.param("userId", userById)
router.delete("/user/:userId", requireSignin, isAuth, del)

module.exports = router