import ResponseManager from '#utils/response-magager.js';
import ProductView from '#views/product-view.js';
import ProductModel from '#models/product-model.js';
import ErrorTypes from '#utils/error-types.js';
import parseBody from '#utils/parse-body.js';
import handleCORS from '#middlewares/handle-cors.js';

const ProductController = {

    index: async (req, res) => {

        try {

            const products = await ProductModel.selectAll();

            ResponseManager.send(req, res, 200, ProductView.collection(products));

            return true;

        } catch (err) {

            // Something whent wrong with the database query. 
            // Check the error code to determine what happened.

            if (err instanceof ErrorTypes.DatabaseError) {

                res.statusCode = 503;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Service Unavailable');
                return false;

            }

            throw err;

        }

    },

    show: async (req, res) => {

        try {

            const id = res.locals.url.params.id;

            const product = await ProductModel.selectById(id);

            if (product) {
                ResponseManager.send(req, res, 200, ProductView.single(product));
                return true;
            }

            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Ressouce does not exists');
            return false;

        } catch (err) {

            // Something whent wrong with the database query. 
            // Check the error code to determine what happened.

            if (err instanceof ErrorTypes.DatabaseError) {

                res.statusCode = 503;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Service Unavailable');
                return false;

            }

            throw err;

        }

    },

    create: async (req, res) => {
        let data = {};
        try {

            await parseBody(req, res);
            data = res.locals.body;
            if (
                Object.hasOwn(data, "name") &&
                Object.hasOwn(data, "picture") &&
                Object.hasOwn(data, "price")
            ) {
                data.id = await ProductModel.insertOne(
                    data.name,
                    data.picture,
                    data.price
                );

                handleCORS(req, res);
                if (data.id) {
                    ResponseManager.send(req, res, 201, ProductView.single(data));
                }
            }
            else {
                res.statusCode = 400;
                res.end("Fields are missing or values are invalid");
                return false;
            }

        } catch (err) {
            if (err instanceof ErrorTypes.DuplicateEntryError) {
                res.statusCode = 409;
                res.end(`product with ${data.name} already exists`);
                return false;
            }
            if (err instanceof ErrorTypes.DatabaseError) {
                res.statusCode = 500;
                res.end(`product with ${data.name} already exists`);
                return false;
            }

            throw err;

        }
    },

    delete: async (req, res) => {
        try {

            const id = res.locals.url.params.id;

            const response = await ProductModel.deleteById(id);

            if (response) {
                res.removeHeader('Content-Type');
                ResponseManager.send(req, res, 204, ProductView.single(response));
                return true;
            }

            res.statusCode = 404;
            res.end('Ressouce does not exists');
            return false;

        } catch (err) {

            // Something whent wrong with the database query. 
            // Check the error code to determine what happened.

            if (err instanceof ErrorTypes.DatabaseError) {

                res.statusCode = 503;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Service Unavailable');
                return false;

            }

            throw err;

        }

    },

    update: async (req, res) => {

        try {

            const id = res.locals.url.params.id;

            await parseBody(req, res);
            const data = res.locals.body;

            if (
                Object.hasOwn(data, "name") &&
                Object.hasOwn(data, "picture") &&
                Object.hasOwn(data, "price")
            ) {
                // validation ok

                const success = await ProductModel.updateById(id, data.name, data.picture, data.price);

                if (success) {
                    res.statusCode = 204;
                    res.removeHeader('Content-Type');
                    res.end();
                    return true;
                }

                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Ressouce does not exists');
                return false;

            } else {
                // 400

                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain');
                res.end("Fields are missing or values are invalid.");
                return false;

            }

        } catch (err) {

            // Something whent wrong with the database query. 
            // Check the error code to determine what happened.

            if (err instanceof ErrorTypes.DuplicateEntryError) {

                res.statusCode = 409;
                res.setHeader('Content-Type', 'text/plain');
                res.end("Product with name '" + res.locals.body.name + "' already exists.");
                return false;

            }

            if (err instanceof ErrorTypes.DatabaseError) {

                res.statusCode = 503;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Service Unavailable');
                return false;

            }

            throw err;

        }

    },

    modify: async (req, res) => {

        try {

            const id = res.locals.url.params.id;

            await parseBody(req, res);
            const data = res.locals.body;

            // on défini la liste des données acceptées
            const allowedFields = ['name', 'picture', 'price'];

            /*
            const cleanData = {};
            if (Object.hasOwn(data, 'name')) c.name = data.name;
            if (Object.hasOwn(data, 'picture')) c.picture = data.picture;
            if (Object.hasOwn(data, 'name')) c.price = data.price;
            */

            // on créé un nouvel objet avec juste les données acceptées
            // on doit nettoyer les données car la requête SQL sera dynamique
            const cleanData = allowedFields.reduce((acc, field) => {
                if (Object.hasOwn(data, field)) {
                    acc[field] = data[field];
                }
                return acc;
            }, {});

            // on s'assure qu'au moins une donnée est dans la liste
            const valid = Object.keys(cleanData).some(key => allowedFields.includes(key));

            if (valid) {
                // validation ok

                const success = await ProductModel.modifyById(id, cleanData);

                if (success) {
                    res.statusCode = 204;
                    res.removeHeader('Content-Type');
                    res.end();
                    return true;
                }

                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Ressouce does not exists');
                return false;

            } else {
                // 400

                res.statusCode = 400;
                res.setHeader('Content-Type', 'text/plain');
                res.end("Fields are missing or values are invalid.");
                return false;

            }

        } catch (err) {

            // Something whent wrong with the database query. 
            // Check the error code to determine what happened.

            if (err instanceof ErrorTypes.DuplicateEntryError) {

                res.statusCode = 409;
                res.setHeader('Content-Type', 'text/plain');
                res.end("Product with name '" + res.locals.body.name + "' already exists.");
                return false;

            }

            if (err instanceof ErrorTypes.DatabaseError) {

                res.statusCode = 503;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Service Unavailable');
                return false;

            }

            throw err;

        }

    }



};

export default ProductController;