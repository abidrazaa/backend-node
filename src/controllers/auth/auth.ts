import UserModel, { UserType } from '@models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '@constants/app';
import { BaseBody, BaseQuery, BaseRequestHandler } from 'types/common';

function generateAuthToken(data: object) {
  const token = jwt.sign(data, JWT_SECRET_KEY, { expiresIn: '10h' });
  return token;
}

export const login: BaseRequestHandler<UserType> = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'user does not exist with this email and password',
      });
    }

    // bcrypting the password and comparing with the one in db
    if (await bcrypt.compare(password, user.password)) {
      const token = generateAuthToken({ _id: user?._id, email: email });
      user.token = token;
      user.save();

      return res.status(200).json({
        success: true,
        message: 'user Logged in',
        data: user,
      });
    }
    return res.status(400).json({
      success: false,
      message: 'user credentials are not correct',
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const register: BaseRequestHandler<UserType> = async (req, res) => {
  try {
    const { email, password } = req.body;

    // if any one of the field from email and password is not filled
    if (!email || !password) {
      return res.json({
        success: false,
        message: 'email or password is empty',
      });
    }
    req.body.password = await bcrypt.hash(password, 10);

    const user = new UserModel(req.body);
    await user.save();

    return res.json({
      success: true,
      message: 'user registered successfully',
      data: user,
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};

export const updateUser: BaseRequestHandler<UserType, BaseQuery & { id: string }> = async (
  req,
  res,
) => {
  try {
    const { name } = req.body;

    const userDataToBeUpdated = { name };

    const { id: idQuery } = req.query;
    const { id: idParams } = req.params;
    const id = idParams || idQuery;

    const user = await UserModel.findOne({ _id: id });

    if (!user) return res.status(400).json({ err: 'user does not exist' });

    const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, userDataToBeUpdated, {
      new: true,
    }).select('-password -token -cart -wishlist');

    return res.json({
      success: true,
      message: 'user updated successfully',
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

export const deleteUser: BaseRequestHandler<BaseBody, BaseQuery & { id: string }> = async (
  req,
  res,
) => {
  try {
    const { id: idQuery } = req.query;
    const { id: idParams } = req.params;
    const id = idParams || idQuery;

    const user = await UserModel.findOne({ _id: id });
    if (!user) return res.status(400).json({ err: 'user does not exist' });

    await UserModel.findOneAndDelete({ _id: id });

    return res.json({
      success: true,
      message: 'user deleted successfully',
    });
  } catch (error) {
    return res.status(400).send({ err: error.message });
  }
};

export const userById: BaseRequestHandler<BaseBody, BaseQuery & { id: string }> = async (
  req,
  res,
) => {
  try {
    const { id: idQuery } = req.query;
    const { id: idParams } = req.params;
    const id = idParams || idQuery;

    const user = await UserModel.findOne({ _id: id }).select('-password -token');
    if (!user) return res.status(400).json({ err: 'user does not exist' });

    return res.json({
      success: true,
      message: 'user fetched successfully',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

type ResetPasswordBody = { password: string; newPassword: string };

export const resetPassword: BaseRequestHandler<
  ResetPasswordBody,
  BaseQuery & { id: string }
> = async (req, res) => {
  try {
    const { password, newPassword } = req.body;
    const { id } = req.query;

    if (!password || !newPassword || !id) return res.status(400).json({ err: 'Fields are empty' });

    const user = await UserModel.findOne({ _id: id });

    if (!user) return res.status(400).json({ err: 'user does not exist' });

    // comparing the password from the password in DB to allow changes
    if (bcrypt.compare(password, user?.password)) {
      // encrypting new password
      user.password = await bcrypt.hash(newPassword, 10);
      user.save();
      return res.json({
        success: true,
        message: 'password updated successfully',
      });
    }

    return res.json({
      success: false,
      message: 'wrong password',
    });
  } catch (error) {
    return res.status(500).send({ err: error.message });
  }
};
