require("dotenv").config();

const checkConnection = async (req, res) => {
  res.status(200).json({ message: "Connection is Ok", status: 200 });
};

module.exports = checkConnection;
