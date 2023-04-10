/* 
*  @param 
*/

const handleError = (err, res, httCode = 400) => {
  res.status(httCode).send({
      success: false,
      message: err,
    });
}
module.exports = handleError