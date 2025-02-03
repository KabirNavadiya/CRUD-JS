const form = document.getElementById('productForm');
document.addEventListener("DOMContentLoaded",loadProducts);

function HandleSubmit(e){
    
    e.preventDefault();
    const id = document.getElementById('productId').value;
    let name = document.getElementById('productName').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let img = document.getElementById('productImage').files[0];

    if(id && name && price && description && img){

        const reader = new FileReader();
        reader.onload = function(){
            let imgURL = reader.result;
            let products = JSON.parse(localStorage.getItem("products")) || [];
            let newProduct = { id, name, price, description, img : imgURL};
            let exists = products.some(prod => {
                if(prod.id === newProduct.id){
                    return prod.id; 
                }
            });
            if (!exists) {
                products.push(newProduct);
                localStorage.setItem("products", JSON.stringify(products));
            } else {
                alert("product already exists")
            }

            loadProducts();
        }
        reader.readAsDataURL(img);
        
    }
    else{
        alert('Please Enter Details !')
    }
}

let editIndx = null;
function EditProduct(indx){

    editIndx = indx;
    let products = JSON.parse(localStorage.getItem("products"));
    let product = products[indx];
    

    document.getElementById('productId').value = product.id;
    document.getElementById('productId').disabled = true;
    document.getElementById('productName').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('description').value = product.description;
    document.getElementById('productImage').files[0] = product.img;
    document.getElementById('submitButton').style.display = "none";

    document.getElementById('Update').style.display = "block"
    document.addEventListener("submit",handleEdit);

}

function handleEdit(e){
   
    e.preventDefault();
    const id = document.getElementById('productId').value;
    let name = document.getElementById('productName').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let img = document.getElementById('productImage').files[0];
    

    const reader = new FileReader();
    reader.onload = function(){
        let imgURL = reader.result;
        let products = JSON.parse(localStorage.getItem("products")) || [];
        let newProduct = { id, name, price, description, img : imgURL};
        // products.push(newProduct);
        products[editIndx]=newProduct;
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    }
    reader.readAsDataURL(img);
    
    document.getElementById('Update').style.display = "none";
    document.getElementById('submitButton').style.display = "block";
}

function DeleteProduct(indx){
    let products = JSON.parse(localStorage.getItem("products"));
    products.splice(indx,1);
    localStorage.setItem("products",JSON.stringify(products));
    loadProducts()
}


function loadProducts(){

    let products = JSON.parse(localStorage.getItem("products")) || [];
    let table = document.getElementById('productTable');
    table.innerHTML="";
    products.forEach((product,indx) => {

        let row = table.insertRow();
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.description}</td>
            <td><img src="${product.img}" alt="product-img"></td>
            <td>
                <button onClick="EditProduct(${indx})">Edit</button>
                <button onClick="DeleteProduct(${indx})">Delete</button>
            </td>
        `
    });
}

