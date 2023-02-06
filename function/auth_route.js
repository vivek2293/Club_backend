const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authentication = require("../models/auth_model");

const getRequest = async (req,res) => {
    const data = await authentication.find({});
    res.json({ data });
}

const register = async (req,res) => {
    const { clubName , password, confirmPassword } = req.body;
    if(password !== confirmPassword){
        return res.status(403).json({ msg : "Invalid credentials."})
    }

    const hashedpassword = await bcrypt.hash( password, 10);
    const profile = {
        clubName,
        hashedpassword
    }

    authentication.create({ clubName, password: hashedpassword}).then(() => {
        console.log("Profile successfully created.")
    })
    .catch((err) => {
        console.log(err);
    })

    const accesstoken = jwt.sign({ club: profile }, process.env.JWT_SECRET,{ expiresIn: "2m" });
    const refreshtoken = jwt.sign({ club: profile }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7 day" });
    
    return res.cookie('jwt', refreshtoken, {
        httpOnly: true,
        maxAge: 10*24*60*60*1000
    }).json({ token: accesstoken })
}

const login = async (req,res) => {
    const { clubName, password } = req.body;
    const profile = await authentication.find({ clubName });
    if(profile.length != 1) return res.status(403).json({ msg: "Club not found." });

    if(await bcrypt.compare(password, profile[0].password)){
        const club = profile[0];
        const accesstoken = jwt.sign({ club }, process.env.JWT_SECRET,{ expiresIn: "2m" });
        const refreshtoken = jwt.sign({ club }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7 day" });
        res.cookie('jwt', refreshtoken, {
            httpOnly: true,
            maxAge: 10*24*60*60*1000
        });
        return res.json({ token: accesstoken })
    }
    else return res.status(403).json({ msg: "Invalid Credentials."})
}

const verify = (req,res) => {
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
    getRequest,
    register,
    login,
    verify
}