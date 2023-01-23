const jwt = require("jsonwebtoken");

const getRequest = (req,res) => {
    res.json({
        message: "Hey, there! Welcome to this API service"
    });
}

const register = (req,res) => {
    const user = {
        id: 1,
        username: "john",
        email: "john@gmail.com"
    };

    jwt.sign({ user }, process.env.JWT_SECRET, (err,token) => {
        res.json({ token });
    });
}

const login = (req,res) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, authData) => {
        if(err) res.sendStatus(403);
        else res.json({
            message: "POST created....",
            authData
        });
    });
}

module.exports = {
    getRequest,
    register,
    login
}