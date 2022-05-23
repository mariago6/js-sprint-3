// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
   {
        id: 1,
        name: 'Cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery',
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty',
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty',
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty',
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes',
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes',
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes',
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    for (let i = 0; i < products.length; i++) {
        if(products[i].id === id) {
            cartList.push(products[i]);  
            break;     
        }
    } 

    console.log(cartList); 

/*THE SAME WITH WHILE 
    let i = 0; 
    let found = false; 

    do { 
        if(products[i].id === id) {
            cartList.push(products[i]); 
            found = true; 
        }
        i++; 
    } while (!found) */


    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}

// Exercise 2
function cleanCart() {
    cartList = [];
    cart = []; 
    document.getElementById('cart_list').innerHTML = ''; 
    total = 0;
    document.getElementById('total_price').innerHTML = total.toFixed(2); 
    console.log(cartList); 

}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array 
    for (let i = 0; i < cartList.length; i++) {
        total += cartList[i].price; 
    }
    return total; 
}

// Exercise 4
function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.
    //Button inside My Cart called Total Cart
    cart = []; 
    let found; 
    for (let i = 0; i < cartList.length; i++) {
        found = -1; 
        for (let j = 0; j < cart.length; j++) {
            if (cartList[i].id === cart[j].id) {
                found = j; 
            }
        }

        if (found > -1) {
            cart[found].quantity++;
            cart[found].subtotal = (cart[found].price) * (cart[found].quantity); 
            cart[found].subtotalWithDiscount = applyPromotionsCart(); 
        } else {
            const newItem = cartList[i]; 
            newItem.quantity = 1; 
            newItem.subtotal = newItem.price; 
            newItem.subtotalWithDiscount = newItem.price; 
            cart.push(newItem); 
        }
    }

    console.log(cart); 


}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"
    let subtotalWithDiscount; 
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].quantity >= 3 && cart[i].id === 1) {
            cart[i].price = 10; 
            cart[i].subtotalWithDiscount = (cart[i].price) * (cart[i].quantity); 
            subtotalWithDiscount = (cart[i].price) * (cart[i].quantity); 
        } else if (cart[i].quantity >= 10 && cart[i].id === 3) {
            cart[i].price = 5 * (2  / 3); 
            cart[i].subtotalWithDiscount = (cart[i].price) * (cart[i].quantity); 
            subtotalWithDiscount = (cart[i].price) * (cart[i].quantity);
        } else {
            subtotalWithDiscount = cart[i].subtotal; 
        }
    }
    return subtotalWithDiscount; 
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom 
    let body = document.getElementById('cart_list');
    body.innerHTML = ''; 
    total = 0; 

    for (let i = 0; i < cart.length; i++) {
        let tr = document.createElement('tr'); 
        let th = document.createElement('th');
        th.innerHTML = cart[i].name; 
        let td1 = document.createElement('td');
        td1.innerHTML = '$' + cart[i].price.toFixed(2);
        let td2 = document.createElement('td');
        td2.innerHTML = cart[i].quantity;
        let td3 = document.createElement('td');
        td3.innerHTML = '$' + cart[i].subtotalWithDiscount.toFixed(2);

        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        body.appendChild(tr); 

        total += cart[i].subtotalWithDiscount; 

    }

    document.getElementById('total_price').innerHTML = total.toFixed(2); 




    
    // const fragment = document.createDocumentFragment(); 
    // //const fragment = new DocumentGragment(); 

    // //utilizar fragment para evitar reflow
    // cartList.forEach(item => {
    //     const tr = document.createElement('tr');
    //     tr.classList.add('table');
    //     const tdName = document.createElement('td');
    //     td.classList.add('list'); 
    //     td.textContent = item.name;
    //     fragment.appendChild(tr); 
    //     fragment.appendChild(td); 
    // })

    // list.appendChild(fragment); 
    
    
    // cartList.forEach(item => {
    //     list.innerHTML += `<td>${item.name}</td>`
    //     const tr = document.createElement('tr'); 
    //     const td = document.createElement('td'); 
    //     td.textContent = item.name; 
    //     list.appendChild(tr);
    //     list.appendChild(td); 

    // }) 

}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cart array or update its quantity in case it has been added previously.
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    // 2. Add found product to the cartList array
}

function open_modal(){
	console.log("Open Modal");
	printCart();
}