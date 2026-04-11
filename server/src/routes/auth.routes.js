const express = require("express")
const authController = require("../controller/auth.controller")

const router = express.Router()

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register",authController.registerController)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
router.post("/login",authController.loginController)

/**
 * @route POST /api/auth/verify-otp
 * @desc Verify OTP for user authentication
 * @access Public
 */

router.post("/verify-otp",authController.VerifyOTPController)







module.exports = router