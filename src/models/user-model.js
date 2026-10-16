import pool from "#infrastructure";
import { handleDBError } from "#utils/handle-db-errors.js";
const UserModel = {

    selectByHash: async (hash) => {

        try {

            /* 
                
                En JS, si on construit un objet en ne passant que des variables, ça va créer des attributs
                ayant le nom de la variable et la valeur de la variable. C'est simplement un racouci.

                const params = {
                    id : id
                };

                Même chose que

                const params = {
                    id
                };

                On peut même combiner les ajout automatiques et manuels

                const params = {
                id,
                name : "Bob"
            };

            */
            const params = {
                hash
            };

            // const [row] = va extraire la première ligne avec les données
            const [user] = await pool.query("SELECT id FROM user WHERE hash = :hash and revoked = 0", params);
            return user; // MariaDB retourne un tableau de résultats

        } catch (err) {

            handleDBError(err);
            console.error(err); // ligne temporaire pour déboguer
        }
    },

};

export default UserModel;