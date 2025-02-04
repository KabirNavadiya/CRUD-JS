const edit = document.getElementById('editproductForm')
edit.addEventListener('submit',(e)=>{
    
    e.preventDefault();
    let products = JSON.parse(localStorage.getItem("products")) || [];
    // let id = document.getElementById('productId').value;
    let editedname = document.getElementById('editproductName').value;
    let editedprice = document.getElementById('editprice').value;
    let editeddesc = document.getElementById('editdescription').value;
    let editedimglink = document.getElementById('editproductImage').value;

    console.log(editedname,editedprice,editeddesc,editedimglink);
    console.log(products);

    products = {
        // id : id,
        name : editedname,
        price : editedprice,
        description : editeddesc,
        img : editedimglink
    };

    localStorage.setItem("products",JSON.stringify(products));
    window.location.href = "index.html";
})