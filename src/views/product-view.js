const ProductView = {

    single: (product) => {

        return {

            id: product.id,
            name: product.name,
            picture: product.picture,
            price: product.price
        };

    }, 

    collection: (products) => {

       // Map va créer un tableau avec tous les résultats 
       return products.map(ProductView.single);

    }

};

export default ProductView;