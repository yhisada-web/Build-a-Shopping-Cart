/**
 * An array of product objects. Each product has a name, price, quantity, productId, and image.
 */
const products = [
  {
    name: "cherry",
    price: 5,
    quantity: 0,
    productId: 1001,
    image: "/images/cherry.jpg"
  },
  {
    name: "orange",
    price: 6,
    quantity: 0,
    productId: 1002,
    image: "/images/orange.jpg"
  },
  {
    name: "strawberry",
    price: 7,
    quantity: 0,
    productId: 1003,
    image: "/images/strawberry.jpg"
  }
];

/**
 * An array to store the products that have been added to the cart.
 */
const cart = [];

/**
 * This function adds a product to the cart based on the productId. If the product is already in the cart,
 * it increases the quantity by 1. If the product is not in the cart, it adds the product to the cart
 * with a quantity of 1.
 * @param {number} productId - The ID of the product to add to the cart.
 */
function addProductToCart(productId) {
  // Check if the product is already in the cart
  let existingProduct = cart.find((item) => item.productId === productId);

  // If the product is already in the cart, increase the quantity by 1
  if (existingProduct !== undefined) {
    existingProduct.quantity += 1;
  } else {
    // If the product is not in the cart, find the product in the products array
    let foundProduct = products.find((item) => item.productId === productId);

    // If the product is found, add it to the cart with a quantity of 1
    if (foundProduct !== undefined) {
      foundProduct.quantity = 1;
      cart.push(foundProduct);
    }
  }
}

/**
 * Increases the quantity of a product in the cart by 1.
 * If the product does not exist in the cart, it will not be added.
 *
 * @param {number} productId - The ID of the product to increase the quantity for.
 */
function increaseQuantity(productId) {
  // Find the existing product in the cart using the productId
  let existingProduct = cart.find((item) => item.productId === productId);

  // If the product exists in the cart, increment its quantity
  if (existingProduct !== undefined) {
    existingProduct.quantity += 1;
  }
}

/**
 * Decreases the quantity of a product in the cart by 1.
 * If the quantity reaches 0, the product will be removed from the cart.
 *
 * @param {number} productId - The ID of the product to decrease the quantity for.
 */
function decreaseQuantity(productId) {
  // Find the existing product in the cart using the productId
  let existingProduct = cart.find((item) => item.productId === productId);

  // If the product exists in the cart
  if (existingProduct !== undefined) {
    // If the quantity is greater than 1, decrement the quantity
    if (existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
    } else {
      // If the quantity is 1, remove the product from the cart
      cart.splice(cart.indexOf(existingProduct), 1);
    }
  }
}

/**
 * Removes a product from the cart completely.
 * Sets the quantity to 0 and removes the product from the cart.
 *
 * @param {number} productId - The ID of the product to remove from the cart.
 */
function removeProductFromCart(productId) {
  // Find the existing product in the cart using the productId
  let existingProduct = cart.find((item) => item.productId === productId);

  // If the product exists in the cart
  if (existingProduct !== undefined) {
    // Set the quantity to 0 and remove the product from the cart
    existingProduct.quantity = 0;
    cart.splice(cart.indexOf(existingProduct), 1);
  }
}

/**
 * Calculates the total price of all items in the cart.
 * The total is computed by multiplying the quantity of each item by its price.
 *
 * @returns {number} - The total price of all items in the cart.
 */
function cartTotal() {
  let grandTotal = 0;

  // Iterate over each item in the cart and calculate the total price
  cart.forEach((element) => {
    grandTotal += element.quantity * element.price;
  });
  
  // Return the calculated total price
  return grandTotal;
}

/**
 * Empties the cart by removing all items.
 * This sets the cart's length to 0.
 */
function emptyCart() {
  // Set the length of the cart array to 0 to remove all items
  cart.length = 0;
}

// Initialize the total amount
let totalPaid = 0;

/**
 * Processes a payment by adding the specified amount to the total paid.
 * If the total paid exceeds or meets the cart total, it empties the cart.
 *
 * @param {number} amount - The amount to be paid.
 * @returns {number} - The remaining amount after the payment. 
 *                     If the payment covers the cart total, it returns 0.
 */
function pay(amount) {
  // Add the payment amount to the total paid
  totalPaid += amount;

  // Calculate the remaining amount after deducting the cart total
  let remaining = totalPaid - cartTotal();

  // Check if the total paid is sufficient to cover the cart total
  if (remaining >= 0) {
    // Reset total paid to zero as the cart has been paid for
    totalPaid = 0;
    // Empty the shopping cart
    emptyCart();
  }

  // Return the remaining amount that is not covered by the payment
  return remaining;
}

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay, 
  emptyCart,
}