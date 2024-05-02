class ApiError extends Error {
    statusCode: number;
    success: boolean;
    message: string;
    errors: any;
    stack: string;

    constructor(
        statusCode: number,
        message = "Something went wrong!!!",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.errors = errors;
        this.stack = stack;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}


export default ApiError