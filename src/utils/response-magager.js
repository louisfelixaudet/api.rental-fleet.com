const ResponseManager = {

    send: (req, res, status, data) => {

        const body = JSON.stringify(data);

        const headers = { 
            'Content-Length': Buffer.byteLength(body),
        };
                     
        // writeHead ferme les entêtes, on ne peut plus en ajouter
        res.writeHead(status, headers);
        
        // When HEAD method, do not return the body
        req.method !== 'HEAD' ? res.end(body) : res.end() ;
        
    } 

};

export default ResponseManager;

