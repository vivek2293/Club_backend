const authentication = require("../models/auth_model");

const getAllClubList = async (req, res) => {
    const data = await authentication.find({}, 'clubName');
    res.send(data);
};

const updateClub = async(req, res) => {
    const { _id, clubName, email } = req.body;
    await authentication.findByIdAndUpdate( { _id }, { clubName, email }, { new: true })
    .then((info) => { res.status(200).send(info)})
    .catch((err) => { res.status(400).send(err)})
};

const deleteClub = async(req,res) => {
    const { _id } = req.body;
    await authentication.findByIdAndDelete( { _id })
    .then(() => res.status(200).send("Deleted Successfully."))
    .catch((err) => res.status(400).send(err));
};

module.exports = { getAllClubList, updateClub, deleteClub };