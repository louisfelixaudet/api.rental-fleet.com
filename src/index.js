import http from 'node:http';

// Chaîne d'intergiciels / Middleware pipeline
import setDefaultHeaders from '#middlewares/set-default-headers.js';
import parseUrl from '#middlewares/parse-url.js';
import matchRoute from '#middlewares/match-route.js';
import handleCORS from '#middlewares/handle-cors.js'

// Fonction qui créé la chaîne d'intergiciels
import runMiddlewares from '#utils/run-middlewares.js';

const PORT = 3000;

const server = http.createServer();

server.on('request', async (req, res) => {
    
    // Les données que nous allons créer dans la requête seront déposés dans l'objet res.locals
    res.locals = {
        requestID: crypto.randomUUID(),
        url: {},
        route: {}
    };

    try {

        if (! await runMiddlewares(req, res, 
            [
                setDefaultHeaders,
                parseUrl,
                matchRoute,
                handleCORS
            ]
        )) return;        
               
        /* 
            La chaîne d'intergiciels s'est exécutée sans sortie hative,
            nous allons donc appeler la fonction du controlleur
        */
        if (!await res.locals.route.handler(req, res)) return;                      

    } catch (err) {

        console.log(err.message);

        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain'); 

        /* 
            end : indique au serveur d'envoyer les dernières données et de fermer la connexion TCP.
            Notez que l'exécution continue.
        */
        res.end('Internal Server Error');       

        return;

    }
    
});


/*
SERVER ERROR CODES
==================

Code            Meaning
------------    ------------------------------------
EADDRINUSE      Port already in use
EACCES          Permission denied (ports below 1024 require root)
ECONNRESET      Client forcibly closed the connection
ETIMEDOUT       Connection timed out
 */

server.on('error',  (err) => {
    console.log(err);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
