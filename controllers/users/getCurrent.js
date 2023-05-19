const getCurrent = async (req, res) => {
  const { _id, name, email, phone, photoURL, categories } = req.user;

  res.json({
    _id,
    name,
    email,
    phone,
    photoURL,
    categories,
  });
};

module.exports = getCurrent;
