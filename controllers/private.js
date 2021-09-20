exports.getPrivateData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You can access the private data in this route",
  });
};
