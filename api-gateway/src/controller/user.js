const httpStatus = require('http-status');
const UserModel = require('../models/user');

exports.getUserList = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 20;
    const currentPage = parseInt(req.query.page, 10) || 1;
    const skip = (currentPage - 1) * limit;
    const query = {};
    const countQuery = {};
    const sort = {};
    let order = -1;
    const orderBy = req.query.orderBy ? req.query.orderBy : 'createdAt';

    if (req.query.order && req.query.order === 'asc') order = 1;

    sort[orderBy] = order;

    if (req.query.search) {
      query.name = { $regex: new RegExp(req.query.search, 'i') };
      countQuery.name = { $regex: new RegExp(req.query.search, 'i') };
    }

    const users = await UserModel
      .find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .lean();

    const total = await UserModel.countDocuments(countQuery);

    return res.status(httpStatus.OK).send({ data: users, total });
  } catch (err) {
    console.error('user list err:', err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

exports.addUser = async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    return res.status(httpStatus.OK).send(user);
  } catch (err) {
    console.error('add user err:', err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });

    const num = user.bonusPoints + req.body.num < 0 ? 0 : user.bonusPoints + req.body.num;

    const afterUpdate = await UserModel.findByIdAndUpdate(user._id, { bonusPoints: num }, { new: true }).select('-__v');

    return res.status(httpStatus.OK).send(afterUpdate);
  } catch (err) {
    console.error('update user err:', err.message);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send();
  }
};
