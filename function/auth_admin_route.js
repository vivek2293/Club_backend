const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminAuthentication = require("../models/auth_admin_model");

const getAllAdminList = async (req,res) => {
    const data = await adminAuthentication.find({});
    res.json({ data });
}

const adminRegister = async (req,res) => {
    const {  adminName , email, password, confirmPassword } = req.body;
    if(password !== confirmPassword){
        return res.status(403).json({ msg : "Invalid credentials."})
    }

    const hashedpassword = await bcrypt.hash( password, 10);
    const profile = {
        adminName,
        hashedpassword
    }

    adminAuthentication.create({ adminName, email, password: hashedpassword }).then(() => {
        console.log("Admin profile added successfully.")
    })
    .catch((err) => {
        console.log(err);
    })

    const accesstoken = jwt.sign({ admin: profile }, process.env.JWT_SECRET,{ expiresIn: "2m" });
    const refreshtoken = jwt.sign({ admin: profile }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7 day" });
    
    return res.cookie('jwt', refreshtoken, {
        httpOnly: true,
        maxAge: 10*24*60*60*1000
    }).json({ token: accesstoken });
}

const adminLogin = async (req,res) => {
    const { adminName, password } = req.body;
    const profile = await adminAuthentication.find({ adminName });
    if(profile.length != 1) return res.status(403).json({ msg: "Account not found." });

    if(await bcrypt.compare(password, profile[0].password)){
        const admin = profile[0];
        const accesstoken = jwt.sign({ admin }, process.env.JWT_SECRET,{ expiresIn: "2m" });
        const refreshtoken = jwt.sign({ admin }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7 day" });
        res.cookie('jwt', refreshtoken, {
            httpOnly: true,
            maxAge: 10*24*60*60*1000
        });
        return res.json({ token: accesstoken })
    }
    else return res.status(403).json({ msg: "Invalid Credentials."});
}

const adminVerify = (req,res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
        if(err) res.sendStatus(401);
        else res.json({
            message: "POST created....",
            token: req.token,
            authData
        });
    });
}

module.exports = {
    getAllAdminList,
    adminRegister,
    adminLogin,
    adminVerify
}