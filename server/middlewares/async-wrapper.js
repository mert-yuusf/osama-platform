const asyncWrapper = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (e) {
            console.log(`💥 ${e.message}`);
            next(e);
        }
    };
};

module.exports = asyncWrapper;
