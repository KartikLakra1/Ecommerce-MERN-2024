import express from "express";
import { loginController, registerController, testController, forgotpasswordController, updateProfileController } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../MiddleWare/authMiddleware.js";

// router Object
const router = express.Router()


// requests
router.post("/register", registerController);

router.post("/login", loginController)

// forgot password
router.post('/forgot-password', forgotpasswordController)

// test router
router.get("/test", requireSignIn, isAdmin, testController)

// protected route authController
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

// update User
router.put('/profile', requireSignIn, updateProfileController);



export default router;