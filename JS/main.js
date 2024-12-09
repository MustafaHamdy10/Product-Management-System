
//Get total
//Create product
//Save local storage
//Clear inputs
//Read
//Count
//Delete
//Update
//Search
//Clean data

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

// console.log(title,price,taxes,ads,discount,total,count,category,submit);

let mood = "create";
let temp;

// -------------------------------------------------------------------------------------------------------//
// 1) Total Function .

function getTotal() {
    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value) - (discount.value);
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = " ";
        total.style.background = "#a00d02";
    }
}
// --------------------------------------------------------------------------------------------------------//
// 2) Create function 

let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
    console.log(dataPro);
} else {
    dataPro = [];
}

submit.onclick = function () {
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    if(title.value!='' && price.value!='' && category.value!='' && newPro.count<101){
        if (mood === "create") {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[temp] = newPro;
            mood = "create";
            submit.innerHTML = "Create";
            count.style.display = "block";
        }
        clearData();
    }
    localStorage.setItem("product", JSON.stringify(dataPro));
    console.log(dataPro);
    readData();
}
// --------------------------------------------------------------------------------------------------------//
// 3) Clear function

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
// --------------------------------------------------------------------------------------------------------//
// 4) Read function

function readData() {
    getTotal();
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()" id="delete">Delete All (${dataPro.length})</button>`
    } else {
        btnDelete.innerHTML = "";
    }
}
readData();
// --------------------------------------------------------------------------------------------------------//
// 5) Delete function

function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    readData();
}
// --------------------------------------------------------------------------------------------------------//
// 6) Delete All function

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    readData();
}
// --------------------------------------------------------------------------------------------------------//
// 7) Update function

function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = "Update";
    mood = "update";
    temp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })

}
// --------------------------------------------------------------------------------------------------------//
// 8) Search function

let searchMood = "title";

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == "searchByTitle") {
        searchMood = "title";
        // search.placeholder = "Search By Title";
    } else {
        searchMood = "category";
        // search.placeholder = "Search By Category";
    }
    search.placeholder = "Search By " + searchMood;
    search.focus();
    search.value = "";
    readData();
}
// --------------------------------------------------------------------------------------------------------//
// 9) Search function

function searchData(value) {
    let table = "";
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title") {
            if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
                table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
            }
        }
        else {
            if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
                table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
        `;
            }
        }
    }
    document.getElementById("tbody").innerHTML = table;
}
