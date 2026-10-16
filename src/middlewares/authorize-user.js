const authorizeUser = async (req, res) => {
      
    if (!res.locals.user) {

        res.statusCode = 401;
        res.setHeader('Content-Type', 'text/plain'); 
        res.end('The client must authenticate.');
        return false;

    }
    
    return true;

};

export default authorizeUser;