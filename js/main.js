let carts = document.querySelectorAll('.add-cart');
let products = [
{
    name : "Beretta SilverBaller",
    tag  : "BerettaSilverBaller",
    price : 320,
    incarts:0
} 
,
{
    name:"Cowboy revolver",
    tag  : "Cowboyrevolver",
    price : 500,
    incarts:0
} 
,
{
    name : "Glock belgium",
    tag  : "Glockbelgium",
    price : 320,
    incarts:0
} 
]
for(let i=0; i< carts.length; i++){
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalcost(products[i])
    } )
}
function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;

    }
}
function cartNumbers(product){
   
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector('.cart span').textContent = productNumbers+1;
}   
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);
}
function setItems(product){
    let cartItems = localStorage.getItem('productInCart')

    console.log('my products are ',cartItems);

    cartItems = JSON.parse(cartItems);

    console.log(cartItems);

    if( cartItems != null)
    {
        if(cartItems[product.tag] == undefined)
        {
            cartItems = {
                //the rest of what we have before
                ...cartItems,
                [product.tag]:product

            }
        }

        console.log('clicked another time')
        cartItems[product.tag].incarts += 1
    }
    else 
    {

        product.incarts = 1;
        cartItems = {
            [product.tag]:product
                 }   
        
    }
  

localStorage.setItem('productInCart',JSON.stringify(cartItems));

}

function totalcost(product){

let cartCost = localStorage.getItem('totalcost');

if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalcost', cartCost + product.price);
}
else
{
    localStorage.setItem('totalcost',product.price);

}
}

function displayCart(){
let cartItems = localStorage.getItem('productInCart')
    cartItems = JSON.parse(cartItems);
let productContainer = document.querySelector(".products");

if (cartItems && productContainer){

    productContainer.innerHTML = '';
    
    Object.values(cartItems).map(item => {

        productContainer.innerHTML += `
       <div class="item">
        <div class="product">
            <ion-icon name = "close-circle"></ion-icon>
            <img src="./images/${item.tag}.png">
            <span>${item.name}</span>
        </div>
        <div class="price">
            ${item.price}
        </div>
        <div class ="quantity">
        <ion-icon name="add-circle"></ion-icon>
            <span>${item.incarts}</span>
            <ion-icon name="remove-circle"></ion-icon>

        </div>
        <div class="total">
             ${item.incarts * item.price}
        </div>
        </div>
        `
    })


}

}
onLoadCartNumbers()
displayCart()