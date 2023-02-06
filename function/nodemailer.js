const { mail } = require("./mailer")

const verifyEmail = async(req,res) => {
    //if present
    mail( req.body.email, req.body.subject, req.body.message);
    res.sendStatus(200);
}

module.exports = { verifyEmail }