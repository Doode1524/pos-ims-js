const phyrexia = {
  id: 1,
  displayName: "Phyrexia",
  count: 50,
  min: 25,
  max: 75,
};

const dominaria = {
  id: 2,
  displayName: "Dominaria",
  count: 13,
  min: 20,
  max: 30,
};

const strixhaven = {
  id: 3,
  displayName: "Strixhaven",
  count: 39,
  min: 40,
  max: 45,
};

const zendikar = {
  id: 4,
  displayName: "Zendikar",
  count: 30,
  min: 28,
  max: 40,
};

const brothersWar = {
  id: 5,
  displayName: "Brother's War",
  count: 10,
  min: 15,
  max: 20,
};

const boosters = [phyrexia, dominaria, strixhaven, zendikar, brothersWar];

// orderList should be an array of objects, with the keys of "productId", and "orderCount"
// only include items that need to be ordered
const orderList = [];

// createOrderList should take in an array of ALL products
// determine which products need to be re-upped and add them
// to the orderList array, with the correct data structure mentioned above.
const createOrderList = (productsArray) => {
  return productsArray.forEach((product) => {
    const { id, count, min, max } = product;
    const offset = max - count;
    const item = { productId: id, orderCount: offset };
    const criteria = count < min;
    const foundProduct = isProductOrdered(product);

    if (foundProduct === undefined) {
      if (criteria) {
        orderList.push(item);
      }
    } else if (criteria) {
      foundProduct.orderCount = offset;
    } else {
      const idx = orderList.findIndex((ele) => ele.productId === id);
      orderList.splice(idx, 1);
    }
  });
};

// isProductOrdered should accept a product as a param, and it should return a product or undefined
// NOTE: the .find() method will return undefined if no element was found
const isProductOrdered = (product) => {
  return orderList.find((item) => item.productId === product.id);
};

// updateProduct should take in 2 params, product and quantity
// update the count for the passed in product based on the quanity sold that was passed in

// NOTE: updateProduct now includes a productsArray as a parameter
const updateProduct = (product, quantitySold, productsArray) => {
  product.count -= quantitySold;
  createOrderList(productsArray);
};

//////////////// DOM PRACTICE (NEW CODE) //////////////////////////////////

const generatePOSItems = () => {
  const posItems = document.getElementById("pos-items");
  boosters.forEach((booster) => {
    const h4 = document.createElement("h4");
    const button = document.createElement("button");

    h4.innerText = booster.displayName;
    button.innerText = "Add";

    button.addEventListener("click", () => {
      console.log(booster)
      // YOU WILL NEED TO ADD CODE HERE
      // NOTE: this button currently has context for
      // the booster variable from the forEach() scope
      const item = { booster, quantity: 1 };
      const productInCart = cart.find(
        (cartProduct) => cartProduct.booster.id === item.booster.id
      );

      if (productInCart === undefined) {
        cart.push(item);
      } else {
        productInCart.quantity += 1;
      }
      console.log(cart)
    });

    posItems.append(h4);
    posItems.append(button);
  });
};

generatePOSItems();

// 1: Clicking on an Add button should add items to the cart
// Cart is a <ul> with an id of "cart-items"
// I would suggest creating an empty cart array like orderList
// When populating the <ul> with items, be sure to add a button to remove

// 2: The remove button should remove items from the cart
// In both the <ul> and in the array

// 3: obviously, the cancel should do the same thing
// but for all items
// the cancel button has an id of "cancel-btn"

// 4: Checkout will be the trickiest
// Checkout should update all of the counts for each product in the cart
// and make sure we update the order list too
// the checkout button has an id of "checkout-btn"
