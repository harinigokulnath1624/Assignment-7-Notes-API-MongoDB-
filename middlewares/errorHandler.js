const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: "Validation failed",
            error: err.message
        });
    }

    if (err.name === "CastError" || err.name === "BSONError") {
        return res.status(400).json({
            message: "Invalid note ID or data format"
        });
    }

    return res.status(500).json({
        message: "Internal server error"
    });
};

module.exports = errorHandler;
