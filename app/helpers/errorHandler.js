// app/helpers/errorHandler.js

exports.notFound = (req, res, next) => {
    res.status(404).json({ error: 'Not found' });
  };
  
  exports.serverError = (error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  };