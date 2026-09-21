import pool from "#infrastructure";
import { handleDBError } from "#utils/handle-db-errors.js";
const ProductModel = {

    selectAll: async () => {
        console.log("TEST - début selectAll");
        try {
            
            const query = `SELECT id, name, picture, price FROM product`;

            const rows = await pool.query(query);
            
            return rows; // MariaDB retourne un tableau de résultats

        } catch(err) {
            console.error(err); // ligne temporaire pour déboguer
            handleDBError(err);
        }  
    },

    selectById: async (id) => {
        
        try{
            
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
                id
            };

            // const [row] = va extraire la première ligne avec les données
            const [row] = await pool.query("SELECT id, name, picture, price FROM product WHERE id = :id", params);
            return row; // MariaDB retourne un tableau de résultats

        } catch(err) {

            handleDBError(err);
            console.error(err); // ligne temporaire pour déboguer
        }  
    },

    insertOne: async (name, picture, price) => {
        let query = "insert into product (name, picture, price) values (:name, :picture, :price)";
        let values = {
            name: name, 
            picture: picture, 
            price: price
        }
        try{
            const res = await pool.query(query, values);
            return Number(res.insertId);
        } catch (err){
            handleDBError(err);
            console.error('Error executing query:', err.stack);
            console.log(err);
        }
    }
    
};

export default ProductModel;