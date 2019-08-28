module.exports = (e, next) => {
    console.log('hook');

    next();
};