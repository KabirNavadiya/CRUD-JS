const form = document.getElementById('productForm');
document.addEventListener("DOMContentLoaded", loadProducts);
const editform = document.getElementById('editForm');
editform.style.display = "none";


let lastid =1;

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    // const id = document.getElementById('productId').value;
    let name = document.getElementById('productName').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let img = document.getElementById('productImage').files[0];

    if (name && price && description && img) {

        const reader = new FileReader();
        reader.onload = function () {
            let imgURL = reader.result;
            let products = JSON.parse(localStorage.getItem("products")) || [];
            let newProduct = { id : lastid, name, price, description, img: imgURL };
            let exists = products.some(prod => {
                if (prod.name === newProduct.name) {
                    return prod.name;
                }
            });
            if (!exists) {
                products.push(newProduct);
                lastid++;
                localStorage.setItem("products", JSON.stringify(products));
            } else {
                alert("product with same name already exists")
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

    form.style.display="none";
    editform.style.display = "flex";
    editIndx = indx;
    let products = JSON.parse(localStorage.getItem("products"));
    let product = products[indx];

    document.getElementById('eproductId').value = product.id;
    document.getElementById('eproductId').disabled = true;
    document.getElementById('eproductName').value = product.name;
    document.getElementById('eprice').value = product.price;
    document.getElementById('edescription').value = product.description;
    document.getElementById('eproductImage').files[0] = product.img;

    editform.addEventListener("submit",(e)=>{

        e.preventDefault();
        const id = document.getElementById('eproductId').value;
        let name = document.getElementById('eproductName').value;
        let price = document.getElementById('eprice').value;
        let description = document.getElementById('edescription').value;
        let img = document.getElementById('eproductImage').files[0];
    
    
        const reader = new FileReader();
        reader.onload = function () {
            let imgURL = reader.result;
            let products = JSON.parse(localStorage.getItem("products")) || [];
            let newProduct = { id, name, price, description, img: imgURL };
            products[editIndx] = newProduct;
            localStorage.setItem("products", JSON.stringify(products));
            loadProducts();
        }
        reader.readAsDataURL(img);
        editform.style.display = "none";
        form.style.display = "flex";
    });
}


function deleteProduct(indx) {
    let products = JSON.parse(localStorage.getItem("products"));
    products.splice(indx, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts()
}


function loadProducts() {

    const sortfilter = document.getElementById("sortSelect").value;
    // console.log(sortfilter);
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


