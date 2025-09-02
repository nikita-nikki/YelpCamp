class ExpressError extends Error{
    constructor(message,statusCode){
        super(message);
        this.message;
        this.statusCode;
    }
}

module.exports = ExpressError;