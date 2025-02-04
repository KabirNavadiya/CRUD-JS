const form = document.getElementById('productForm');
document.addEventListener("DOMContentLoaded", loadProducts);
const editform = document.getElementById('editForm');
editform.style.display = "none";
const applyfilter = document.getElementById('filter');
let products = JSON.parse(localStorage.getItem("products")) || [];

function generateId(){
    let r = "#" + Math.random().toString(36).substring(2, 6);
    return r;
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let name = document.getElementById('productName').value;
    let price = document.getElementById('price').value;
    let description = document.getElementById('description').value;
    let img = document.getElementById('productImage').files[0];
    let imgsize = document.getElementById('productImage').files[0].size;

    if (name && price && description && img) {
        const reader = new FileReader();
        reader.onload = function () {

            if(imgsize<500000){
                let imgURL = reader.result;
                products = JSON.parse(localStorage.getItem("products")) || [];
                let newProduct = { id : generateId(), name, price, description, img: imgURL };
                let exists = products.some(prod => {
                    if (prod.name === newProduct.name) {
                        return prod.name;
                    }
                });
                if (!exists) {
                    products.push(newProduct);
                    localStorage.setItem("products", JSON.stringify(products));
                } else {
                    alert("product with same name already exists")
                }
            }
            else{
                alert("file to large max(500kb) !");
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
        // e.preventDefault();
        const id = document.getElementById('eproductId').value;
        let name = document.getElementById('eproductName').value;
        let price = document.getElementById('eprice').value;
        let description = document.getElementById('edescription').value;
        let img = document.getElementById('eproductImage').files[0];

        const reader = new FileReader();
        reader.onload = function () {
            let imgURL = reader.result;
            products = JSON.parse(localStorage.getItem("products")) || [];
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
    products = JSON.parse(localStorage.getItem("products"));
    products.splice(indx, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadProducts()
}

applyfilter.addEventListener("submit",(e)=>{
    e.preventDefault();
    const sortfilter = document.getElementById("sortSelect").value;
    switch (sortfilter) {
        case "price":
            products = products.sort((a,b)=> a.price - b.price);
            break;
        case "name":
            products = products.sort((a,b)=> a.name.localeCompare(b.name.toLowerCase()));
            break;
    }
    displayProduct(products);  
})

function createCell(value){
    var cell =document.createElement('td');
    cell.innerText = value;
    return cell;
}
function appendImgCell(value){
    var cell = document.createElement('td');
    var img = document.createElement('img');
    img.src=value;
    img.alt="product-img";
    cell.appendChild(img)
    return cell
}
function appendbuttoncell(index){
    var cell = document.createElement('td');
    var btn1 = document.createElement('button');
    var btn2 = document.createElement('button');
    btn1.onclick = function(){editProduct(index)};
    btn2.onclick = function(){deleteProduct(index)};
    btn1.innerText= "Edit";
    btn2.innerText = "Delete";
    cell.appendChild(btn1);
    cell.appendChild(btn2);
    return cell;
}
function displayProduct(products){
    let table = document.getElementById('productTable');
    table.innerHTML = "";

    products.forEach((product,index) => {
        let row = document.createElement('tr');

        row.appendChild(createCell(product.id));
        row.appendChild(createCell(product.name));
        row.appendChild(createCell("$ "+product.price));
        row.appendChild(createCell(product.description));
        row.appendChild(appendImgCell(product.img));
        row.appendChild(appendbuttoncell(index))

        table.appendChild(row)

    });
}
function loadProducts() {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    displayProduct(products);
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


