import crypto from 'crypto';

const AuthenticationManager = {

    // API Key
    //========
    
    hashKey: (apiKey) => {
      return crypto.createHash('sha256').update(apiKey).digest('hex');
    },
   
    generateApiKey: (prefix = 'api_sk_live') => {
      const secret = crypto.randomBytes(32).toString('base64url');
      return `${prefix}_${secret}`;
    }, 

};

export default AuthenticationManager;