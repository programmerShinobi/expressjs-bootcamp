const ResponseHelper = {
    sendResponse(res, statusCode, data) {
        if (statusCode == 200) {
            res.status(statusCode).json({
                messages: "SUCCESS! Login Successful",
                data
            });
        } else if (statusCode == 401) {
            res.status(statusCode).json({
                messages: "FAILED! Wrong Password"
            });
        } else if (statusCode == 404) {
            res.status(statusCode).json({
                messages: "FAILED! User not found"
            });
        }
    }
};

module.exports = ResponseHelper;
