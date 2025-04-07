const HTTP_STATUS = require('../constants/httpStatus');
const errorHandler = require('../middlewares/errorHandler')

module.exports = {
    handleControllerError: (res, error) => {
        if (!error.statusCode) error.statusCode = HTTP_STATUS.INTERNAL_ERROR;
        errorHandler(error, null, res, () => { });
    }
};
