import ProductController from "#controllers/product-controller.js";

export const productRoutes = [
 
    { 
        pattern: '/products',
        method: 'GET',
        handler: ProductController.index
    },

    { 
        pattern: '/products/:id',
        method: 'GET',
        handler: ProductController.show
    },

    {
        pattern: '/products',
        method: 'POST',
        handler: ProductController.create
    },

];

/*
    Notez qu'il n'y a pas de 'export default' à la fin

    Cet exemple n'est pas relié spécifiquement aux routes,
    c'est simplement pour montrer une autre façon
    d'exporter des éléments d'un module    
*/