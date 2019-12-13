// Отрисовываем товары на странице index
class Product{
    constructor(id, title, price, img, container = '#block_2'){
        this.id = id;
        this.price = price;
        this.title = title;
        this.img = img;
        this.container = container;
        this._render(this.container);
    }
    _render(container){
        let $wrapperProduct = $(`
            <div class="block_2_1 hover">
          <img src="${this.img}" alt="image">
          <h4 class="mango_people">${this.title}</h4>
          <p class="price">$ ${this.price}</p>
          <div class="shadow"></div>
          <div class="blackout">
            <a class="product" href="page.html"></a>
          </div>
          <div class="rectangle">
          </div>
          <img class="basket_2" src="./img/basket_2.png" alt="image">
          <p class="add_to_cart" data-id="${this.id}" data-name="${this.title}" data-price="${this.price}" data-image="${this.img}">
          Add to Cart
          </p>
        </div>
        `);

        $(container).append($wrapperProduct);
    }
}
// Отрисовываем товары на странице product
class ProductProduct{
    constructor(id, title, price, img, container = '#product_block_3'){
        this.id = id;
        this.price = price;
        this.title = title;
        this.img = img;
        this.container = container;
        this._render(this.container);
    }
    _render(container){
        let $wrapperProduct = $(`
            <div class="parent_product">
            <a href="page.html" class="product_p">
              <img src="${this.img}" alt="product">
              <div class="product_text">
                <p class="product_description">${this.title}</p>
                <p class="price_product">$${this.price}</p>
              </div>
            </a>
            <div class="product_link_flex">
              <p class="add_to_cart_p" data-id="${this.id}" data-name="${this.title}" 
              data-price="${this.price}" data-image="${this.img}">Add to Cart</p>
            </div>
          </div>
        `);

        $(container).append($wrapperProduct);
    }
}
// Отрисовываем товары на странице page
class ProductPage{
    constructor(id, title, price, img, container = '#box_product'){
        this.id = id;
        this.price = price;
        this.title = title;
        this.img = img;
        this.container = container;
        this._render(this.container);
    }
    _render(container){
        let $wrapperProduct = $(`
            <div class="parent_product">
            <a href="page.html" class="product_p">
              <img src="${this.img}" alt="product">
              <div class="product_text">
                <p class="product_description">${this.title}</p>
                <p class="price_product">$${this.price}</p>
              </div>
            </a>
            <div class="product_link_flex">
              <p class="add_to_cart_p" data-id="${this.id}" data-name="${this.title}" 
              data-price="${this.price}" data-image="${this.img}">Add to Cart</p>
            </div>
          </div>
        `);

        $(container).append($wrapperProduct);
    }
}