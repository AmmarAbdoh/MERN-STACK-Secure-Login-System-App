const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const register = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    throw new BadRequestError("Please provide name and password");
  }

  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    throw new BadRequestError("Please provide name and password");
  }

  const user = await User.findOne({ name });

  if (!user) {
    throw new UnauthenticatedError("Can't find user ");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(`Wrong Password for ${name}`);
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

const dashboard = async (req, res) => {
  res.status(200).json({
    msg: `Welcome, ${req.user.name}`,
    secret: `If you are reading this message, it means that you are an authorized user`,
  });
};

module.exports = {
  register,
  login,
  dashboard,
};
