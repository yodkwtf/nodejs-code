const CustomAPIError = require('../errors/custom-error');

const login = async (req, res) => {
  // get data
  const { username, password } = req.body;

  // check if data isnt there
  if (!username || !password) {
    throw new CustomAPIError('Please provide email and password', 400);
  }

  console.log(username, password);
  res.send('Fake Login/Register/Signup Route');
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100) + 1;
  res.status(200).json({
    msg: `Hello John Doe`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
