import AuthenticationManager from "#utils/authentication-manager.js";
import UserModel from "#models/user-model.js";

const valideApiKey = async (req, res) => {

  let key = req.headers['x-api-key']

  if(key){
    let hash = AuthenticationManager.hashKey(key);
    let user = await UserModel.selectByHash(hash);

    if(user){
        res.locals.user = {
            id: user['id']
        }
    }
  }

  return true;

}

export default valideApiKey;