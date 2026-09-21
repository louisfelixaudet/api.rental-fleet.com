/* 
Récupère le contenu du corps du message fait par un POST,PUT,PATCH 
avec le type de contenu "application/json" ou "application/x-www-form-urlencoded".

Ne pas utiliser dans le cas d'un envoi avec fichiers (multipart/form-data).
*/

const getRawBody = (req) => {

  return new Promise((resolve, reject) => {

    let chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks).toString()));
    req.on('error', (err) => reject(err));
    
  });

};

export const parseBody = async (req, res) => {

  const contentType = req.headers['content-type'] || '';
  
  let data = {};

  // A. Est-ce du JSON (ex: fetch ou cURL)
  if (contentType.startsWith('application/json')) {

      const rawData = await getRawBody(req);  
      data = JSON.parse(rawData);

  } 
  // B. Est-ce que ça provient d'un formulaire ?
  else if (contentType.startsWith('application/x-www-form-urlencoded')) {

      const rawData = await getRawBody(req);  
      const params = new URLSearchParams(rawData);
      data = Object.fromEntries(params);

  }  

  res.locals.body = data;

};

export default parseBody;