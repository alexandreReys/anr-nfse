exports.root = async (req, res, next) => {
  return res.status(200).json({
    message: "ANR API",
  });
};
