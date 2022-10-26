const jwt = require("jsonwebtoken");
const UserModel = require("../models/users");

exports.findOne = async (filter) => {
    const user = await UserModel.findOne(filter);
    return user
};

exports.createOne = async (attribute) => {
    const user = new UserModel(attribute);
    await user.save();
    return user;
}