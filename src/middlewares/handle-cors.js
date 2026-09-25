const handleCORS = (req, res) => {

    // Pour les clients qui ne sont pas des navigateurs,
    // voici les méhodes que notre API accepte
    res.setHeader('Allow', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
   
    // Pour les clients qui sont des navigateurs
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    // Le client aura droit de lire ces en-têtes non visibles par défaut
    res.setHeader('Access-Control-Expose-Headers', 'Location');

    // Le navigateur gardera en mémoire cache la réponse des pré-validations
    res.setHeader('Access-Control-Max-Age', '86400'); 

    // OPTIONS = pré-validation, on retourne la réponse immédiatement
    if (req.method === 'OPTIONS') {

        res.statusCode = 204;
        res.end();
        return false;

    }

    return true;
    
}

export default handleCORS;