const express = require("express");
const router = express.Router();

const {
    getRequest,
    register,
    login
} = require("../function/auth_route");

const {
    verifyToken
} = require("../function/verify_token");

router.get("/getData", getRequest);
router.post("/create", register);
router.post("/verify", verifyToken, login);

module.exports = router;