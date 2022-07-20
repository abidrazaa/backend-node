const userModel = require("../../models/user");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: true,
        status: 0,
        message: "user does not exist with this email and password",
      });
    }

    // bcrypting the password and comparing with the one in db
    if (await bcrypt.compare(password, user.password)) {
      return res.json({
        success: true,
        status: 1,
        message: "user Logged in",
        data: user,
      });
    }
  } catch (error) {
    return res.send("error : ", error.message);
  }
};

module.exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "email or password is empty",
      });
    }
    req.body.password = await bcrypt.hash(password, 10);

    let user = new userModel(req.body);
    await user.save();

    return res.json({
      success: true,
      message: "user registered successfully",
      data: user,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const userDataToBeUpdated = req.body;
    const { id } = req.query;
    const user = await userModel.findOne({ _id: id });

    if (!user) return res.send("user does not exist");

    let updatedUser = await userModel.findOneAndUpdate(
      { _id: id },
      userDataToBeUpdated,
      { new: true }
    );

    return res.json({
      success: true,
      message: "user updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.send("error : ", error.message);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.query;

    console.log("id ==> ", id);

    const user = await userModel.findOne({ _id: id });
    if (!user) return res.status(200).send("user does not exist");

    await userModel.findOneAndDelete({ _id: id });

    return res.json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports.userById = async (req, res) => {
  try {
    const { id } = req.query;

    const user = await userModel.findOne({ _id: id });
    if (!user) return res.send("user does not exist");

    return res.json({
      success: true,
      message: "user deleted successfully",
      data: user,
    });
  } catch (error) {
    return res.send("error : ", error.message);
  }
};
