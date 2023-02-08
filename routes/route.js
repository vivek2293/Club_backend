const express = require("express");
const router = express.Router();

const {
    getRequest,
    register,
    login,
    verify,
    forgotPassword,
    resetPassword,
} = require("../function/auth_route");

const {
    getAllClubList,
    updateClub,
    deleteClub
} = require("../function/club_info");

const { verifyToken } = require("../function/verify_token");
const { refreshToken } = require("../function/refresh_token");

router.get("/getData", getRequest);
router.post("/auth/create", register);
router.post("/auth/login", login);
router.post("/auth/verify", verifyToken, refreshToken, verify);
router.post("/auth/forgotPassword", forgotPassword);
router.patch("/auth/resetPassword", resetPassword);
router.post("/list/club", getAllClubList);
router.patch("/list/update", updateClub);
router.delete("/list/delete", deleteClub);

module.exports = router;