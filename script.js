const form = document.getElementById('productForm');
document.addEventListener("DOMContentLoaded",loadProducts);

let id = 1;
form.addEventListener("submit",(e)=>{
    e.preventDefault();

    // const id = document.getElementById('productId').value;
    let name = document.getElementById('productName').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let img = document.getElementById('productImage').value;

    if(!name || !price || !description || !img){
        alert('Please Enter Details !')
    }
    
    // if product anything exist in local storage then it assigns to products else null is assigned.
    let products = JSON.parse(localStorage.getItem("products")) || [];

    let newProduct = { _id : id, name, price, description, img };
    

    // Check if the product with the same id already exists    
    let exists = products.some(prod => {
        if(prod.id === newProduct.id){
            return prod.id; 
        }
    });
    if (!exists) {
        products.push(newProduct);
        id++;
        localStorage.setItem("products", JSON.stringify(products));
        
    } else {
        alert("product already exists")
    }

    loadProducts();
    
})

function EditProduct(){

}


function loadProducts(){

    let products = JSON.parse(localStorage.getItem("products")) || [];

    let table = document.getElementById('productTable');
    table.innerHTML="";

    products.forEach((product) => {

        let row = table.insertRow();

        row.innerHTML = `
            <td>${product._id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td><img src="${product.img}" alt="product img"></td>
            <td>
                <button onClick="EditProduct()">Edit</button>
                <button onClick="DeleteProduct()">Delete</button>
            </td>
        `
    });

}

