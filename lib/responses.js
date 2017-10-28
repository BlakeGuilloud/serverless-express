function sendSuccess(res) {
  return (data) => {
    res.status(200).set({
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      })
      .json(data);

    return null;
  };
}

function sendError(res) {
  return (error) => {
    res.status(error.statusCode || 500)
      .json({
        code: error.statusCode || 500,
        message: error.message || error.ValidationError,
      });

    return null;
  };
}

module.exports = {
  sendSuccess,
  sendError,
};