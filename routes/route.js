const express = require("express");
const router = express.Router();


const {
    getAllAdminList,
    adminRegister,
    adminLogin,
    adminVerify
} = require("../function/auth_admin_route");

const {
    getAllClubList,
    clubRegister,
    clubLogin,
    clubVerify
} = require("../function/auth_club_route");


const { verifyToken } = require("../middleware/verify_token");
const { refreshToken } = require("../middleware/refresh_token");


// Admin Routes
router.get("/auth/admin/getData", getAllAdminList);
router.post("/auth/admin/register", adminRegister);
router.post("/auth/admin/login", adminLogin);
router.post("/auth/admin/authVerify", verifyToken, refreshToken, adminVerify);

// Club Authentication Routes
router.get("/auth/club/getData", getAllClubList);
router.post("/auth/club/register", clubRegister);
router.post("/auth/club/login", clubLogin);
router.post("/auth/club/clubVerify", verifyToken, refreshToken, clubVerify);


module.exports = router;