const ResponseHelper = {
    sendResponse(res, statusCode, data) {
        if (statusCode == 200) {
            res.status(statusCode).json({
                messages: "Login Successful",
                data
            });
        } else if (statusCode == 401) {
            res.status(statusCode).json({
                messages: "Wrong Password"
            });
        } else if (statusCode == 404) {
            res.status(statusCode).json({
                messages: "User not found"
            });
        }
    }
};

module.exports = ResponseHelper;
