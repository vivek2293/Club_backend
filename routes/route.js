const express = require("express");
const router = express.Router();

const {
    getRequest,
    register,
    login,
    verify,
} = require("../function/auth_route");

const {
    getAllClubList
} = require("../function/club_info");

const {
    verifyToken,
} = require("../function/verify_token");
const {
    refreshToken,
} = require("../function/refresh_token");
const { verifyEmail } = require("../function/nodemailer");

router.get("/getData", getRequest);
router.post("/auth/create", register);
router.post("/auth/login", login);
router.post("/auth/verify", verifyToken, refreshToken, verify);

router.post("/list/club", getAllClubList);
router.post("/sendMail", verifyEmail)

module.exports = router;