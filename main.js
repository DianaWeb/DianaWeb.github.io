$(document).ready(() => {
    //Создавать товары на странице index
    let product1 = new Product(3, 'Mango People T-shirt', 100, './img/image2_1.png');
    let product2 = new Product(4, 'Mango People T-shirt', 200, './img/image2_2.png');
    let product3 = new Product(5, 'Mango People T-shirt', 52.00, './img/image2_3.png');
    let product4 = new Product(6, 'Mango People T-shirt', 52, './img/image2_4.png');
    let product5 = new Product(7, 'Mango People T-shirt', 52, './img/image2_5.png');
    let product6 = new Product(8, 'Mango People T-shirt', 52, './img/image2_6.png');
    let product7 = new Product(9, 'Mango People T-shirt', 52, './img/image2_7.png');
    let product8 = new Product(10, 'Mango People T-shirt', 52.00, './img/image2_8.png');

    //Создаем товары на странице product
    let product11 = new ProductProduct(11, 'Mango People T-shirt', 52, 'img/image_9.png');
    let product12 = new ProductProduct(12, 'Mango People T-shirt', 52, 'img/image_10.jpg');
    let product13 = new ProductProduct(13, 'Mango People T-shirt', 52, 'img/Layer%204.jpg');
    let product14 = new ProductProduct(14, 'Mango People T-shirt', 52, 'img/image_11.jpg');
    let product15 = new ProductProduct(15, 'Mango People T-shirt', 52, 'img/image2_8.png');
    let product16 = new ProductProduct(16, 'Mango People T-shirt', 52, 'img/image_13.jpg');
    let product17 = new ProductProduct(17, 'Mango People T-shirt', 52, 'img/image2_6.png');
    let product18 = new ProductProduct(18, 'Mango People T-shirt', 52, 'img/image_14.jpg');
    let product19 = new ProductProduct(18, 'Mango People T-shirt', 52, 'img/image_16.jpg');

    //Создаем товары на странице page
    let product21 = new ProductPage(21, 'Mango People T-shirt', 52, 'img/product_3.jpg');
    let product22 = new ProductPage(22, 'Mango People T-shirt', 52, 'img/product_4.jpg');
    let product23 = new ProductPage(23, 'Mango People T-shirt', 52, 'img/product_2.jpg');
    let product24 = new ProductPage(24, 'Mango People T-shirt', 52, 'img/product_1.jpg');

    //Корзина
    let myCart = new Cart('getCart.json');

    //Обработчик
    $('#block_2').on('click', '.add_to_cart', e => {
        myCart.addProduct(e.target);
    });

    $('#product_block_3').on('click', '.add_to_cart_p', e => {
        myCart.addProduct(e.target);
    });

    $('#box_product').on('click', '.add_to_cart_p', e => {
        myCart.addProduct(e.target);
    });

    //Feedback
    let feed = new Feedback('feedback.json');
});