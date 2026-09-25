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
                if(data.id){
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

    }



};

export default ProductController;