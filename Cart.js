class Cart {
    constructor(source, container = '#cart_box', containerCart = '#cart-cart') {
        this.container = container;
        this.containerCart = containerCart;
        this.source = source;
        this.countGoods = 0; // Общее кол-во товаров
        this.amount = 0; // Сумма товаров в корзине
        this.basketItems = []; // Товары в корзине
        this._init(this.source);
    }

    _render() {
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });
        let $totalPrice = $(`
            <div class="price_total">
                <p>TOTAL</p>
                <p class="sum-amount"></p>
                <p class="sum-price"></p>
             </div>
        `);
        let $btnCheckout = $('<a/>', {
            class: 'checkout',
            href: 'checkout.html',
            text: 'Checkout'
        });
        let $btnToCart = $('<a>', {
            class: 'to_cart',
            href: 'cart.html',
            text: 'Go to cart'
        });
        $cartItemsDiv.appendTo($(this.container));
        $totalPrice.appendTo($(this.container));
        $btnCheckout.appendTo($(this.container));
        $btnToCart.appendTo($(this.container));

// Отрисовываем корзину на странице Cart
        let $cartHeader = $(`
            <div class="cart_header">
                <h3 class="cart_header_1">Product Details</h3>
                <h3 class="cart_header_2 tac">unite Price</h3>
                <h3 class="cart_header_2 tac">Quantity</h3>
                <h3 class="cart_header_2 tac">shipping</h3>
                <h3 class="cart_header_2 tac">Subtotal</h3>
                <h3 class="cart_header_3 tac">ACTION</h3>
            </div>        
         `);

        let $cartProductWrap = $('<div/>', {
            class: 'cart-product-wrap'
        });

        $cartHeader.appendTo($(this.containerCart));
        $cartProductWrap.appendTo($(this.containerCart));
    }

    _renderItem(product) {
        let $container = $(`
          <div class="cart_flex"data-product="${product.id_product}">
                <a href="page.html">
                  <img src="${product.img}" width="72" height="85" alt="man">
                </a>
                <div class="rebox_zane">
                  <a class="link" href="page.html">
                    <h3 class="rebox">${product.product_name}</h3>
                  </a>
                  <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star-half-alt"></i>
                  </div>
                  <p class="product-quantity">${product.quantity} </p>
                  <p class="product-price">$${product.price}</p>
                </div>
                <div class="close">
                  <i class="fas fa-times-circle"></i>
                </div>
              </div>`
        );
        $container.appendTo($('.cart-items-wrap'));

        let $delBtnDiv = $(`div[data-product="${product.id_product}"]`);
        let $delBtn = $delBtnDiv.find('.close');
        $delBtn.on('click', () => {
            this._remove(product.id_product);
        });

        // Отрисовываем товары в корзине на странице Cart.
        let $cartProduct = $(`
            <div class="cart_product" data-product="${product.id_product}">
                <img src="${product.img}" width="100" height="115" alt="man">
                <div class="product_details">
                  <h3 class="product_title">${product.product_name}</h3>
                  <p class="color_size">
                    Color: <span>Red</span>
                  </p>
                  <p class="color_size">
                    Size: <span>Xll</span>
                  </p>
                </div>
                <p class="details_item tac">$${product.price}</p>
                <div class="details_item tac">
                  <div class="details_quantity tac">${product.quantity}</div>
                </div>
                <p class="details_item tac">FREE</p>
                <p class="details_item tac price-item">$${product.quantity * product.price}</p>
                <p class="delete tac"><i class="fas fa-times-circle"></i></p>
            </div>
        `);
        $cartProduct.appendTo($('.cart-product-wrap'));

        let $delBtnCart = $(`div[data-product="${product.id_product}"]`).find('.delete');
        $delBtnCart.on('click', () => {
            this._removeCart(product.id_product);
        });
    }

    _init(source) {
        this._render();
        if (!localStorage.getItem('myItems')) {
            fetch(source)
                .then(result => result.json())
                .then(data => {
                    for (let product of data.contents) {
                        this.basketItems.push(product);
                        this._renderItem(product);
                    }
                    this.countGoods = data.countGoods;
                    this.amount = data.amount;
                    localStorage.setItem('myItems', JSON.stringify(this.basketItems));
                    localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
                    localStorage.setItem('amount', JSON.stringify(this.amount));
                    this._renderSum();
                    this._renderSumCart();
                });
        } else {
            this.basketItems = JSON.parse(localStorage.getItem('myItems'));
            this.countGoods = JSON.parse(localStorage.getItem('countGoods'));
            this.amount = JSON.parse(localStorage.getItem('amount'));
            for (let product of this.basketItems) {
                this._renderItem(product);
                this._updateCart(product);
                this._updateCartCart(product);
            }
            this._renderSum();
            this._renderSumCart();
        }
    }

    _renderSum() {
        $('.sum-amount').text(this.countGoods);
        $('.sum-price').text(`$ ${this.amount}`);
    }

    addProduct(element) {
        let productId = +$(element).data('id');
        let find = this.basketItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find)
        } else {
            let product = {
                id_product: productId,
                product_name: $(element).data('name'),
                price: +$(element).data('price'),
                quantity: 1,
                img: $(element).data('image')
            };
            this.basketItems.push(product);
            this.countGoods += product.quantity;
            this.amount += product.price;
            this._renderItem(product);
        }
        localStorage.setItem('myItems', JSON.stringify(this.basketItems));
        localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
        localStorage.setItem('amount', JSON.stringify(this.amount));
        this._renderSum();
        this._renderSumCart();
    }

    _updateCart(product) {
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`$ ${product.quantity * product.price}`);
    }

    _remove(productId) {
        let find = this.basketItems.find(product => product.id_product === productId);
        if (find.quantity > 1) {
            find.quantity--;
            this._updateCart(find);
            this._updateCartCart(find);
        } else {
            let $container = $(`div[data-product="${productId}"]`);
            this.basketItems.splice(this.basketItems.indexOf(find), 1);
            $container.remove();
        }
        this.countGoods--;
        this.amount -= find.price;
        localStorage.setItem('myItems', JSON.stringify(this.basketItems));
        localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
        localStorage.setItem('amount', JSON.stringify(this.amount));
        this._renderSum();
        this._renderSumCart()
    }
// Методы для Корзины на странице Cart
    _renderSumCart() {
        $('.sub_total_price').text(`$ ${this.amount}`);
        $('.grand_total_price').text(`$ ${this.amount}`);
    }

    _updateCartCart(product) {
        let $container = $(`div[data-product="${product.id_product}"]`);
        $container.find('.details_quantity').text(product.quantity);
        $container.find('.price-item').text(`$ ${product.quantity * product.price}`);
    }

    _removeCart(productId) {
        let find = this.basketItems.find(product => product.id_product === productId);
        if (find.quantity > 1) {
            find.quantity--;
            this._updateCartCart(find);
            this._updateCart(find);
        } else {
            let $container = $(`div[data-product="${productId}"]`);
            this.basketItems.splice(this.basketItems.indexOf(find), 1);
            $container.remove();
        }
        this.countGoods--;
        this.amount -= find.price;
        localStorage.setItem('myItems', JSON.stringify(this.basketItems));
        localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
        localStorage.setItem('amount', JSON.stringify(this.amount));
        this._renderSumCart();
        this._renderSum()
    }
}