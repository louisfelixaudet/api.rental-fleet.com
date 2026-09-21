const runMiddlewares = async (req, res, middlewares) => {

    for (const fn of middlewares) {
        
        if (typeof fn !== 'function') {
            throw new Error(`Middleware is not a function: ${fn}`);
        }

        // If middleware return false, exit chain
        if(! await fn(req, res)) return false;
    }

    return true;

};

export default runMiddlewares;