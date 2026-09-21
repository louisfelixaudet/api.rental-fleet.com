/*
    Dans cet exemple d'import, les accolades { } servent à mentionner 
    quels éléments du module sont sélectionnés
    car le module n'a pas de 'export default' 
*/
import { productRoutes } from "#routes/product-routes.js";

// Par simplicité nous rassemblons les groupe de routes en une seule variable
const routes = [
    ...productRoutes
];

const matchRoute = (req, res) => {

    // Pour chaque route de méthode GET, nous ajoutons une de méthode HEAD
    const headRoutes = routes
    .filter(r => r.method === 'GET')
    .map(r => ({ ...r, method: 'HEAD' }));

    const allRoutes = [...routes, ...headRoutes];

    const urlParts = res.locals.url.path.split('/').filter(Boolean);
    let routeExists = false;
    
    for (const route of allRoutes) {

        const patternParts = route.pattern.split('/').filter(Boolean);

        if (patternParts.length !== urlParts.length) continue;

        const urlParams = {};

        const match = patternParts.every((part, i) => {

            if (part.startsWith(':')) {

                urlParams[part.slice(1)] = urlParts[i];
                return true;
                
            }

            return part === urlParts[i];

        });

        if (!match) continue;

        // Au minimum la route existe
        routeExists = true; 

        // La méthode de la route ne correspond pas
        if (route.method !== req.method) continue; 

        // La route et la méthode existent
        res.locals.route = route;
        res.locals.url.params = urlParams;
        
        return true;
    }
        
    if(routeExists) {
        
        res.statusCode = 405;
        res.setHeader('Content-Type', 'text/plain'); 
        res.end( `The method ${req.method} is not allowed for route ${res.locals.url.path}`);       
        return false;
        
    } 

    if(!routeExists) {
       
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain'); 
        res.end( `Route ${res.locals.url.path} does not exists.`);  
        return false;

    }

    return false;

};

export default matchRoute;