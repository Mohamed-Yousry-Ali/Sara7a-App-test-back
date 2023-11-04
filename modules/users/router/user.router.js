const { register, login } = require("../controller/auth.controller")

const userRouter = require("express").Router()


userRouter.post("/user/register", register)
userRouter.post("/user/login", login)


module.exports = userRouter