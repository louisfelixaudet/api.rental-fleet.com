const setDefaultHeaders = (req, res) => {

  // Informe le client que les données sont du JSON
  res.setHeader('Content-Type', 'application/json');

  // Observabilité, chaque requête aura un identifiant unique pour le tracage
  // Devra être remplacé par l'entête 'traceparent : voir W3C
  res.setHeader('X-Request-Id', res.locals.requestID);  

  return true;

}

export default setDefaultHeaders;