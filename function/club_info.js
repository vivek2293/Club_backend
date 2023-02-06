const authentication = require("../models/auth_model");

const getAllClubList = async (req, res) => {
    const data = await authentication.find({}, 'clubName');
    res.send(data);
};

module.exports = { getAllClubList };