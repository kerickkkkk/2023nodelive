const notFound = (req, res, next) => {
    res.status(404).json({
      status: 'error',
      message: "無此路由資訊",
    });
}

module.exports = notFound