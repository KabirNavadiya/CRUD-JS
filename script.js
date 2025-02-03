const form = document.getElementById('productForm');
document.addEventListener("DOMContentLoaded", loadProducts);

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const id = document.getElementById('productId').value;
    let name = document.getElementById('productName').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let img = document.getElementById('productImage').files[0];

    if (id && name && price && description && img) {

        const reader = new FileReader();
        reader.onload = function () {
            let imgURL = reader.result;
            let products = JSON.parse(localStorage.getItem("products")) || [];
            let newProduct = { id, name, price, description, img: imgURL };
            let exists = products.some(prod => {
                if (prod.id === newProduct.id) {
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
    else {
        alert('Please Enter Details !')
    }
});

let editIndx = null;
function editProduct(indx) {

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
    // document.addEventListener("submit", handleEdit);

}

function handleEdit(e) {

    e.preventDefault();
    const id = document.getElementById('productId').value;
    let name = document.getElementById('productName').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let img = document.getElementById('productImage').files[0];


    const reader = new FileReader();
    reader.onload = function () {
        let imgURL = reader.result;
        let products = JSON.parse(localStorage.getItem("products")) || [];
        let newProduct = { id, name, price, description, img: imgURL };
        // products.push(newProduct);
        products[editIndx] = newProduct;
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
    }
    reader.readAsDataURL(img);

    document.getElementById('Update').style.display = "none";
    document.getElementById('submitButton').style.display = "block";
}

function deleteProduct(indx) {
    let products = JSON.parse(localStorage.getItem("products"));
    products.splice(indx, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts()
}


function loadProducts() {

    const sortfilter = document.getElementById("sortSelect").value;
    console.log(sortfilter);
    
    let products = JSON.parse(localStorage.getItem("products")) || [];

    switch (sortfilter) {
        case "id":
            products = products.sort((a,b)=> a.id - b.id);
            break;
        case "price":
            products = products.sort((a,b)=> a.price - b.price);
            break;
        case "name":
            products = products.sort((a,b)=> a.name.localeCompare(b.name.toLowerCase()));
            break;
        default:
            break;
    }
    let table = document.getElementById('productTable');
    table.innerHTML = "";
    products.forEach((product, indx) => {

        let row = table.insertRow();
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.description}</td>
            <td><img src="${product.img}" alt="product-img"></td>
            <td>
                <button onClick="editProduct(${indx})">Edit</button>
                <button onClick="deleteProduct(${indx})">Delete</button>
            </td>
        `
    });
}
function handleSearch() {
    const input = document.getElementById('filterInput').value;
    let table = document.getElementById("productTable")
    let tr = table.getElementsByTagName('tr');

    for (let i = 0; i < tr.length; i++) {
        let td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            if (td.innerHTML.toLowerCase().indexOf(input.toLowerCase()) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


