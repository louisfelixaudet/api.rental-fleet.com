const parseUrl = (req, res) => {

    // * Attention, les éléments provenant de l'url sont tous de type string
    const url = new URL(req.url, `http://${req.headers.host}`);

    // Éléments de la chaîne de requête, comme le $_GET de PHP
    res.locals.url.query = Object.fromEntries(url.searchParams);

    // URL sans les éléments de la chaîne de requête
    res.locals.url.path  = url.pathname;

    return true
};

export default parseUrl;