import crypto from 'crypto';

function generateApiKey(prefix = 'myapp') {
  const secret = crypto.randomBytes(32).toString('base64url');
  return `${prefix}_${secret}`;
}

function hashKey(apiKey) {
  return crypto.createHash('sha256').update(apiKey).digest('hex');
}

// Valider une clé contre son hachage
function isValidKey(incomingKey, storedHash) {
  const hash = hashKey(incomingKey);
  return crypto.timingSafeEqual(
    Buffer.from(hash),
    Buffer.from(storedHash)
  );
}

const key = generateApiKey('api_sk_dev');
console.log('Key to client:' + key); 

const hash = hashKey(key);
console.log('hash to db :' + hash); 

console.log('is valid key :' + isValidKey(key,hash)); 

/*
Key to client : api_sk_dev_fC5Qm9mi1vEee8z0R8tJyQydiA-SXIgSUxsRtWrk-YU
hash to db : af4c95844307bc687eb8a480cf0e08722455d97ebca96793fc4cab0c22d1d84f
*/